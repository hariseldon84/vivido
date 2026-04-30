import { contextBridge, ipcRenderer } from "electron";
import { autosaveProjectRequestSchema, autosaveProjectResponseSchema, markRecoveryHandledRequestSchema, markRecoveryHandledResponseSchema, openMediaImportDialogResponseSchema, openProjectDialogResponseSchema, overwriteProjectRequestSchema, overwriteProjectResponseSchema, recoverySnapshotSchema, scanMediaMetadataRequestSchema, scanMediaMetadataResponseSchema, saveProjectAsRequestSchema, saveProjectAsResponseSchema, versionHistoryRequestSchema, versionHistoryResponseSchema, versionSnapshotRequestSchema, versionSnapshotResponseSchema } from "@vivido/ipc";
const projectBridge = {
    async saveAs(payload) {
        const response = await ipcRenderer.invoke("project:saveAs", saveProjectAsRequestSchema.parse(payload));
        return response ? saveProjectAsResponseSchema.parse(response) : null;
    },
    async openDialog() {
        const response = await ipcRenderer.invoke("project:openDialog");
        return response ? openProjectDialogResponseSchema.parse(response) : null;
    },
    async overwrite(payload) {
        const response = await ipcRenderer.invoke("project:overwrite", overwriteProjectRequestSchema.parse(payload));
        return overwriteProjectResponseSchema.parse(response);
    },
    async autosave(payload) {
        const response = await ipcRenderer.invoke("project:autosave", autosaveProjectRequestSchema.parse(payload));
        return autosaveProjectResponseSchema.parse(response);
    },
    async getRecoverySnapshot() {
        const response = await ipcRenderer.invoke("project:getRecoverySnapshot");
        return recoverySnapshotSchema.parse(response);
    },
    async markRecoveryHandled(payload) {
        const response = await ipcRenderer.invoke("project:markRecoveryHandled", markRecoveryHandledRequestSchema.parse(payload));
        return markRecoveryHandledResponseSchema.parse(response);
    },
    async getVersionHistory(projectId) {
        const response = await ipcRenderer.invoke("project:getVersionHistory", versionHistoryRequestSchema.parse({ projectId }));
        return versionHistoryResponseSchema.parse(response);
    },
    async readVersionSnapshot(payload) {
        const response = await ipcRenderer.invoke("project:readVersionSnapshot", versionSnapshotRequestSchema.parse(payload));
        return versionSnapshotResponseSchema.parse(response);
    }
};
contextBridge.exposeInMainWorld("electronAPI", {
    platform: "desktop",
    media: {
        async openImportDialog() {
            const response = await ipcRenderer.invoke("media:openImportDialog");
            return response ? openMediaImportDialogResponseSchema.parse(response) : null;
        },
        async scanMetadata(filePath) {
            const response = await ipcRenderer.invoke("media:scanMetadata", scanMediaMetadataRequestSchema.parse({ filePath }));
            return scanMediaMetadataResponseSchema.parse(response);
        }
    },
    project: projectBridge
});
