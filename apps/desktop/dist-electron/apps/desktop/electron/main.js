import { app, BrowserWindow, Menu, dialog, ipcMain, shell } from "electron";
import { execFile } from "node:child_process";
import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { autosaveProjectRequestSchema, autosaveProjectResponseSchema, markRecoveryHandledRequestSchema, markRecoveryHandledResponseSchema, mediaMetadataSchema, openMediaImportDialogResponseSchema, openProjectDialogResponseSchema, overwriteProjectRequestSchema, overwriteProjectResponseSchema, recoverySnapshotSchema, scanMediaMetadataRequestSchema, scanMediaMetadataResponseSchema, saveProjectAsRequestSchema, saveProjectAsResponseSchema, versionHistoryRequestSchema, versionHistoryResponseSchema, versionSnapshotRequestSchema, versionSnapshotResponseSchema } from "@vivido/ipc";
const __dirname = dirname(fileURLToPath(import.meta.url));
const isDev = !app.isPackaged;
const useStaticRenderer = process.env.VIVIDO_USE_STATIC_RENDERER === "1";
const recoveryStatePath = join(app.getPath("userData"), "recovery-state.json");
const execFileAsync = promisify(execFile);
const ffprobeCandidates = ["ffprobe", "/opt/homebrew/bin/ffprobe", "/usr/local/bin/ffprobe", "/usr/bin/ffprobe"];
const ffmpegCandidates = ["ffmpeg", "/opt/homebrew/bin/ffmpeg", "/usr/local/bin/ffmpeg", "/usr/bin/ffmpeg"];
async function ensureProjectDirectory() {
    const projectDirectory = join(app.getPath("videos"), "Vivido");
    await mkdir(projectDirectory, { recursive: true });
    return projectDirectory;
}
async function ensureRecoveryDirectories(projectId) {
    const baseDirectory = join(app.getPath("userData"), "recovery", projectId);
    const autosaveDirectory = join(baseDirectory, "autosaves");
    const versionsDirectory = join(baseDirectory, "versions");
    await mkdir(autosaveDirectory, { recursive: true });
    await mkdir(versionsDirectory, { recursive: true });
    return { baseDirectory, autosaveDirectory, versionsDirectory };
}
async function atomicWrite(filePath, contents) {
    const tempPath = `${filePath}.tmp`;
    await writeFile(tempPath, contents, "utf8");
    await rename(tempPath, filePath);
}
async function readRecoveryState() {
    try {
        const raw = await readFile(recoveryStatePath, "utf8");
        return JSON.parse(raw);
    }
    catch {
        return { cleanExit: true };
    }
}
async function writeRecoveryState(state) {
    await mkdir(app.getPath("userData"), { recursive: true });
    await writeFile(recoveryStatePath, JSON.stringify(state, null, 2), "utf8");
}
function getExtension(filePath) {
    const segments = filePath.toLowerCase().split(".");
    return segments.length > 1 ? segments.at(-1) ?? "" : "";
}
function safeNumber(value) {
    const next = typeof value === "string" ? Number(value) : typeof value === "number" ? value : NaN;
    return Number.isFinite(next) ? next : null;
}
function parseFrameRate(value) {
    if (!value || value === "0/0") {
        return null;
    }
    const [numerator, denominator] = value.split("/");
    const top = Number(numerator);
    const bottom = Number(denominator);
    if (!Number.isFinite(top) || !Number.isFinite(bottom) || bottom === 0) {
        return null;
    }
    const frameRate = top / bottom;
    const commonRates = [23.976, 24, 25, 29.97, 30, 50, 59.94, 60];
    const nearest = commonRates.find((candidate) => Math.abs(candidate - frameRate) < 0.08);
    if (nearest != null) {
        return nearest;
    }
    return Math.round(frameRate * 100) / 100;
}
function normalizeColorToken(value) {
    if (!value) {
        return null;
    }
    const normalized = value.toLowerCase();
    switch (normalized) {
        case "bt709":
            return "Rec. 709";
        case "bt2020nc":
        case "bt2020":
            return "Rec. 2020";
        case "smpte170m":
            return "Rec. 601";
        case "smpte240m":
            return "SMPTE 240M";
        case "iec61966-2-1":
            return "sRGB";
        case "arib-std-b67":
            return "HLG";
        case "smpte2084":
            return "PQ";
        case "tv":
            return "Video range";
        case "pc":
            return "Full range";
        default:
            return value.replace(/_/g, " ");
    }
}
function normalizeColorProfile(videoStream) {
    if (!videoStream) {
        return null;
    }
    const colorSpace = normalizeColorToken(typeof videoStream.color_space === "string" ? videoStream.color_space : null);
    const colorPrimaries = normalizeColorToken(typeof videoStream.color_primaries === "string" ? videoStream.color_primaries : null);
    const colorTransfer = normalizeColorToken(typeof videoStream.color_transfer === "string" ? videoStream.color_transfer : null);
    const colorRange = normalizeColorToken(typeof videoStream.color_range === "string" ? videoStream.color_range : null);
    const parts = [colorSpace, colorPrimaries, colorTransfer, colorRange].filter((part, index, array) => Boolean(part) && array.indexOf(part) === index);
    return parts.length > 0 ? parts.join(" · ") : null;
}
async function tryFfprobeExecutable(executable, filePath) {
    const { stdout } = await execFileAsync(executable, [
        "-v",
        "quiet",
        "-print_format",
        "json",
        "-show_format",
        "-show_streams",
        filePath
    ]);
    return JSON.parse(stdout);
}
async function tryFfmpegThumbnail(executable, filePath) {
    return new Promise((resolve, reject) => {
        execFile(executable, [
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-ss",
            "00:00:00.500",
            "-i",
            filePath,
            "-frames:v",
            "1",
            "-vf",
            "scale=320:180:force_original_aspect_ratio=increase,crop=320:180",
            "-f",
            "image2pipe",
            "-vcodec",
            "mjpeg",
            "pipe:1"
        ], { encoding: "buffer", maxBuffer: 8 * 1024 * 1024 }, (error, stdout) => {
            if (error) {
                reject(error);
                return;
            }
            if (!stdout || stdout.length === 0) {
                reject(new Error("No thumbnail bytes returned."));
                return;
            }
            resolve(stdout);
        });
    });
}
async function generateDesktopThumbnail(filePath) {
    for (const executable of ffmpegCandidates) {
        try {
            const bytes = await tryFfmpegThumbnail(executable, filePath);
            return `data:image/jpeg;base64,${bytes.toString("base64")}`;
        }
        catch {
            // try next candidate
        }
    }
    return null;
}
async function scanMediaMetadataFromFfprobe(filePath) {
    try {
        let parsed = null;
        for (const executable of ffprobeCandidates) {
            try {
                parsed = await tryFfprobeExecutable(executable, filePath);
                break;
            }
            catch {
                parsed = null;
            }
        }
        if (!parsed) {
            return null;
        }
        const streams = parsed.streams ?? [];
        const videoStream = streams.find((stream) => stream.codec_type === "video");
        const audioStream = streams.find((stream) => stream.codec_type === "audio");
        const thumbnailDataUrl = videoStream ? await generateDesktopThumbnail(filePath) : null;
        return scanMediaMetadataResponseSchema.parse({
            extension: getExtension(filePath),
            durationSeconds: safeNumber(parsed.format?.duration ?? videoStream?.duration ?? audioStream?.duration),
            width: safeNumber(videoStream?.width),
            height: safeNumber(videoStream?.height),
            frameRate: parseFrameRate(typeof videoStream?.avg_frame_rate === "string" ? videoStream.avg_frame_rate : undefined) ??
                parseFrameRate(typeof videoStream?.r_frame_rate === "string" ? videoStream.r_frame_rate : undefined),
            colorSpace: normalizeColorProfile(videoStream),
            codecName: typeof videoStream?.codec_name === "string" ? videoStream.codec_name : null,
            sampleRate: safeNumber(audioStream?.sample_rate),
            channels: safeNumber(audioStream?.channels),
            thumbnailDataUrl,
            probeSource: "ffprobe"
        });
    }
    catch {
        return null;
    }
}
const menuTemplate = [
    {
        label: "File",
        submenu: [{ role: "quit" }]
    },
    {
        label: "Edit",
        submenu: [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "cut" },
            { role: "copy" },
            { role: "paste" },
            { role: "selectAll" }
        ]
    },
    {
        label: "Clip",
        submenu: []
    },
    {
        label: "Mark",
        submenu: []
    },
    {
        label: "View",
        submenu: [{ role: "reload" }, { role: "toggleDevTools" }]
    },
    {
        label: "AI",
        submenu: []
    },
    {
        label: "Window",
        submenu: [{ role: "minimize" }]
    }
];
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1440,
        height: 920,
        minWidth: 1180,
        minHeight: 760,
        backgroundColor: "#0e0e10",
        titleBarStyle: "hiddenInset",
        trafficLightPosition: { x: 16, y: 12 },
        webPreferences: {
            preload: join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
        }
    });
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        void shell.openExternal(url);
        return { action: "deny" };
    });
    if (isDev && !useStaticRenderer) {
        void mainWindow.loadURL("http://127.0.0.1:5173");
    }
    else {
        void mainWindow.loadFile(join(__dirname, "../dist-renderer/index.html"));
    }
}
app.whenReady().then(() => {
    ipcMain.handle("media:openImportDialog", async () => {
        const defaultDirectory = await ensureProjectDirectory();
        const result = await dialog.showOpenDialog({
            title: "Import Media",
            defaultPath: defaultDirectory,
            properties: ["openFile", "multiSelections"],
            filters: [
                { name: "Video", extensions: ["mp4", "mov", "mkv", "avi", "webm"] },
                { name: "Audio", extensions: ["wav", "mp3", "aac", "aiff", "flac", "m4a"] },
                { name: "Images", extensions: ["png", "jpg", "jpeg", "webp"] }
            ]
        });
        if (result.canceled || result.filePaths.length === 0) {
            return null;
        }
        return openMediaImportDialogResponseSchema.parse({
            filePaths: result.filePaths
        });
    });
    ipcMain.handle("media:scanMetadata", async (_event, payload) => {
        const request = scanMediaMetadataRequestSchema.parse(payload);
        const probed = await scanMediaMetadataFromFfprobe(request.filePath);
        if (probed) {
            return probed;
        }
        return mediaMetadataSchema.parse({
            extension: getExtension(request.filePath),
            durationSeconds: null,
            width: null,
            height: null,
            frameRate: null,
            colorSpace: null,
            codecName: null,
            sampleRate: null,
            channels: null,
            thumbnailDataUrl: null,
            probeSource: "fallback"
        });
    });
    ipcMain.handle("project:saveAs", async (_event, payload) => {
        const request = saveProjectAsRequestSchema.parse(payload);
        const defaultDirectory = await ensureProjectDirectory();
        const result = await dialog.showSaveDialog({
            title: "Create Vivido Project",
            defaultPath: join(defaultDirectory, request.defaultFileName),
            filters: [{ name: "Vivido Project", extensions: ["vivido"] }]
        });
        if (result.canceled || !result.filePath) {
            return null;
        }
        await atomicWrite(result.filePath, request.contents);
        return saveProjectAsResponseSchema.parse({ filePath: result.filePath });
    });
    ipcMain.handle("project:openDialog", async () => {
        const defaultDirectory = await ensureProjectDirectory();
        const result = await dialog.showOpenDialog({
            title: "Open Vivido Project",
            defaultPath: defaultDirectory,
            properties: ["openFile"],
            filters: [{ name: "Vivido Project", extensions: ["vivido"] }]
        });
        if (result.canceled || result.filePaths.length === 0) {
            return null;
        }
        const [filePath] = result.filePaths;
        const contents = await readFile(filePath, "utf8");
        return openProjectDialogResponseSchema.parse({
            filePath,
            contents
        });
    });
    ipcMain.handle("project:overwrite", async (_event, payload) => {
        const request = overwriteProjectRequestSchema.parse(payload);
        await atomicWrite(request.filePath, request.contents);
        return overwriteProjectResponseSchema.parse({
            savedAt: new Date().toISOString()
        });
    });
    ipcMain.handle("project:autosave", async (_event, payload) => {
        const request = autosaveProjectRequestSchema.parse(payload);
        const directories = await ensureRecoveryDirectories(request.projectId);
        const timestamp = new Date();
        const versionName = timestamp.toISOString().replaceAll(":", "-");
        const autosavePath = join(directories.autosaveDirectory, "latest.vivido");
        const versionPath = join(directories.versionsDirectory, `${versionName}.vivido`);
        await atomicWrite(autosavePath, request.contents);
        await atomicWrite(versionPath, request.contents);
        await atomicWrite(request.filePath, request.contents);
        await writeRecoveryState({
            cleanExit: false,
            projectId: request.projectId,
            originalFilePath: request.filePath,
            recoveryFilePath: autosavePath
        });
        return autosaveProjectResponseSchema.parse({
            autosavePath,
            versionPath,
            savedAt: timestamp.toISOString()
        });
    });
    ipcMain.handle("project:getRecoverySnapshot", async () => {
        const state = await readRecoveryState();
        if (state.cleanExit || !state.recoveryFilePath || !state.projectId) {
            return recoverySnapshotSchema.parse({ available: false });
        }
        try {
            const contents = await readFile(state.recoveryFilePath, "utf8");
            return recoverySnapshotSchema.parse({
                available: true,
                projectId: state.projectId,
                originalFilePath: state.originalFilePath,
                recoveryFilePath: state.recoveryFilePath,
                contents
            });
        }
        catch {
            return recoverySnapshotSchema.parse({ available: false });
        }
    });
    ipcMain.handle("project:markRecoveryHandled", async (_event, payload) => {
        const request = markRecoveryHandledRequestSchema.parse(payload);
        const currentState = await readRecoveryState();
        if (currentState.projectId === request.projectId) {
            await writeRecoveryState({
                cleanExit: true
            });
        }
        return markRecoveryHandledResponseSchema.parse({ ok: true });
    });
    ipcMain.handle("project:getVersionHistory", async (_event, payload) => {
        const request = versionHistoryRequestSchema.parse(payload);
        const directories = await ensureRecoveryDirectories(request.projectId);
        const entries = await readdir(directories.versionsDirectory);
        const items = entries
            .filter((entry) => entry.endsWith(".vivido"))
            .sort()
            .reverse()
            .slice(0, 20)
            .map((entry) => ({
            filePath: join(directories.versionsDirectory, entry),
            fileName: basename(entry),
            savedAt: entry.replace(".vivido", "").replaceAll("-", ":").replace("T", " T")
        }));
        return versionHistoryResponseSchema.parse({ items });
    });
    ipcMain.handle("project:readVersionSnapshot", async (_event, payload) => {
        const request = versionSnapshotRequestSchema.parse(payload);
        const contents = await readFile(request.filePath, "utf8");
        return versionSnapshotResponseSchema.parse({
            filePath: request.filePath,
            contents
        });
    });
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
    createWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("before-quit", () => {
    void writeRecoveryState({ cleanExit: true });
});
