import { z } from "zod";

export const mediaAssetKindSchema = z.enum(["video", "audio", "image"]);
export const mediaUsageStatusSchema = z.enum(["unused", "used"]);
export const mediaProbeSourceSchema = z.enum(["ffprobe", "browser", "fallback"]);

export const mediaAssetMetadataSchema = z.object({
  extension: z.string(),
  durationSeconds: z.number().nullable().default(null),
  width: z.number().nullable().default(null),
  height: z.number().nullable().default(null),
  frameRate: z.number().nullable().default(null),
  colorSpace: z.string().nullable().default(null),
  codecName: z.string().nullable().default(null),
  sampleRate: z.number().nullable().default(null),
  channels: z.number().nullable().default(null),
  thumbnailDataUrl: z.string().nullable().default(null),
  probeSource: mediaProbeSourceSchema.default("fallback")
});

export const mediaAssetSchema = z.object({
  id: z.string(),
  path: z.string(),
  kind: mediaAssetKindSchema,
  label: z.string(),
  sourceName: z.string(),
  usageStatus: mediaUsageStatusSchema,
  durationLabel: z.string(),
  technicalSummary: z.string(),
  metadata: mediaAssetMetadataSchema.default({
    extension: "",
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
  })
});

export const vividProjectSchema = z.object({
  schemaVersion: z.literal("1.0.0"),
  projectId: z.string(),
  name: z.string(),
  editorNotes: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  mediaAssets: z.array(mediaAssetSchema),
  timeline: z.object({
    tracks: z.array(
      z.object({
        id: z.string(),
        kind: z.enum(["video", "audio", "caption"]),
        label: z.string()
      })
    )
  }),
  settings: z.object({
    autosaveEnabled: z.boolean(),
    versionHistoryDays: z.number().int().min(1)
  })
});

export type VividoProject = z.infer<typeof vividProjectSchema>;
export type MediaAsset = z.infer<typeof mediaAssetSchema>;
export type MediaAssetKind = z.infer<typeof mediaAssetKindSchema>;
export type MediaAssetMetadata = z.infer<typeof mediaAssetMetadataSchema>;

const videoExtensions = new Set(["mp4", "mov", "mkv", "avi", "webm"]);
const audioExtensions = new Set(["wav", "mp3", "aac", "aiff", "flac", "m4a"]);
const imageExtensions = new Set(["png", "jpg", "jpeg", "webp"]);

function getExtension(filePath: string) {
  const segments = filePath.toLowerCase().split(".");
  return segments.length > 1 ? segments.at(-1) ?? "" : "";
}

export function inferMediaKind(filePath: string): MediaAssetKind {
  const extension = getExtension(filePath);

  if (videoExtensions.has(extension)) {
    return "video";
  }

  if (audioExtensions.has(extension)) {
    return "audio";
  }

  return "image";
}

function formatDurationLabelFromSeconds(durationSeconds: number | null) {
  if (durationSeconds == null || Number.isNaN(durationSeconds)) {
    return "Pending scan";
  }

  if (durationSeconds < 1) {
    return "< 1s";
  }

  const totalSeconds = Math.round(durationSeconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function buildTechnicalSummary(kind: MediaAssetKind, metadata: MediaAssetMetadata) {
  const extension = metadata.extension.toUpperCase();

  switch (kind) {
    case "video":
      return [
        extension || "Unknown",
        metadata.codecName ? metadata.codecName.toUpperCase() : null,
        metadata.width && metadata.height ? `${metadata.width}×${metadata.height}` : null,
        metadata.frameRate ? `${metadata.frameRate.toFixed(2)} fps` : null,
        metadata.colorSpace ?? null
      ]
        .filter(Boolean)
        .join(" · ");
    case "audio":
      return [
        extension || "Unknown",
        metadata.sampleRate ? `${Math.round(metadata.sampleRate / 1000)} kHz` : null,
        metadata.channels ? `${metadata.channels} ch` : null
      ]
        .filter(Boolean)
        .join(" · ");
    case "image":
      return [
        extension || "Unknown",
        metadata.width && metadata.height ? `${metadata.width}×${metadata.height}` : null,
        "Still asset"
      ]
        .filter(Boolean)
        .join(" · ");
  }
}

function buildDurationLabel(kind: MediaAssetKind, durationSeconds: number | null = null) {
  switch (kind) {
    case "video":
      return formatDurationLabelFromSeconds(durationSeconds);
    case "audio":
      return formatDurationLabelFromSeconds(durationSeconds);
    case "image":
      return "Still";
  }
}

export function createImportedAsset(filePath: string): MediaAsset {
  const pathParts = filePath.split(/[\\/]/);
  const sourceName = pathParts.at(-1) ?? filePath;
  const kind = inferMediaKind(filePath);
  const metadata: MediaAssetMetadata = {
    extension: getExtension(filePath),
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
  };

  return {
    id: crypto.randomUUID(),
    path: filePath,
    kind,
    label: sourceName.replace(/\.[^.]+$/, ""),
    sourceName,
    usageStatus: "unused",
    durationLabel: buildDurationLabel(kind, metadata.durationSeconds),
    technicalSummary: buildTechnicalSummary(kind, metadata),
    metadata
  };
}

export function enrichImportedAsset(asset: MediaAsset, metadataPatch: Partial<MediaAssetMetadata>): MediaAsset {
  const metadata = mediaAssetMetadataSchema.parse({
    ...asset.metadata,
    ...metadataPatch
  });

  return {
    ...asset,
    durationLabel: buildDurationLabel(asset.kind, metadata.durationSeconds),
    technicalSummary: buildTechnicalSummary(asset.kind, metadata),
    metadata
  };
}

export function parseProjectFile(contents: string): VividoProject {
  return vividProjectSchema.parse(JSON.parse(contents));
}

export function serializeProjectFile(project: VividoProject): string {
  return JSON.stringify(project, null, 2);
}

export function createBlankProject(name: string): VividoProject {
  const timestamp = new Date().toISOString();

  return {
    schemaVersion: "1.0.0",
    projectId: crypto.randomUUID(),
    name,
    editorNotes: "",
    createdAt: timestamp,
    updatedAt: timestamp,
    mediaAssets: [],
    timeline: {
      tracks: []
    },
    settings: {
      autosaveEnabled: true,
      versionHistoryDays: 30
    }
  };
}
