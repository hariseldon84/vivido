import { app, BrowserWindow, Menu, dialog, ipcMain, shell } from "electron";
import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const isDev = !app.isPackaged;
const useStaticRenderer = process.env.VIVIDO_USE_STATIC_RENDERER === "1";
const recoveryStatePath = join(app.getPath("userData"), "recovery-state.json");
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
    ipcMain.handle("project:saveAs", async (_event, payload) => {
        const defaultDirectory = await ensureProjectDirectory();
        const result = await dialog.showSaveDialog({
            title: "Create Vivido Project",
            defaultPath: join(defaultDirectory, payload.defaultFileName),
            filters: [{ name: "Vivido Project", extensions: ["vivido"] }]
        });
        if (result.canceled || !result.filePath) {
            return null;
        }
        await atomicWrite(result.filePath, payload.contents);
        return { filePath: result.filePath };
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
        return {
            filePath,
            contents
        };
    });
    ipcMain.handle("project:overwrite", async (_event, payload) => {
        await atomicWrite(payload.filePath, payload.contents);
        return {
            savedAt: new Date().toISOString()
        };
    });
    ipcMain.handle("project:autosave", async (_event, payload) => {
        const directories = await ensureRecoveryDirectories(payload.projectId);
        const timestamp = new Date();
        const versionName = timestamp.toISOString().replaceAll(":", "-");
        const autosavePath = join(directories.autosaveDirectory, "latest.vivido");
        const versionPath = join(directories.versionsDirectory, `${versionName}.vivido`);
        await atomicWrite(autosavePath, payload.contents);
        await atomicWrite(versionPath, payload.contents);
        await atomicWrite(payload.filePath, payload.contents);
        await writeRecoveryState({
            cleanExit: false,
            projectId: payload.projectId,
            originalFilePath: payload.filePath,
            recoveryFilePath: autosavePath
        });
        return {
            autosavePath,
            versionPath,
            savedAt: timestamp.toISOString()
        };
    });
    ipcMain.handle("project:getRecoverySnapshot", async () => {
        const state = await readRecoveryState();
        if (state.cleanExit || !state.recoveryFilePath || !state.projectId) {
            return { available: false };
        }
        try {
            const contents = await readFile(state.recoveryFilePath, "utf8");
            return {
                available: true,
                projectId: state.projectId,
                originalFilePath: state.originalFilePath,
                recoveryFilePath: state.recoveryFilePath,
                contents
            };
        }
        catch {
            return { available: false };
        }
    });
    ipcMain.handle("project:markRecoveryHandled", async (_event, payload) => {
        const currentState = await readRecoveryState();
        if (currentState.projectId === payload.projectId) {
            await writeRecoveryState({
                cleanExit: true
            });
        }
        return { ok: true };
    });
    ipcMain.handle("project:getVersionHistory", async (_event, payload) => {
        const directories = await ensureRecoveryDirectories(payload.projectId);
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
        return { items };
    });
    ipcMain.handle("project:readVersionSnapshot", async (_event, payload) => {
        const contents = await readFile(payload.filePath, "utf8");
        return {
            filePath: payload.filePath,
            contents
        };
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
