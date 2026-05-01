import { z } from "zod";
export const platformErrorSchema = z.object({
    code: z.string(),
    message: z.string()
});
export const createProjectRequestSchema = z.object({
    name: z.string().min(1),
    outputDirectory: z.string().min(1)
});
export const createProjectResponseSchema = z.object({
    projectId: z.string(),
    filePath: z.string()
});
export const importMediaRequestSchema = z.object({
    projectId: z.string(),
    filePaths: z.array(z.string()).min(1)
});
export const importMediaResponseSchema = z.object({
    importedAssetIds: z.array(z.string()),
    duplicateFilePaths: z.array(z.string()).default([])
});
export const openMediaImportDialogResponseSchema = z.object({
    filePaths: z.array(z.string())
});
export const mediaMetadataSchema = z.object({
    extension: z.string(),
    durationSeconds: z.number().nullable(),
    width: z.number().nullable(),
    height: z.number().nullable(),
    frameRate: z.number().nullable(),
    colorSpace: z.string().nullable(),
    codecName: z.string().nullable(),
    sampleRate: z.number().nullable(),
    channels: z.number().nullable(),
    thumbnailDataUrl: z.string().nullable(),
    probeSource: z.enum(["ffprobe", "browser", "fallback"])
});
export const scanMediaMetadataRequestSchema = z.object({
    filePath: z.string().min(1)
});
export const scanMediaMetadataResponseSchema = mediaMetadataSchema;
export const startTranscriptJobRequestSchema = z.object({
    projectId: z.string(),
    assetId: z.string(),
    language: z.string().optional(),
    modelTier: z.enum(["large-v3", "medium"]).optional()
});
export const platformJobStartSchema = z.object({
    jobId: z.string(),
    acceptedAt: z.string()
});
export const platformJobProgressSchema = z.object({
    jobId: z.string(),
    percent: z.number().min(0).max(100),
    stage: z.string(),
    message: z.string().optional()
});
export const saveProjectAsRequestSchema = z.object({
    defaultFileName: z.string().min(1),
    contents: z.string().min(2)
});
export const saveProjectAsResponseSchema = z.object({
    filePath: z.string()
});
export const openProjectDialogResponseSchema = z.object({
    filePath: z.string(),
    contents: z.string().min(2)
});
export const overwriteProjectRequestSchema = z.object({
    filePath: z.string().min(1),
    contents: z.string().min(2)
});
export const overwriteProjectResponseSchema = z.object({
    savedAt: z.string()
});
export const autosaveProjectRequestSchema = z.object({
    filePath: z.string().min(1),
    contents: z.string().min(2),
    projectId: z.string().min(1)
});
export const autosaveProjectResponseSchema = z.object({
    autosavePath: z.string(),
    versionPath: z.string(),
    savedAt: z.string()
});
export const recoverySnapshotSchema = z.object({
    available: z.boolean(),
    projectId: z.string().optional(),
    originalFilePath: z.string().optional(),
    recoveryFilePath: z.string().optional(),
    contents: z.string().optional()
});
export const versionHistoryItemSchema = z.object({
    filePath: z.string(),
    savedAt: z.string(),
    fileName: z.string()
});
export const versionHistoryRequestSchema = z.object({
    projectId: z.string().min(1)
});
export const versionHistoryResponseSchema = z.object({
    items: z.array(versionHistoryItemSchema)
});
export const versionSnapshotRequestSchema = z.object({
    filePath: z.string().min(1)
});
export const versionSnapshotResponseSchema = z.object({
    filePath: z.string(),
    contents: z.string().min(2)
});
export const markRecoveryHandledRequestSchema = z.object({
    projectId: z.string().min(1)
});
export const markRecoveryHandledResponseSchema = z.object({
    ok: z.literal(true)
});
