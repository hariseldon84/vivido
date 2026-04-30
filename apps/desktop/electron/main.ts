import { app, BrowserWindow, Menu, dialog, ipcMain, shell, type MenuItemConstructorOptions } from "electron";
import { execFile } from "node:child_process";
import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import {
  autosaveProjectRequestSchema,
  autosaveProjectResponseSchema,
  markRecoveryHandledRequestSchema,
  markRecoveryHandledResponseSchema,
  mediaMetadataSchema,
  openMediaImportDialogResponseSchema,
  openProjectDialogResponseSchema,
  overwriteProjectRequestSchema,
  overwriteProjectResponseSchema,
  recoverySnapshotSchema,
  scanMediaMetadataRequestSchema,
  scanMediaMetadataResponseSchema,
  saveProjectAsRequestSchema,
  saveProjectAsResponseSchema,
  versionHistoryRequestSchema,
  versionHistoryResponseSchema,
  versionSnapshotRequestSchema,
  versionSnapshotResponseSchema
} from "@vivido/ipc";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDev = !app.isPackaged;
const useStaticRenderer = process.env.VIVIDO_USE_STATIC_RENDERER === "1";
const recoveryStatePath = join(app.getPath("userData"), "recovery-state.json");
const execFileAsync = promisify(execFile);

type RecoveryState = {
  cleanExit: boolean;
  projectId?: string;
  originalFilePath?: string;
  recoveryFilePath?: string;
};

async function ensureProjectDirectory() {
  const projectDirectory = join(app.getPath("videos"), "Vivido");
  await mkdir(projectDirectory, { recursive: true });
  return projectDirectory;
}

async function ensureRecoveryDirectories(projectId: string) {
  const baseDirectory = join(app.getPath("userData"), "recovery", projectId);
  const autosaveDirectory = join(baseDirectory, "autosaves");
  const versionsDirectory = join(baseDirectory, "versions");
  await mkdir(autosaveDirectory, { recursive: true });
  await mkdir(versionsDirectory, { recursive: true });
  return { baseDirectory, autosaveDirectory, versionsDirectory };
}

async function atomicWrite(filePath: string, contents: string) {
  const tempPath = `${filePath}.tmp`;
  await writeFile(tempPath, contents, "utf8");
  await rename(tempPath, filePath);
}

async function readRecoveryState(): Promise<RecoveryState> {
  try {
    const raw = await readFile(recoveryStatePath, "utf8");
    return JSON.parse(raw) as RecoveryState;
  } catch {
    return { cleanExit: true };
  }
}

async function writeRecoveryState(state: RecoveryState) {
  await mkdir(app.getPath("userData"), { recursive: true });
  await writeFile(recoveryStatePath, JSON.stringify(state, null, 2), "utf8");
}

function getExtension(filePath: string) {
  const segments = filePath.toLowerCase().split(".");
  return segments.length > 1 ? segments.at(-1) ?? "" : "";
}

function safeNumber(value: unknown) {
  const next = typeof value === "string" ? Number(value) : typeof value === "number" ? value : NaN;
  return Number.isFinite(next) ? next : null;
}

function parseFrameRate(value: string | undefined) {
  if (!value || value === "0/0") {
    return null;
  }

  const [numerator, denominator] = value.split("/");
  const top = Number(numerator);
  const bottom = Number(denominator);

  if (!Number.isFinite(top) || !Number.isFinite(bottom) || bottom === 0) {
    return null;
  }

  return top / bottom;
}

async function scanMediaMetadataFromFfprobe(filePath: string) {
  try {
    const { stdout } = await execFileAsync("ffprobe", [
      "-v",
      "quiet",
      "-print_format",
      "json",
      "-show_format",
      "-show_streams",
      filePath
    ]);
    const parsed = JSON.parse(stdout) as {
      streams?: Array<Record<string, unknown>>;
      format?: Record<string, unknown>;
    };
    const streams = parsed.streams ?? [];
    const videoStream = streams.find((stream) => stream.codec_type === "video");
    const audioStream = streams.find((stream) => stream.codec_type === "audio");

    return scanMediaMetadataResponseSchema.parse({
      extension: getExtension(filePath),
      durationSeconds: safeNumber(parsed.format?.duration ?? videoStream?.duration ?? audioStream?.duration),
      width: safeNumber(videoStream?.width),
      height: safeNumber(videoStream?.height),
      frameRate: parseFrameRate(typeof videoStream?.avg_frame_rate === "string" ? videoStream.avg_frame_rate : undefined),
      colorSpace: typeof videoStream?.color_space === "string" ? videoStream.color_space : null,
      sampleRate: safeNumber(audioStream?.sample_rate),
      channels: safeNumber(audioStream?.channels),
      probeSource: "ffprobe"
    });
  } catch {
    return null;
  }
}

const menuTemplate: MenuItemConstructorOptions[] = [
  {
    label: "File",
    submenu: [{ role: "quit" as const }]
  },
  {
    label: "Edit",
    submenu: [
      { role: "undo" as const },
      { role: "redo" as const },
      { type: "separator" as const },
      { role: "cut" as const },
      { role: "copy" as const },
      { role: "paste" as const },
      { role: "selectAll" as const }
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
    submenu: [{ role: "reload" as const }, { role: "toggleDevTools" as const }]
  },
  {
    label: "AI",
    submenu: []
  },
  {
    label: "Window",
    submenu: [{ role: "minimize" as const }]
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
  } else {
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

  ipcMain.handle("media:scanMetadata", async (_event, payload: unknown) => {
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
      sampleRate: null,
      channels: null,
      probeSource: "fallback"
    });
  });

  ipcMain.handle("project:saveAs", async (_event, payload: unknown) => {
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

  ipcMain.handle("project:overwrite", async (_event, payload: unknown) => {
    const request = overwriteProjectRequestSchema.parse(payload);
    await atomicWrite(request.filePath, request.contents);
    return overwriteProjectResponseSchema.parse({
      savedAt: new Date().toISOString()
    });
  });

  ipcMain.handle("project:autosave", async (_event, payload: unknown) => {
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
    } catch {
      return recoverySnapshotSchema.parse({ available: false });
    }
  });

  ipcMain.handle("project:markRecoveryHandled", async (_event, payload: unknown) => {
    const request = markRecoveryHandledRequestSchema.parse(payload);
    const currentState = await readRecoveryState();
    if (currentState.projectId === request.projectId) {
      await writeRecoveryState({
        cleanExit: true
      });
    }

    return markRecoveryHandledResponseSchema.parse({ ok: true });
  });

  ipcMain.handle("project:getVersionHistory", async (_event, payload: unknown) => {
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

  ipcMain.handle("project:readVersionSnapshot", async (_event, payload: unknown) => {
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
