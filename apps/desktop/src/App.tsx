import { createBlankProject, type MediaAsset, type VividoProject } from "@vivido/project";
import { AIBadge, AITrustSettings, PanelHeader, Tabs } from "@vivido/ui";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { usePlatform } from "./platform/usePlatform";

const appTabs = [
  { id: "editor", label: "Editor" },
  { id: "transcript", label: "Transcript" },
  { id: "audio", label: "Audio Room" },
  { id: "publish", label: "Publish" }
] as const;

const mediaSidebarTabs = [
  { id: "media", label: "Media" },
  { id: "record", label: "Record" },
  { id: "brand", label: "Brand" }
] as const;

const mediaPreviewItems = [
  { name: "Launch_Take_01.mp4", duration: "01:42", tone: "thumb-gradient-1", icon: "▶" },
  { name: "Broll_City.mov", duration: "00:26", tone: "thumb-gradient-5", icon: "▣" },
  { name: "Host_Audio.wav", duration: "03:10", tone: "thumb-gradient-2", icon: "♪" },
  { name: "Intro_Title.png", duration: "Still", tone: "thumb-gradient-4", icon: "✦" }
] as const;

type AppTabId = (typeof appTabs)[number]["id"];
type PendingProjectAction = "new" | "open" | null;

function renderTabBlurb(tab: AppTabId) {
  switch (tab) {
    case "editor":
      return "Timeline shell and preview workspace will land here.";
    case "transcript":
      return "Transcript-first editing surface placeholder.";
    case "audio":
      return "Audio Room placeholder with studio-style layout to come.";
    case "publish":
      return "Publish Package workspace placeholder.";
  }
}

function formatFrameRate(frameRate: number | null) {
  if (frameRate == null || Number.isNaN(frameRate)) {
    return null;
  }

  return `${frameRate.toFixed(frameRate % 1 === 0 ? 0 : 2)} fps`;
}

function getAssetMetaChips(asset: MediaAsset) {
  const chips: string[] = [];
  const extension = asset.metadata.extension ? asset.metadata.extension.toUpperCase() : null;

  if (extension) {
    chips.push(extension);
  }

  if (asset.kind === "video") {
    if (asset.metadata.codecName) {
      chips.push(asset.metadata.codecName.toUpperCase());
    }

    if (asset.metadata.width && asset.metadata.height) {
      chips.push(`${asset.metadata.width}×${asset.metadata.height}`);
    }

    const frameRate = formatFrameRate(asset.metadata.frameRate);
    if (frameRate) {
      chips.push(frameRate);
    }

    if (asset.metadata.colorSpace) {
      chips.push(asset.metadata.colorSpace);
    }
  }

  if (asset.kind === "audio") {
    if (asset.metadata.sampleRate) {
      chips.push(`${Math.round(asset.metadata.sampleRate / 1000)} kHz`);
    }

    if (asset.metadata.channels) {
      chips.push(`${asset.metadata.channels} ch`);
    }
  }

  if (asset.kind === "image") {
    if (asset.metadata.width && asset.metadata.height) {
      chips.push(`${asset.metadata.width}×${asset.metadata.height}`);
    }

    chips.push("Still asset");
  }

  return chips;
}

function getPrimaryAssetStatus(asset: MediaAsset) {
  if (asset.kind === "audio") {
    return asset.usageStatus.toUpperCase();
  }

  return asset.durationLabel;
}

function getMonitorViewportMode(asset: MediaAsset) {
  const width = asset.metadata.width;
  const height = asset.metadata.height;

  if (!width || !height || width === height) {
    return "landscape";
  }

  return height > width ? "portrait" : "landscape";
}

function getMonitorViewportStyle(
  asset: MediaAsset,
  zoomMode: "fit" | "native",
  canvasSize: { width: number; height: number }
): CSSProperties | undefined {
  const width = asset.metadata.width;
  const height = asset.metadata.height;

  if (!width || !height || !canvasSize.width || !canvasSize.height) {
    return undefined;
  }

  const fitScale = Math.min(canvasSize.width / width, canvasSize.height / height);
  const nativeScale = Math.min(1, fitScale);
  const scale = zoomMode === "native" ? nativeScale : fitScale;

  return {
    width: `${Math.max(1, Math.floor(width * scale))}px`,
    height: `${Math.max(1, Math.floor(height * scale))}px`
  };
}

function teardownMediaElement(element: HTMLVideoElement | HTMLAudioElement) {
  try {
    element.pause();
  } catch {
    // ignore pause failures during element teardown
  }

  element.removeAttribute("src");
  element.load();
}

function filePathToRuntimeUrl(filePath: string) {
  if (filePath.startsWith("file://")) {
    return filePath;
  }

  const normalized = filePath.replace(/\\/g, "/");
  if (normalized.startsWith("/")) {
    return `file://${encodeURI(normalized)}`;
  }

  return "";
}

export function App() {
  const defaultRecoveryMessage =
    "No recovery draft detected yet. Recovery appears only after autosave runs and the app closes unexpectedly.";
  const [activeTab, setActiveTab] = useState<AppTabId>("editor");
  const [currentProject, setCurrentProject] = useState<VividoProject>(() => createBlankProject("Untitled Project"));
  const [projectPath, setProjectPath] = useState<string>("Not saved yet");
  const [projectMessage, setProjectMessage] = useState<string>("Create or open a .vivido project to begin.");
  const [isDirty, setIsDirty] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string>("Not saved yet");
  const [recoveryMessage, setRecoveryMessage] = useState<string>(defaultRecoveryMessage);
  const [versionHistory, setVersionHistory] = useState<Array<{ filePath: string; savedAt: string; fileName: string }>>([]);
  const [pendingProjectAction, setPendingProjectAction] = useState<PendingProjectAction>(null);
  const [mediaSearch, setMediaSearch] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [assetPreviewSources, setAssetPreviewSources] = useState<Record<string, string>>({});
  const [previewDuration, setPreviewDuration] = useState(0);
  const [previewCurrentTime, setPreviewCurrentTime] = useState(0);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [previewZoomMode, setPreviewZoomMode] = useState<"fit" | "native">("fit");
  const [imageMonitorError, setImageMonitorError] = useState(false);
  const platform = usePlatform();
  const navigatorPlatform =
    typeof navigator !== "undefined"
      ? navigator.platform || navigator.userAgent || ""
      : "";
  const isApplePlatform =
    /Mac|iPhone|iPad/.test(navigatorPlatform);
  const showCustomTrafficLights = !isApplePlatform;
  const projectSummary = `${currentProject.mediaAssets.length} assets · ${currentProject.timeline.tracks.length} tracks`;
  const activeTabLabel = appTabs.find((tab) => tab.id === activeTab)?.label ?? "Editor";
  const visibleMediaAssets = currentProject.mediaAssets.filter((asset) => {
    if (!mediaSearch.trim()) {
      return true;
    }

    const query = mediaSearch.trim().toLowerCase();
    return (
      asset.label.toLowerCase().includes(query) ||
      asset.sourceName.toLowerCase().includes(query) ||
      asset.technicalSummary.toLowerCase().includes(query)
    );
  });
  const visibleVideoAssets = visibleMediaAssets.filter((asset) => asset.kind !== "audio");
  const visibleAudioAssets = visibleMediaAssets.filter((asset) => asset.kind === "audio");
  const selectedAsset =
    visibleMediaAssets.find((asset) => asset.id === selectedAssetId) ??
    visibleMediaAssets[0] ??
    null;
  const currentProjectRef = useRef(currentProject);
  const projectPathRef = useRef(projectPath);
  const previewMediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
  const monitorCanvasRef = useRef<HTMLDivElement | null>(null);
  const [monitorCanvasSize, setMonitorCanvasSize] = useState({ width: 0, height: 0 });
  // Ref so the unmount-only cleanup always sees the latest blob URLs without
  // needing [assetPreviewSources] as an effect dep (which would revoke blobs on every import batch).
  const assetPreviewSourcesRef = useRef(assetPreviewSources);
  assetPreviewSourcesRef.current = assetPreviewSources;

  useEffect(() => {
    currentProjectRef.current = currentProject;
  }, [currentProject]);

  useEffect(() => {
    projectPathRef.current = projectPath;
  }, [projectPath]);

  useEffect(() => {
    setPreviewDuration(0);
    setPreviewCurrentTime(0);
    setIsPreviewPlaying(false);
    setPreviewZoomMode("fit");
    setImageMonitorError(false);
  }, [selectedAssetId]);

  useEffect(() => {
    const canvas = monitorCanvasRef.current;
    if (!canvas || typeof ResizeObserver === "undefined") {
      return;
    }

    const updateSize = () => {
      setMonitorCanvasSize({
        width: canvas.clientWidth,
        height: canvas.clientHeight
      });
    };

    updateSize();

    const observer = new ResizeObserver(() => {
      updateSize();
    });

    observer.observe(canvas);
    return () => observer.disconnect();
  }, [selectedAssetId, activeTab]);

  // Revoke blob URLs on component unmount only, NOT on every import batch.
  // Using assetPreviewSourcesRef (updated synchronously above) means the cleanup
  // always sees the latest blob map without triggering on every setAssetPreviewSources call.
  useEffect(() => {
    return () => {
      Object.values(assetPreviewSourcesRef.current).forEach((sourceUrl) => {
        if (sourceUrl.startsWith("blob:")) {
          URL.revokeObjectURL(sourceUrl);
        }
      });
    };
  }, []); // empty deps = unmount only

  useEffect(() => {
    if (visibleMediaAssets.length === 0) {
      if (selectedAssetId !== null) {
        setSelectedAssetId(null);
      }
      return;
    }

    const selectionStillVisible = visibleMediaAssets.some((asset) => asset.id === selectedAssetId);
    if (!selectionStillVisible) {
      setSelectedAssetId(visibleMediaAssets[0]?.id ?? null);
    }
  }, [selectedAssetId, visibleMediaAssets]);

  useEffect(() => {
    let cancelled = false;

    async function loadRecovery() {
      const result = await platform.project.getRecoverySnapshot();

      if (cancelled || !result.ok || !result.data) {
        return;
      }

      setCurrentProject(result.data.project);
      setProjectPath(result.data.originalFilePath);
      setRecoveryMessage("Recovery draft restored from the previous unclean session.");
      setProjectMessage("Recovered your last autosaved project draft.");
      setIsDirty(false);
      setLastSavedAt("Recovered draft");
      await platform.project.markRecoveryHandled(result.data.project.projectId);
    }

    void loadRecovery();

    return () => {
      cancelled = true;
    };
  }, [platform.project]);

  async function refreshVersionHistory(projectId: string) {
    const result = await platform.project.getVersionHistory(projectId);

    if (!result.ok) {
      setProjectMessage(result.error.message);
      return;
    }

    setVersionHistory(result.data.items);
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      const latestPath = projectPathRef.current;

      if (!isDirty || latestPath === "Not saved yet") {
        return;
      }

      void (async () => {
        const result = await platform.project.autosave(currentProjectRef.current, latestPath);

        if (!result.ok) {
          setProjectMessage(result.error.message);
          return;
        }

        setIsDirty(false);
        setLastSavedAt(new Date(result.data.savedAt).toLocaleTimeString());
        setProjectMessage("Autosaved project successfully.");
        void refreshVersionHistory(currentProjectRef.current.projectId);
      })();
    }, 30000);

    return () => {
      window.clearInterval(interval);
    };
  }, [isDirty, platform.project]);

  function applyProjectChange(mutator: (project: VividoProject) => VividoProject) {
    setCurrentProject((previous) => {
      const next = mutator(previous);
      const updated = {
        ...next,
        updatedAt: new Date().toISOString()
      };
      currentProjectRef.current = updated;
      return updated;
    });
    setIsDirty(true);
  }

  function handleTextFieldKeyDown(event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "a") {
      event.preventDefault();
      event.currentTarget.select();
    }
  }

  function currentProjectHasMeaningfulState() {
    return (
      isDirty ||
      projectPath !== "Not saved yet" ||
      currentProject.name !== "Untitled Project" ||
      currentProject.editorNotes.trim().length > 0 ||
      currentProject.mediaAssets.length > 0 ||
      currentProject.timeline.tracks.length > 0
    );
  }

  function mergeImportedAssets(existingAssets: MediaAsset[], importedAssets: MediaAsset[]) {
    const existingPaths = new Set(existingAssets.map((asset) => asset.path));
    const dedupedImports = importedAssets.filter((asset) => !existingPaths.has(asset.path));
    return {
      assets: [...existingAssets, ...dedupedImports],
      duplicateCount: importedAssets.length - dedupedImports.length
    };
  }

  function applyImportedAssets(
    importedAssets: MediaAsset[],
    duplicateCount: number,
    sourceLabel: string,
    previewSources: Record<string, string>
  ) {
    let importedCount = 0;
    let firstImportedAssetId: string | null = importedAssets[0]?.id ?? null;

    setCurrentProject((previous) => {
      const merged = mergeImportedAssets(previous.mediaAssets, importedAssets);
      importedCount = merged.assets.length - previous.mediaAssets.length;

      const updated = {
        ...previous,
        mediaAssets: merged.assets,
        updatedAt: new Date().toISOString()
      };
      currentProjectRef.current = updated;
      return updated;
    });

    setIsDirty(true);
    setAssetPreviewSources((previous) => ({
      ...previous,
      ...previewSources
    }));
    if (firstImportedAssetId) {
      setSelectedAssetId(firstImportedAssetId);
    }
    setProjectMessage(
      duplicateCount > 0
        ? `${sourceLabel}: imported ${importedCount} media file${importedCount === 1 ? "" : "s"} and skipped ${duplicateCount} duplicate${duplicateCount === 1 ? "" : "s"}.`
        : `${sourceLabel}: imported ${importedAssets.length} media file${importedAssets.length === 1 ? "" : "s"} into the asset library.`
    );
  }

  async function createNewProject() {
    const result = await platform.project.createBlank("Untitled Project");

    if (!result.ok) {
      setProjectMessage(result.error.message);
      return;
    }

    setCurrentProject(result.data.project);
    setProjectPath(result.data.filePath);
    setProjectMessage("Blank project created successfully.");
    setRecoveryMessage(defaultRecoveryMessage);
    setIsDirty(false);
    setLastSavedAt("Saved just now");
    void refreshVersionHistory(result.data.project.projectId);
  }

  async function openProject() {
    const result = await platform.project.openExisting();

    if (!result.ok) {
      setProjectMessage(result.error.message);
      return;
    }

    setCurrentProject(result.data.project);
    setProjectPath(result.data.filePath);
    setProjectMessage(`Loaded ${result.data.project.name}.`);
    setRecoveryMessage(defaultRecoveryMessage);
    setIsDirty(false);
    setLastSavedAt("Loaded from disk");
    void refreshVersionHistory(result.data.project.projectId);
  }

  function handleNewProject() {
    if (currentProjectHasMeaningfulState()) {
      setPendingProjectAction("new");
      return;
    }

    void createNewProject();
  }

  function handleOpenProject() {
    if (currentProjectHasMeaningfulState()) {
      setPendingProjectAction("open");
      return;
    }

    void openProject();
  }

  function dismissProjectActionDialog() {
    setPendingProjectAction(null);
  }

  function confirmProjectAction() {
    const action = pendingProjectAction;
    setPendingProjectAction(null);

    if (action === "new") {
      void createNewProject();
      return;
    }

    if (action === "open") {
      void openProject();
    }
  }

  async function handleSaveNow() {
    if (projectPath === "Not saved yet") {
      setProjectMessage("Use Save As first so Vivido knows where to save this project.");
      return;
    }

    const result = await platform.project.saveNow(currentProject, projectPath);

    if (!result.ok) {
      setProjectMessage(result.error.message);
      return;
    }

    setIsDirty(false);
    setLastSavedAt(new Date(result.data.savedAt).toLocaleTimeString());
    setProjectMessage("Project saved successfully.");
    void refreshVersionHistory(currentProject.projectId);
  }

  async function handleSaveAs() {
    const result = await platform.project.saveAs(currentProject);

    if (!result.ok) {
      setProjectMessage(result.error.message);
      return;
    }

    setProjectPath(result.data.filePath);
    setLastSavedAt(new Date(result.data.savedAt).toLocaleTimeString());
    setProjectMessage(
      platform.isDesktopRuntime
        ? `Saved project as ${result.data.filePath}.`
        : "Saved project to preview local storage."
    );
    setRecoveryMessage(defaultRecoveryMessage);
    setIsDirty(false);
    void refreshVersionHistory(currentProject.projectId);
  }

  async function handleExportProject() {
    const result = await platform.project.exportProject(currentProject);
    setProjectMessage(`Exported ${result.data.fileName}. This did not change the active save location.`);
  }

  async function handleImportMedia() {
    const result = await platform.media.importFiles();

    if (!result.ok) {
      setProjectMessage(result.error.message);
      return;
    }

    applyImportedAssets(result.data.assets, result.data.duplicateCount, "File picker", result.data.previewSources);
  }

  async function handleMediaDrop(files: File[]) {
    const result = await platform.media.importDroppedFiles(files);
    setIsDragActive(false);

    if (!result.ok) {
      setProjectMessage(result.error.message);
      return;
    }

    applyImportedAssets(result.data.assets, result.data.duplicateCount, "Drag and drop", result.data.previewSources);
  }

  function handleRemoveMedia(assetId: string) {
    let removedAssetName = "";

    setCurrentProject((previous) => {
      const assetToRemove = previous.mediaAssets.find((asset) => asset.id === assetId);
      removedAssetName = assetToRemove?.sourceName ?? "media item";

      const updated = {
        ...previous,
        mediaAssets: previous.mediaAssets.filter((asset) => asset.id !== assetId),
        updatedAt: new Date().toISOString()
      };
      currentProjectRef.current = updated;
      return updated;
    });

    setIsDirty(true);
    if (selectedAssetId === assetId) {
      setSelectedAssetId(null);
    }
    setAssetPreviewSources((previous) => {
      const sourceUrl = previous[assetId];
      if (sourceUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(sourceUrl);
      }

      const next = { ...previous };
      delete next[assetId];
      return next;
    });
    setProjectMessage(`Removed ${removedAssetName} from the asset library.`);
  }

  function getAssetTone(asset: MediaAsset) {
    switch (asset.kind) {
      case "video":
        return "thumb-gradient-1";
      case "audio":
        return "thumb-gradient-2";
      case "image":
        return "thumb-gradient-4";
    }
  }

  function getAssetIcon(asset: MediaAsset) {
    switch (asset.kind) {
      case "video":
        return "▶";
      case "audio":
        return "♪";
      case "image":
        return "✦";
    }
  }

  function getAssetThumbnailStyle(asset: MediaAsset) {
    if (!asset.metadata.thumbnailDataUrl) {
      return undefined;
    }

    return {
      backgroundImage: `linear-gradient(rgba(10, 10, 14, 0.08), rgba(10, 10, 14, 0.38)), url("${asset.metadata.thumbnailDataUrl}")`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    };
  }

  function handleSelectAsset(assetId: string) {
    setSelectedAssetId(assetId);
  }

  function handleSelectableKeyDown(event: React.KeyboardEvent<HTMLElement>, assetId: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelectAsset(assetId);
    }
  }

  function getProbeSourceLabel(asset: MediaAsset) {
    switch (asset.metadata.probeSource) {
      case "ffprobe":
        return "Deep scan";
      case "browser":
        return "Preview scan";
      case "fallback":
        return "Basic scan";
    }
  }

  function getScanStatusCopy(asset: MediaAsset) {
    const probeLabel = getProbeSourceLabel(asset);

    if (asset.kind === "video") {
      const missingFrameRate = asset.metadata.frameRate == null;
      const missingColor = !asset.metadata.colorSpace;

      if (!missingFrameRate && !missingColor) {
        return `${probeLabel} complete`;
      }

      if (asset.metadata.probeSource === "browser") {
        return `${probeLabel} · deeper video details still pending`;
      }

      if (asset.metadata.probeSource === "fallback") {
        return `${probeLabel} · limited video metadata available`;
      }

      return `${probeLabel} · some technical metadata still pending`;
    }

    if (asset.kind === "audio") {
      if (asset.metadata.sampleRate && asset.metadata.channels) {
        return `${probeLabel} complete`;
      }

      return `${probeLabel} · some audio metadata still pending`;
    }

    if (asset.kind === "image") {
      if (asset.metadata.width && asset.metadata.height) {
        return `${probeLabel} complete`;
      }

      return `${probeLabel} · image dimensions still pending`;
    }

    return probeLabel;
  }

  async function handleRestoreVersion(filePath: string) {
    const result = await platform.project.readVersionSnapshot(filePath);

    if (!result.ok) {
      setProjectMessage(result.error.message);
      return;
    }

    setCurrentProject(result.data.project);
    currentProjectRef.current = result.data.project;
    setRecoveryMessage("A saved version snapshot was restored into the editor.");
    setProjectMessage(`Restored version from ${result.data.filePath}.`);
    setIsDirty(true);
  }

  const selectedAssetPreviewSource = selectedAsset ? assetPreviewSources[selectedAsset.id] : undefined;
  const selectedAssetRuntimeSource =
    selectedAssetPreviewSource ||
    (selectedAsset && platform.isDesktopRuntime ? filePathToRuntimeUrl(selectedAsset.path) : "");
  const selectedAssetHasSessionPlaybackSource = Boolean(selectedAssetRuntimeSource);
  const canPreviewPlayback =
    Boolean(selectedAssetRuntimeSource) &&
    (selectedAsset?.kind === "video" || selectedAsset?.kind === "audio");

  function formatPreviewTime(seconds: number) {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return "0:00";
    }

    const totalSeconds = Math.floor(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    }

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  function syncPreviewState() {
    const media = previewMediaRef.current;
    if (!media) {
      return;
    }

    setPreviewDuration(Number.isFinite(media.duration) ? media.duration : 0);
    setPreviewCurrentTime(Number.isFinite(media.currentTime) ? media.currentTime : 0);
    setIsPreviewPlaying(!media.paused);
  }

  async function handleTogglePreviewPlayback() {
    const media = previewMediaRef.current;
    if (!media) {
      return;
    }

    if (media.paused) {
      try {
        await media.play();
      } catch {
        return;
      }
    } else {
      media.pause();
    }

    syncPreviewState();
  }

  function handleResetPreviewPlayback() {
    const media = previewMediaRef.current;
    if (!media) {
      return;
    }

    media.pause();
    media.currentTime = 0;
    syncPreviewState();
  }

  function handlePreviewScrub(event: React.ChangeEvent<HTMLInputElement>) {
    const media = previewMediaRef.current;
    if (!media) {
      return;
    }

    const nextTime = Number(event.target.value);
    media.currentTime = nextTime;
    setPreviewCurrentTime(nextTime);
  }

  function getPreviewAvailabilityMessage() {
    if (!selectedAsset || selectedAsset.kind === "image") {
      return getScanStatusCopy(selectedAsset as MediaAsset);
    }

    if (selectedAssetHasSessionPlaybackSource) {
      return getScanStatusCopy(selectedAsset);
    }

    if (!platform.isDesktopRuntime) {
      return "Preview session source is unavailable after reload. Re-import this file in preview mode to restore playback.";
    }

    return "Playback source is unavailable for this file right now.";
  }

  // useCallback with [] deps so React sees the same function reference on every render.
  // Without this, React calls cleanup(null) → teardown → then remount on EVERY state update
  // (e.g. timeupdate, loadedmetadata) because inline functions are new references each render.
  const assignPreviewMediaRef = useCallback((element: HTMLVideoElement | HTMLAudioElement | null) => {
    const prev = previewMediaRef.current;

    if (prev && prev !== element) {
      teardownMediaElement(prev);
    }

    previewMediaRef.current = element;

    if (element) {
      element.load();
    }
  }, []); // safe: only closes over previewMediaRef (a stable ref object)

  return (
    <div className="app-shell">
      {pendingProjectAction ? (
        <div className="modal-backdrop" role="presentation">
          <div className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="project-action-title">
            <h2 id="project-action-title">
              {pendingProjectAction === "new" ? "Create a new project?" : "Open another project?"}
            </h2>
            <p>
              {pendingProjectAction === "new"
                ? "This will replace the current project in the editor. Your current work should be saved first."
                : "This will replace the current project currently loaded in the editor. Save first if you want to keep your current state."}
            </p>
            <div className="dialog-actions">
              <button className="action-button" type="button" onClick={dismissProjectActionDialog}>
                Cancel
              </button>
              <button className="action-button primary" type="button" onClick={confirmProjectAction}>
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <header className={`titlebar${showCustomTrafficLights ? "" : " native-traffic-lights"}`}>
        <div className="titlebar-left">
          {showCustomTrafficLights ? (
            <div className="traffic-lights" aria-hidden="true">
              <span className="traffic-light tl-red" />
              <span className="traffic-light tl-yellow" />
              <span className="traffic-light tl-green" />
            </div>
          ) : null}
          <div className="brand-mark" />
          <span className="app-name">Vivido</span>
          <nav className="menu-hint">
            <span>File</span>
            <span>Edit</span>
            <span>Clip</span>
            <span>Mark</span>
            <span>View</span>
            <span>AI</span>
            <span>Window</span>
          </nav>
        </div>

        <div className="titlebar-center">
          <div className="transport-cluster">
            <button className="transport-button" type="button" aria-label="Jump to start">
              ↺
            </button>
            <button className="transport-button primary" type="button" aria-label="Play">
              ▶
            </button>
            <button className="transport-button" type="button" aria-label="Step forward">
              ↻
            </button>
          </div>
          <div className="timecode">00:00:00:00</div>
        </div>

        <div className="titlebar-right">
          <Tabs tabs={appTabs} activeTab={activeTab} onChange={(tabId) => setActiveTab(tabId as AppTabId)} />
        </div>
      </header>

      <main className="workspace">
        <aside
          className={`sidebar panel${isDragActive ? " drag-active" : ""}`}
          onDragEnter={(event) => {
            event.preventDefault();
            setIsDragActive(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragActive(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            const nextTarget = event.relatedTarget as Node | null;
            if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
              setIsDragActive(false);
            }
          }}
          onDrop={(event) => {
            event.preventDefault();
            const files = Array.from(event.dataTransfer.files ?? []);
            void handleMediaDrop(files);
          }}
        >
          {isDragActive ? (
            <div className="drag-overlay" role="presentation">
              <div className="drag-overlay-card">
                <span className="section-label">Drop Media To Import</span>
                <p>Video, audio, and image files will be added to the asset library.</p>
              </div>
            </div>
          ) : null}
          <div className="sidebar-tabs">
            {mediaSidebarTabs.map((tab, index) => (
              <button key={tab.id} className={`sidebar-tab${index === 0 ? " active" : ""}`} type="button">
                {tab.label}
              </button>
            ))}
          </div>
          <div className="sidebar-search">
            <span className="sidebar-search-icon">⌕</span>
            <input
              className="sidebar-search-input"
              placeholder="Search media"
              value={mediaSearch}
              onChange={(event) => setMediaSearch(event.target.value)}
            />
          </div>
          <div className="panel-body">
            <div className="media-library-header">
              <div className="media-library-heading">
                <span className="section-label">Asset Library</span>
                <span className="media-library-hint">Import Media or drop files here</span>
              </div>
              <button className="action-button" type="button" onClick={handleImportMedia}>
                Import Media
              </button>
            </div>

            {visibleVideoAssets.length > 0 ? (
              <>
                <div className="media-grid">
                  {visibleVideoAssets.map((asset) => (
                      <div
                        className={`media-thumb${selectedAsset?.id === asset.id ? " selected" : ""}`}
                        key={asset.id}
                        role="button"
                        tabIndex={0}
                        title={`${asset.sourceName} · ${asset.technicalSummary}`}
                        onClick={() => handleSelectAsset(asset.id)}
                        onKeyDown={(event) => handleSelectableKeyDown(event, asset.id)}
                      >
                        <div
                          className={`media-thumb-bg ${asset.metadata.thumbnailDataUrl ? "media-thumb-has-image" : getAssetTone(asset)}`}
                          style={getAssetThumbnailStyle(asset)}
                        >
                          <span className="media-thumb-icon">{getAssetIcon(asset)}</span>
                        </div>
                        <button
                          className="media-thumb-remove"
                          type="button"
                          aria-label={`Remove ${asset.sourceName}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleRemoveMedia(asset.id);
                          }}
                        >
                          ×
                        </button>
                        <span className="media-thumb-duration">{asset.durationLabel}</span>
                        <span className="media-thumb-name">{asset.sourceName}</span>
                      </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="media-grid">
                {mediaPreviewItems.map((item) => (
                  <div className="media-thumb media-thumb-preview" key={item.name}>
                    <div className={`media-thumb-bg ${item.tone}`}>
                      <span className="media-thumb-icon">{item.icon}</span>
                    </div>
                    <span className="media-thumb-duration">{item.duration}</span>
                    <span className="media-thumb-name">{item.name}</span>
                  </div>
                ))}
              </div>
            )}

            {visibleAudioAssets.length > 0 ? (
              <div className="media-list-section">
                <span className="section-label">Audio Assets</span>
                <div className="media-list">
                  {visibleAudioAssets.map((asset) => (
                    <div
                      className={`media-browser-row${selectedAsset?.id === asset.id ? " selected" : ""}`}
                      key={asset.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleSelectAsset(asset.id)}
                      onKeyDown={(event) => handleSelectableKeyDown(event, asset.id)}
                    >
                      <span className="media-list-item-icon">{getAssetIcon(asset)}</span>
                      <div className="media-browser-row-copy">
                        <strong>{asset.sourceName}</strong>
                        <div className="media-browser-row-meta">
                          {getAssetMetaChips(asset).slice(0, 3).map((chip) => (
                            <span className="media-meta-chip" key={`${asset.id}-audio-row-${chip}`}>
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="media-usage-pill">{asset.usageStatus}</span>
                      <button
                        className="media-remove-button"
                        type="button"
                        aria-label={`Remove ${asset.sourceName}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleRemoveMedia(asset.id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {selectedAsset ? (
              <div className="media-list-section">
                <span className="section-label">Selected Asset</span>
                <div className="media-list-item selected-asset-card">
                  <span className="media-list-item-icon">{getAssetIcon(selectedAsset)}</span>
                  <div className="media-list-item-copy">
                    <strong>{selectedAsset.sourceName}</strong>
                  </div>
                  <span className="media-usage-pill">
                    {selectedAsset.kind === "audio" ? selectedAsset.usageStatus : selectedAsset.durationLabel}
                  </span>
                  <div className="media-list-item-meta">
                    {getAssetMetaChips(selectedAsset).map((chip) => (
                      <span className="media-meta-chip" key={`${selectedAsset.id}-selected-${chip}`}>
                        {chip}
                      </span>
                    ))}
                  </div>
                  <p className="media-scan-status">{getScanStatusCopy(selectedAsset)}</p>
                  <button
                    className="media-remove-button"
                    type="button"
                    aria-label={`Remove ${selectedAsset.sourceName}`}
                    onClick={() => handleRemoveMedia(selectedAsset.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : null}

            <div className="media-list-section compact-shortcuts">
              <span className="section-label">Workspace Shortcuts</span>
              <div className="compact-shortcuts-card">
                <div className="compact-shortcut-row">
                  <span className="media-list-item-icon">◫</span>
                  <div className="compact-shortcut-copy">
                    <span className="compact-shortcut-label">Current Project</span>
                    <span className="compact-shortcut-value">{currentProject.name}</span>
                  </div>
                </div>
                <div className="compact-shortcut-row">
                  <span className="media-list-item-icon">⌁</span>
                  <div className="compact-shortcut-copy">
                    <span className="compact-shortcut-label">Runtime</span>
                    <span className="compact-shortcut-value">{platform.runtimeMode}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="placeholder-card compact project-summary-card">
              <span className="section-label">Project Actions</span>
              <div className="project-summary-header">
                <span className="project-summary-name">{currentProject.name}</span>
                <span className={`project-summary-state${isDirty ? " dirty" : ""}`}>
                  {isDirty ? "Unsaved" : "Synced"}
                </span>
              </div>
              <p>{projectSummary}</p>
            </div>

            <div className="action-stack">
              <button className="action-button primary action-button-wide" type="button" onClick={handleNewProject}>
                New Project
              </button>
              <div className="action-row split-actions">
                <button className="action-button action-button-wide" type="button" onClick={handleOpenProject}>
                  Open Project
                </button>
                <button className="action-button action-button-wide" type="button" onClick={handleSaveAs}>
                  Save As
                </button>
              </div>
              <div className="action-row split-actions">
                <button className="action-button action-button-wide" type="button" onClick={handleSaveNow}>
                  Save
                </button>
                <button className="action-button action-button-wide subtle" type="button" onClick={handleExportProject}>
                  Export
                </button>
              </div>
            </div>

            <div className="placeholder-card compact">
              <span className="section-label">Project Path</span>
              <p>{projectPath}</p>
              <p>Runtime: {platform.runtimeMode}</p>
            </div>

            <div className="placeholder-card compact">
              <span className="section-label">Project Name</span>
              <input
                className="editor-input"
                value={currentProject.name}
                onKeyDown={handleTextFieldKeyDown}
                onChange={(event) =>
                  applyProjectChange((project) => ({
                    ...project,
                    name: event.target.value || "Untitled Project"
                  }))
                }
              />
            </div>

            <div className="placeholder-card compact project-status-card">
              <span className="section-label">Project Status</span>
              <div className="status-pill-row">
                <span className={`status-pill${isDirty ? " warning" : " success"}`}>
                  {isDirty ? "Pending changes" : "Project stable"}
                </span>
                <span className="status-pill neutral">{platform.isDesktopRuntime ? "Desktop mode" : "Preview mode"}</span>
              </div>
              <p className="status-primary-copy">{projectMessage}</p>
              <div className="status-meta-list">
                <div className="status-meta-row">
                  <span>Autosave</span>
                  <span>Runs 30 seconds after your last edit so Vivido does not write on every keystroke.</span>
                </div>
                <div className="status-meta-row">
                  <span>Recovery</span>
                  <span>{recoveryMessage}</span>
                </div>
                <div className="status-meta-row">
                  <span>Last saved</span>
                  <span>{lastSavedAt}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="main-panel panel">
          <PanelHeader
            title={activeTab === "editor" ? "Preview" : activeTabLabel}
            rightContent={<AIBadge label="AI ready" />}
          />
          <div className="panel-body main-stage">
            <div className="preview-surface">
              <div className="preview-toolbar">
                <span className="preview-toolbar-label">Program Monitor</span>
                <div className="preview-toolbar-actions">
                  <button
                    className={`mini-tool-button${previewZoomMode === "fit" ? " primary" : ""}`}
                    type="button"
                    onClick={() => setPreviewZoomMode("fit")}
                  >
                    Fit
                  </button>
                  <button
                    className={`mini-tool-button${previewZoomMode === "native" ? " primary" : ""}`}
                    type="button"
                    onClick={() => setPreviewZoomMode("native")}
                  >
                    100%
                  </button>
                </div>
              </div>
              <div className="preview-center">
                <div className={`preview-frame${activeTab === "editor" && selectedAsset ? " has-selected-asset" : ""}`}>
                  <div className="preview-scene" aria-hidden="true" />
                  <div className="safe-area-frame" aria-hidden="true" />
                  {activeTab === "editor" && selectedAsset ? (
                    <div className="monitor-player">
                      <div
                        className={`monitor-player-canvas${selectedAsset.kind === "audio" ? " audio" : ""}`}
                        ref={monitorCanvasRef}
                      >
                        {selectedAsset.kind === "audio" ? (
                          <div className="audio-preview-state">
                            {selectedAssetRuntimeSource ? (
                              <audio
                                className="selected-audio-player"
                                preload="metadata"
                                ref={assignPreviewMediaRef}
                                src={selectedAssetRuntimeSource}
                                onLoadedMetadata={syncPreviewState}
                                onTimeUpdate={syncPreviewState}
                                onPlay={syncPreviewState}
                                onPause={syncPreviewState}
                                onEnded={syncPreviewState}
                              />
                            ) : (
                              <span className="audio-preview-icon">♪</span>
                            )}
                            <strong>{selectedAsset.sourceName}</strong>
                            <p>
                              {selectedAssetRuntimeSource
                                ? "Audio preview is available in-session. Waveform preview comes next."
                                : "Audio source is unavailable in this recovered preview session. Re-import to restore playback."}
                            </p>
                          </div>
                        ) : selectedAsset.kind === "video" && selectedAssetRuntimeSource ? (
                          <div
                            className={`monitor-player-viewport ${getMonitorViewportMode(selectedAsset)}${previewZoomMode === "native" ? " native" : ""}`}
                            style={getMonitorViewportStyle(selectedAsset, previewZoomMode, monitorCanvasSize)}
                          >
                            <video
                              key={`${selectedAsset.id}-${selectedAssetRuntimeSource}`}
                              className="monitor-player-media"
                              preload="metadata"
                              ref={assignPreviewMediaRef}
                              src={selectedAssetRuntimeSource}
                              playsInline
                              onLoadedMetadata={syncPreviewState}
                              onTimeUpdate={syncPreviewState}
                              onPlay={syncPreviewState}
                              onPause={syncPreviewState}
                              onEnded={syncPreviewState}
                            />
                          </div>
                        ) : selectedAsset.kind === "image" && (selectedAssetRuntimeSource || selectedAsset.metadata.thumbnailDataUrl) ? (
                          <div
                            className={`monitor-player-viewport ${getMonitorViewportMode(selectedAsset)}${previewZoomMode === "native" ? " native" : ""}`}
                            style={getMonitorViewportStyle(selectedAsset, previewZoomMode, monitorCanvasSize)}
                          >
                            <img
                              key={`${selectedAsset.id}-${imageMonitorError ? "thumb" : "src"}`}
                              className="monitor-player-media"
                              alt={selectedAsset.sourceName}
                              src={
                                imageMonitorError && selectedAsset.metadata.thumbnailDataUrl
                                  ? selectedAsset.metadata.thumbnailDataUrl
                                  : (selectedAssetRuntimeSource || selectedAsset.metadata.thumbnailDataUrl || "")
                              }
                              onError={() => {
                                if (!imageMonitorError && selectedAsset.metadata.thumbnailDataUrl) {
                                  setImageMonitorError(true);
                                }
                              }}
                            />
                          </div>
                        ) : selectedAsset.metadata.thumbnailDataUrl ? (
                          <div
                            className={`monitor-player-viewport ${getMonitorViewportMode(selectedAsset)}${previewZoomMode === "native" ? " native" : ""}`}
                            style={getMonitorViewportStyle(selectedAsset, previewZoomMode, monitorCanvasSize)}
                          >
                            <img
                              key={`${selectedAsset.id}-${selectedAsset.metadata.thumbnailDataUrl}`}
                              className="monitor-player-media"
                              alt={selectedAsset.sourceName}
                              src={selectedAsset.metadata.thumbnailDataUrl}
                            />
                          </div>
                        ) : (
                          <div className="monitor-player-fallback">
                            <span>{getAssetIcon(selectedAsset)}</span>
                            <p>Preview image still loading.</p>
                          </div>
                        )}
                      </div>
                      <div className="monitor-player-footer">
                        <span className="preview-kicker">Selected Asset</span>
                        <div className="monitor-player-header">
                          <strong>{selectedAsset.sourceName}</strong>
                          <span className="monitor-player-duration">{getPrimaryAssetStatus(selectedAsset)}</span>
                        </div>
                        {(selectedAsset.kind === "video" || selectedAsset.kind === "audio") ? (
                          <div className={`monitor-player-transport${canPreviewPlayback ? "" : " disabled"}`}>
                            <div className="monitor-player-buttons">
                              <button className="mini-tool-button" type="button" onClick={handleResetPreviewPlayback} disabled={!canPreviewPlayback}>
                                ↺
                              </button>
                              <button
                                className="mini-tool-button primary"
                                type="button"
                                onClick={handleTogglePreviewPlayback}
                                disabled={!canPreviewPlayback}
                                aria-label={isPreviewPlaying ? "Pause preview" : "Play preview"}
                              >
                                {isPreviewPlaying ? "❚❚" : "▶"}
                              </button>
                            </div>
                            <span className="monitor-player-time">{formatPreviewTime(previewCurrentTime)}</span>
                            <input
                              className="monitor-player-scrub"
                              type="range"
                              min={0}
                              max={previewDuration || 0}
                              step={0.01}
                              value={Math.min(previewCurrentTime, previewDuration || 0)}
                              onChange={handlePreviewScrub}
                              disabled={!canPreviewPlayback}
                            />
                            <span className="monitor-player-time">{formatPreviewTime(previewDuration)}</span>
                          </div>
                        ) : null}
                        <div className="monitor-player-chips">
                          {getAssetMetaChips(selectedAsset).map((chip) => (
                            <span className="media-meta-chip" key={`preview-${selectedAsset.id}-${chip}`}>
                              {chip}
                            </span>
                          ))}
                        </div>
                        <p className="monitor-player-status">{getPreviewAvailabilityMessage()}</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="preview-kicker">{activeTab.toUpperCase()}</span>
                      <h1>{activeTabLabel}</h1>
                      <p>{renderTabBlurb(activeTab)}</p>
                      <textarea
                        className="editor-notes"
                        placeholder="Shell notes for this project. Autosave will persist these notes into the .vivido file."
                        value={currentProject.editorNotes}
                        onKeyDown={handleTextFieldKeyDown}
                        onChange={(event) =>
                          applyProjectChange((project) => ({
                            ...project,
                            editorNotes: event.target.value
                          }))
                        }
                      />
                      <div className="preview-project-meta">
                        <span>{currentProject.name}</span>
                        <span>{projectSummary}</span>
                        <span>{isDirty ? "Unsaved changes" : "All changes saved"}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="preview-meta">
                <span className="scope-chip">
                  <span className="scope-dot green" />
                  Local-first shell
                </span>
                <span className="scope-chip">
                  <span className="scope-dot amber" />
                  {platform.runtimeLabel}
                </span>
                <span>E1 Foundation</span>
              </div>
            </div>
          </div>
        </section>

        <aside className="inspector panel">
          <PanelHeader title="Inspector" rightContent={<span className="inspector-chip">Editor State</span>} />
          <div className="panel-body">
            <div className="inspector-section">
              <div className="inspector-section-title">Runtime</div>
              <div className="placeholder-card compact">
                <span className="section-label">Execution</span>
                <p>{platform.description}</p>
                <p>{platform.runtimeMode}</p>
              </div>
            </div>
            <div className="inspector-section">
              <div className="inspector-section-title">Project Health</div>
              <div className="placeholder-card compact">
                <span className="section-label">Status</span>
                <p>{projectMessage}</p>
                <p>{recoveryMessage}</p>
                <p>{isDirty ? "Dirty editor state waiting for save." : "Editor state currently synced."}</p>
              </div>
            </div>
            <div className="inspector-section">
              <div className="inspector-section-title">Schema</div>
              <div className="placeholder-card compact">
                <span className="section-label">Project JSON</span>
                <p>Schema {currentProject.schemaVersion} · Autosave {currentProject.settings.autosaveEnabled ? "enabled" : "disabled"} · History {currentProject.settings.versionHistoryDays} days</p>
              </div>
            </div>
            <div className="inspector-section">
              <div className="inspector-section-title">Recovery</div>
              <div className="placeholder-card compact">
                <span className="section-label">Draft State</span>
                <p>{recoveryMessage}</p>
              </div>
            </div>
            <div className="inspector-section">
              <div className="inspector-section-title">AI Trust</div>
              <div className="placeholder-card compact">
                <span className="section-label">Compliance Scaffold</span>
                <AITrustSettings disclosureEnabled requireConfirmation />
              </div>
            </div>
            <div className="inspector-section">
              <div className="inspector-section-title">Version History</div>
              <div className="placeholder-card compact">
                <span className="section-label">Snapshots</span>
                {versionHistory.length === 0 ? (
                  <p>No autosave versions yet.</p>
                ) : (
                  <div className="version-history-list">
                    {versionHistory.map((item) => (
                      <div className="version-history-item" key={item.filePath}>
                        <span>{item.fileName}</span>
                        <span>{item.savedAt}</span>
                        <button className="inline-action-button" type="button" onClick={() => handleRestoreVersion(item.filePath)}>
                          Restore
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </main>

      <footer className="statusbar">
        <span>Guest Mode</span>
        <span>{isDirty ? "Changes pending autosave" : "Desktop shell scaffold"}</span>
        <span>Platform: {platform.runtimeLabel}</span>
        <span>{platform.runtimeMode}</span>
        <span>Auto-save: {lastSavedAt}</span>
      </footer>
    </div>
  );
}
