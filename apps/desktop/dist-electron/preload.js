import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("electronAPI", {
    platform: "desktop",
    project: {
        saveAs(payload) {
            return ipcRenderer.invoke("project:saveAs", payload);
        },
        openDialog() {
            return ipcRenderer.invoke("project:openDialog");
        },
        overwrite(payload) {
            return ipcRenderer.invoke("project:overwrite", payload);
        },
        autosave(payload) {
            return ipcRenderer.invoke("project:autosave", payload);
        },
        getRecoverySnapshot() {
            return ipcRenderer.invoke("project:getRecoverySnapshot");
        },
        markRecoveryHandled(projectId) {
            return ipcRenderer.invoke("project:markRecoveryHandled", { projectId });
        },
        getVersionHistory(projectId) {
            return ipcRenderer.invoke("project:getVersionHistory", { projectId });
        },
        readVersionSnapshot(filePath) {
            return ipcRenderer.invoke("project:readVersionSnapshot", { filePath });
        }
    }
});
