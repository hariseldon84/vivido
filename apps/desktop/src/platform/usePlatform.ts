import { useMemo } from "react";
import {
  autosaveProjectRequestSchema,
  autosaveProjectResponseSchema,
  openProjectDialogResponseSchema,
  overwriteProjectRequestSchema,
  recoverySnapshotSchema,
  scanMediaMetadataResponseSchema,
  saveProjectAsRequestSchema,
  saveProjectAsResponseSchema,
  versionHistoryRequestSchema,
  versionHistoryResponseSchema,
  versionSnapshotRequestSchema,
  versionSnapshotResponseSchema
} from "@vivido/ipc";
import {
  createImportedAsset,
  createBlankProject,
  enrichImportedAsset,
  parseProjectFile,
  serializeProjectFile,
  type MediaAssetMetadata,
  type MediaAsset,
  type VividoProject
} from "@vivido/project";

export type PlatformCapabilityName =
  | "media"
  | "transcript"
  | "timeline"
  | "audio"
  | "publish"
  | "project"
  | "system";

type UnsupportedResult = {
  ok: false;
  error: {
    code: "UNSUPPORTED";
    message: string;
  };
};

type NotYetImplementedResult = {
  ok: false;
  error: {
    code: "NOT_IMPLEMENTED";
    message: string;
  };
};

type SuccessResult<T> = {
  ok: true;
  data: T;
};

type CancelledResult = {
  ok: false;
  error: {
    code: "CANCELLED";
    message: string;
  };
};

type InvalidProjectResult = {
  ok: false;
  error: {
    code: "INVALID_PROJECT";
    message: string;
  };
};

type RecoverySnapshotResult = {
  ok: true;
  data: {
    project: VividoProject;
    originalFilePath: string;
    recoveryFilePath: string;
  } | null;
};

type VersionHistoryResult = SuccessResult<{
  items: Array<{
    filePath: string;
    savedAt: string;
    fileName: string;
  }>;
}>;

type VersionSnapshotResult = SuccessResult<{
  project: VividoProject;
  filePath: string;
}>;

type ExportProjectResult = SuccessResult<{
  fileName: string;
  filePath?: string;
  savedAt?: string;
  boundToProjectPath: boolean;
}>;

type PreviewVersionItem = {
  filePath: string;
  savedAt: string;
  fileName: string;
};

const PREVIEW_PROJECT_KEY = "vivido.preview.project";
const PREVIEW_RECOVERY_KEY = "vivido.preview.recovery";
const PREVIEW_VERSION_HISTORY_KEY = "vivido.preview.versionHistory";
const PREVIEW_FILE_PATH = "Preview runtime · local storage";

function hasDesktopProjectRuntime() {
  return Boolean(window.electronAPI?.project);
}

function hasDesktopMediaRuntime() {
  return Boolean(window.electronAPI?.media);
}

function downloadTextFile(fileName: string, contents: string) {
  const blob = new Blob([contents], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

type PreviewImportCandidate = {
  filePath: string;
  file?: File;
};

type FileWithPath = File & {
  path?: string;
};

function filePathToFileUrl(filePath: string) {
  if (filePath.startsWith("file://")) {
    return filePath;
  }

  const normalized = filePath.replace(/\\/g, "/");
  if (normalized.startsWith("/")) {
    return `file://${encodeURI(normalized)}`;
  }

  return `file:///${encodeURI(normalized)}`;
}

function loadMetadataFromVideoSource(sourceUrl: string): Promise<Partial<MediaAssetMetadata>> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      resolve({
        durationSeconds: Number.isFinite(video.duration) ? video.duration : null,
        width: video.videoWidth || null,
        height: video.videoHeight || null,
        probeSource: "browser"
      });
    };
    video.onerror = () => resolve({ probeSource: "fallback" });
    video.src = sourceUrl;
  });
}

async function loadAudioDecodeMetadata(file?: File): Promise<Partial<MediaAssetMetadata>> {
  if (!file) {
    return {};
  }

  try {
    const audioContext = new AudioContext();
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0));
    await audioContext.close();

    return {
      sampleRate: audioBuffer.sampleRate,
      channels: audioBuffer.numberOfChannels
    };
  } catch {
    return {};
  }
}

function loadMetadataFromAudioSource(sourceUrl: string, file?: File): Promise<Partial<MediaAssetMetadata>> {
  return new Promise((resolve) => {
    const audio = document.createElement("audio");
    audio.preload = "metadata";
    audio.onloadedmetadata = async () => {
      const decoded = await loadAudioDecodeMetadata(file);
      resolve({
        durationSeconds: Number.isFinite(audio.duration) ? audio.duration : null,
        ...decoded,
        probeSource: "browser"
      });
    };
    audio.onerror = () => resolve({ probeSource: "fallback" });
    audio.src = sourceUrl;
  });
}

function loadMetadataFromImageSource(sourceUrl: string): Promise<Partial<MediaAssetMetadata>> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      resolve({
        width: image.naturalWidth || null,
        height: image.naturalHeight || null,
        probeSource: "browser"
      });
    };
    image.onerror = () => resolve({ probeSource: "fallback" });
    image.src = sourceUrl;
  });
}

async function scanPreviewAssetMetadata(asset: MediaAsset, file?: File): Promise<MediaAsset> {
  const sourceUrl = file ? URL.createObjectURL(file) : filePathToFileUrl(asset.path);

  try {
    let metadataPatch: Partial<MediaAssetMetadata>;

    switch (asset.kind) {
      case "video":
        metadataPatch = await loadMetadataFromVideoSource(sourceUrl);
        break;
      case "audio":
        metadataPatch = await loadMetadataFromAudioSource(sourceUrl, file);
        break;
      case "image":
        metadataPatch = await loadMetadataFromImageSource(sourceUrl);
        break;
    }

    return enrichImportedAsset(asset, metadataPatch);
  } finally {
    if (file) {
      URL.revokeObjectURL(sourceUrl);
    }
  }
}

function openPreviewMediaPicker(): Promise<PreviewImportCandidate[]> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = ".mp4,.mov,.mkv,.avi,.webm,.wav,.mp3,.aac,.aiff,.flac,.m4a,.png,.jpg,.jpeg,.webp";
    input.onchange = () => {
      const files = Array.from(input.files ?? []);
      resolve(
        files.map((file) => ({
          filePath: `preview://imports/${file.name}`,
          file
        }))
      );
    };
    input.click();
  });
}

async function buildImportedAssets(
  candidates: PreviewImportCandidate[],
  isDesktopRuntime: boolean
): Promise<MediaAsset[]> {
  return Promise.all(
    candidates.map(async ({ filePath, file }) => {
      const baseAsset = createImportedAsset(filePath);

      if (isDesktopRuntime && filePath.startsWith("/") && window.electronAPI?.media) {
        const metadata = scanMediaMetadataResponseSchema.parse(
          await window.electronAPI.media.scanMetadata(filePath)
        );
        return enrichImportedAsset(baseAsset, metadata);
      }

      return scanPreviewAssetMetadata(baseAsset, file);
    })
  );
}

function readPreviewProject(): VividoProject | null {
  const raw = window.localStorage.getItem(PREVIEW_PROJECT_KEY);
  if (!raw) {
    return null;
  }

  try {
    return parseProjectFile(raw);
  } catch {
    return null;
  }
}

function writePreviewProject(project: VividoProject) {
  window.localStorage.setItem(PREVIEW_PROJECT_KEY, serializeProjectFile(project));
}

function readPreviewVersions(): PreviewVersionItem[] {
  const raw = window.localStorage.getItem(PREVIEW_VERSION_HISTORY_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as PreviewVersionItem[];
  } catch {
    return [];
  }
}

function writePreviewVersions(items: PreviewVersionItem[]) {
  window.localStorage.setItem(PREVIEW_VERSION_HISTORY_KEY, JSON.stringify(items));
}

function pushPreviewVersion(project: VividoProject, savedAt: string) {
  const snapshotPath = `preview://${project.projectId}/${savedAt}`;
  window.localStorage.setItem(snapshotPath, serializeProjectFile(project));

  const items = readPreviewVersions();
  const nextItems = [
    {
      filePath: snapshotPath,
      savedAt,
      fileName: `preview-${new Date(savedAt).toISOString().replaceAll(":", "-")}.vivido`
    },
    ...items
  ].slice(0, 20);

  writePreviewVersions(nextItems);
}

function writePreviewRecovery(project: VividoProject) {
  window.localStorage.setItem(PREVIEW_RECOVERY_KEY, serializeProjectFile(project));
}

function clearPreviewRecovery() {
  window.localStorage.removeItem(PREVIEW_RECOVERY_KEY);
}

function readPreviewRecovery(): VividoProject | null {
  const raw = window.localStorage.getItem(PREVIEW_RECOVERY_KEY);
  if (!raw) {
    return null;
  }

  try {
    return parseProjectFile(raw);
  } catch {
    return null;
  }
}

function unsupported(message: string): UnsupportedResult {
  return {
    ok: false,
    error: {
      code: "UNSUPPORTED",
      message
    }
  };
}

function notImplemented(message: string): NotYetImplementedResult {
  return {
    ok: false,
    error: {
      code: "NOT_IMPLEMENTED",
      message
    }
  };
}

async function saveProjectAs(project: VividoProject, defaultFileName: string): Promise<SuccessResult<{ filePath: string }> | UnsupportedResult | CancelledResult> {
  if (!window.electronAPI?.project) {
    return unsupported("Project file saving is only available in the desktop runtime.");
  }

  const request = saveProjectAsRequestSchema.parse({
    defaultFileName,
    contents: serializeProjectFile(project)
  });

  const response = await window.electronAPI.project.saveAs(request);

  if (!response) {
    return {
      ok: false as const,
      error: {
        code: "CANCELLED",
        message: "Project creation was cancelled."
      }
    };
  }

  return {
    ok: true as const,
    data: saveProjectAsResponseSchema.parse(response)
  };
}

export function usePlatform() {
  const runtimeLabel = typeof window !== "undefined" && window.electronAPI?.platform === "desktop" ? "Desktop runtime detected" : "Preview runtime";
  const projectBridge = window.electronAPI?.project;
  const isDesktopRuntime = hasDesktopProjectRuntime();

  return useMemo(
    () => ({
      isDesktopRuntime,
      runtimeLabel,
      runtimeMode: isDesktopRuntime ? "Desktop file mode" : "Preview local-storage mode",
      description: "Grouped capability API scaffold. Real Electron/native implementations will be wired behind these namespaces.",
      media: {
        async importFiles(): Promise<
          SuccessResult<{ assets: MediaAsset[]; duplicateCount: number }> | CancelledResult | UnsupportedResult
        > {
          let candidates: PreviewImportCandidate[] = [];

          if (hasDesktopMediaRuntime()) {
            const response = await window.electronAPI!.media.openImportDialog();

            if (!response || response.filePaths.length === 0) {
              return {
                ok: false,
                error: {
                  code: "CANCELLED",
                  message: "Media import was cancelled."
                }
              };
            }

            candidates = response.filePaths.map((filePath) => ({ filePath }));
          } else {
            candidates = await openPreviewMediaPicker();

            if (candidates.length === 0) {
              return {
                ok: false,
                error: {
                  code: "CANCELLED",
                  message: "No preview media files were selected."
                }
              };
            }
          }

          const assets = await buildImportedAssets(candidates, isDesktopRuntime);

          return {
            ok: true,
            data: {
              assets,
              duplicateCount: 0
            }
          };
        },
        async importDroppedFiles(files: File[]): Promise<
          SuccessResult<{ assets: MediaAsset[]; duplicateCount: number }> | CancelledResult | UnsupportedResult
        > {
          if (files.length === 0) {
            return {
              ok: false,
              error: {
                code: "CANCELLED",
                message: "No media files were dropped."
              }
            };
          }

          const candidates = files.map((file) => {
            const fileWithPath = file as FileWithPath;
            return {
              filePath: fileWithPath.path && fileWithPath.path.length > 0 ? fileWithPath.path : `preview://imports/${file.name}`,
              file
            };
          });

          const assets = await buildImportedAssets(candidates, isDesktopRuntime);

          return {
            ok: true,
            data: {
              assets,
              duplicateCount: 0
            }
          };
        }
      },
      transcript: {
        async startJob() {
          return unsupported("Transcript jobs are not available in the shell scaffold yet.");
        }
      },
      timeline: {
        async analyzeClip() {
          return unsupported("Timeline analysis is not available in the shell scaffold yet.");
        }
      },
      audio: {
        async previewChain() {
          return unsupported("Audio preview is not available in the shell scaffold yet.");
        }
      },
      publish: {
        async renderPackage() {
          return unsupported("Publish Package rendering is not available in the shell scaffold yet.");
        }
      },
      project: {
        async createBlank(name: string): Promise<SuccessResult<{ project: VividoProject; filePath: string }> | UnsupportedResult | CancelledResult> {
          if (!hasDesktopProjectRuntime()) {
            const project = createBlankProject(name);
            const savedAt = new Date().toISOString();
            writePreviewProject(project);
            pushPreviewVersion(project, savedAt);
            clearPreviewRecovery();

            return {
              ok: true,
              data: {
                project,
                filePath: PREVIEW_FILE_PATH
              }
            };
          }

          const project = createBlankProject(name);
          const result = await saveProjectAs(project, `${name}.vivido`);

          if (!result.ok) {
            return result;
          }

          return {
            ok: true,
            data: {
              project,
              filePath: result.data.filePath
            }
          };
        },
        async openExisting(): Promise<SuccessResult<{ project: VividoProject; filePath: string }> | UnsupportedResult | CancelledResult | InvalidProjectResult> {
          if (!hasDesktopProjectRuntime()) {
            const project = readPreviewProject();

            if (!project) {
              return {
                ok: false,
                error: {
                  code: "CANCELLED",
                  message: "No saved preview project exists yet. Create a project and save it first."
                }
              };
            }

            return {
              ok: true,
              data: {
                project,
                filePath: PREVIEW_FILE_PATH
              }
            };
          }

          const response = await projectBridge!.openDialog();

          if (!response) {
            return {
              ok: false,
              error: {
                code: "CANCELLED",
                message: "Project opening was cancelled."
              }
            };
          }

          const parsedResponse = openProjectDialogResponseSchema.parse(response);

          try {
            const project = parseProjectFile(parsedResponse.contents);

            return {
              ok: true,
              data: {
                project,
                filePath: parsedResponse.filePath
              }
            };
          } catch {
            return {
              ok: false,
              error: {
                code: "INVALID_PROJECT",
                message: "The selected file is not a valid .vivido project."
              }
            };
          }
        },
        async saveNow(project: VividoProject, filePath: string): Promise<SuccessResult<{ savedAt: string }> | UnsupportedResult> {
          if (!hasDesktopProjectRuntime()) {
            const savedAt = new Date().toISOString();
            writePreviewProject(project);
            pushPreviewVersion(project, savedAt);
            clearPreviewRecovery();

            return {
              ok: true,
              data: {
                savedAt
              }
            };
          }

          const response = await projectBridge!.overwrite(
            overwriteProjectRequestSchema.parse({
              filePath,
              contents: serializeProjectFile(project)
            })
          );

          return {
            ok: true,
            data: response
          };
        },
        async saveAs(project: VividoProject): Promise<SuccessResult<{ filePath: string; savedAt: string }> | UnsupportedResult | CancelledResult> {
          if (!isDesktopRuntime) {
            const savedAt = new Date().toISOString();
            writePreviewProject(project);
            pushPreviewVersion(project, savedAt);
            clearPreviewRecovery();

            return {
              ok: true,
              data: {
                filePath: PREVIEW_FILE_PATH,
                savedAt
              }
            };
          }

          const fileName = `${project.name || "Untitled Project"}.vivido`;
          const result = await saveProjectAs(project, fileName);

          if (!result.ok) {
            return result;
          }

          return {
            ok: true,
            data: {
              filePath: result.data.filePath,
              savedAt: new Date().toISOString()
            }
          };
        },
        async autosave(project: VividoProject, filePath: string): Promise<SuccessResult<{ autosavePath: string; versionPath: string; savedAt: string }> | UnsupportedResult> {
          if (!hasDesktopProjectRuntime()) {
            const savedAt = new Date().toISOString();
            writePreviewProject(project);
            writePreviewRecovery(project);
            pushPreviewVersion(project, savedAt);

            return {
              ok: true,
              data: {
                autosavePath: "preview://autosave/latest",
                versionPath: `preview://${project.projectId}/${savedAt}`,
                savedAt
              }
            };
          }

          const response = await projectBridge!.autosave(
            autosaveProjectRequestSchema.parse({
              filePath,
              contents: serializeProjectFile(project),
              projectId: project.projectId
            })
          );

          return {
            ok: true,
            data: autosaveProjectResponseSchema.parse(response)
          };
        },
        async getRecoverySnapshot(): Promise<RecoverySnapshotResult | UnsupportedResult | InvalidProjectResult> {
          if (!hasDesktopProjectRuntime()) {
            const project = readPreviewRecovery();

            return {
              ok: true,
              data: project
                ? {
                    project,
                    originalFilePath: PREVIEW_FILE_PATH,
                    recoveryFilePath: "preview://autosave/latest"
                  }
                : null
            };
          }

          const response = recoverySnapshotSchema.parse(await projectBridge!.getRecoverySnapshot());

          if (!response.available || !response.contents || !response.originalFilePath || !response.recoveryFilePath) {
            return {
              ok: true,
              data: null
            };
          }

          try {
            return {
              ok: true,
              data: {
                project: parseProjectFile(response.contents),
                originalFilePath: response.originalFilePath,
                recoveryFilePath: response.recoveryFilePath
              }
            };
          } catch {
            return {
              ok: false,
              error: {
                code: "INVALID_PROJECT",
                message: "Recovery snapshot exists but could not be parsed."
              }
            };
          }
        },
        async markRecoveryHandled(projectId: string): Promise<SuccessResult<{ ok: true }> | UnsupportedResult> {
          if (!hasDesktopProjectRuntime()) {
            clearPreviewRecovery();

            return {
              ok: true,
              data: {
                ok: true
              }
            };
          }

          const response = await projectBridge!.markRecoveryHandled({ projectId });

          return {
            ok: true,
            data: response
          };
        },
        async getVersionHistory(projectId: string): Promise<VersionHistoryResult | UnsupportedResult> {
          if (!hasDesktopProjectRuntime()) {
            return {
              ok: true,
              data: {
                items: readPreviewVersions().filter((item) => item.filePath.includes(projectId))
              }
            };
          }

          const response = await projectBridge!.getVersionHistory(versionHistoryRequestSchema.parse({ projectId }));

          return {
            ok: true,
            data: versionHistoryResponseSchema.parse(response)
          };
        },
        async readVersionSnapshot(filePath: string): Promise<VersionSnapshotResult | UnsupportedResult | InvalidProjectResult> {
          if (!hasDesktopProjectRuntime()) {
            const contents = window.localStorage.getItem(filePath);

            if (!contents) {
              return {
                ok: false,
                error: {
                  code: "INVALID_PROJECT",
                  message: "This preview snapshot no longer exists."
                }
              };
            }

            try {
              return {
                ok: true,
                data: {
                  filePath,
                  project: parseProjectFile(contents)
                }
              };
            } catch {
              return {
                ok: false,
                error: {
                  code: "INVALID_PROJECT",
                  message: "This version snapshot could not be restored."
                }
              };
            }
          }

          const response = await projectBridge!.readVersionSnapshot(
            versionSnapshotRequestSchema.parse({ filePath })
          );

          const parsedResponse = versionSnapshotResponseSchema.parse(response);

          try {
            return {
              ok: true,
              data: {
                filePath: parsedResponse.filePath,
                project: parseProjectFile(parsedResponse.contents)
              }
            };
          } catch {
            return {
              ok: false,
              error: {
                code: "INVALID_PROJECT",
                message: "This version snapshot could not be restored."
              }
            };
          }
        },
        async exportProject(project: VividoProject): Promise<ExportProjectResult> {
          const fileName = `${project.name || "Untitled Project"}.vivido`;

          downloadTextFile(fileName, serializeProjectFile(project));

          return {
            ok: true,
            data: {
              fileName,
              boundToProjectPath: false
            }
          };
        }
      },
      system: {
        async openExternal() {
          return unsupported("External open hooks are not connected yet.");
        }
      }
    }),
    [isDesktopRuntime, projectBridge, runtimeLabel]
  );
}
