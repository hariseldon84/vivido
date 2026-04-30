import { createBlankProject, type MediaAsset, type VividoProject } from "@vivido/project";
import { AIBadge, AITrustSettings, PanelHeader, Tabs } from "@vivido/ui";
import { useEffect, useRef, useState } from "react";
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
  const platform = usePlatform();
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
  const currentProjectRef = useRef(currentProject);
  const projectPathRef = useRef(projectPath);

  useEffect(() => {
    currentProjectRef.current = currentProject;
  }, [currentProject]);

  useEffect(() => {
    projectPathRef.current = projectPath;
  }, [projectPath]);

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

  function applyImportedAssets(importedAssets: MediaAsset[], duplicateCount: number, sourceLabel: string) {
    let importedCount = 0;

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

    applyImportedAssets(result.data.assets, result.data.duplicateCount, "File picker");
  }

  async function handleMediaDrop(files: File[]) {
    const result = await platform.media.importDroppedFiles(files);
    setIsDragActive(false);

    if (!result.ok) {
      setProjectMessage(result.error.message);
      return;
    }

    applyImportedAssets(result.data.assets, result.data.duplicateCount, "Drag and drop");
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

      <header className="titlebar">
        <div className="titlebar-left">
          <div className="traffic-lights" aria-hidden="true">
            <span className="traffic-light tl-red" />
            <span className="traffic-light tl-yellow" />
            <span className="traffic-light tl-green" />
          </div>
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
                      <div className="media-thumb" key={asset.id} title={`${asset.sourceName} · ${asset.technicalSummary}`}>
                        <div className={`media-thumb-bg ${getAssetTone(asset)}`}>
                          <span className="media-thumb-icon">{getAssetIcon(asset)}</span>
                        </div>
                        <button
                          className="media-thumb-remove"
                          type="button"
                          aria-label={`Remove ${asset.sourceName}`}
                          onClick={() => handleRemoveMedia(asset.id)}
                        >
                          ×
                        </button>
                        <span className="media-thumb-duration">{asset.durationLabel}</span>
                        <span className="media-thumb-name">{asset.sourceName}</span>
                      </div>
                  ))}
                </div>

                <div className="media-list-section">
                  <span className="section-label">Clip Details</span>
                  <div className="media-list">
                    {visibleVideoAssets.map((asset) => (
                      <div className="media-list-item" key={`${asset.id}-details`}>
                        <span className="media-list-item-icon">{getAssetIcon(asset)}</span>
                        <div className="media-list-item-copy">
                          <strong>{asset.sourceName}</strong>
                          <p>{asset.technicalSummary}</p>
                        </div>
                        <button
                          className="media-remove-button"
                          type="button"
                          aria-label={`Remove ${asset.sourceName}`}
                          onClick={() => handleRemoveMedia(asset.id)}
                        >
                          Remove
                        </button>
                        <span className="media-usage-pill">{asset.durationLabel}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="media-grid">
                {mediaPreviewItems.map((item) => (
                  <div className="media-thumb" key={item.name}>
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
                    <div className="media-list-item" key={asset.id}>
                      <span className="media-list-item-icon">{getAssetIcon(asset)}</span>
                      <div className="media-list-item-copy">
                        <strong>{asset.sourceName}</strong>
                        <p>{asset.technicalSummary}</p>
                      </div>
                      <button
                        className="media-remove-button"
                        type="button"
                        aria-label={`Remove ${asset.sourceName}`}
                        onClick={() => handleRemoveMedia(asset.id)}
                      >
                        Remove
                      </button>
                      <span className="media-usage-pill">{asset.usageStatus}</span>
                    </div>
                  ))}
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
                  <button className="mini-tool-button" type="button">
                    Fit
                  </button>
                  <button className="mini-tool-button" type="button">
                    100%
                  </button>
                </div>
              </div>
              <div className="preview-center">
                <div className="preview-frame">
                  <div className="preview-scene" aria-hidden="true" />
                  <div className="safe-area-frame" aria-hidden="true" />
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
