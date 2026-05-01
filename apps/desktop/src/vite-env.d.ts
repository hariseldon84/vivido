/// <reference types="vite/client" />

import type { DesktopProjectBridge } from "@vivido/ipc";

declare global {
  interface Window {
    electronAPI?: {
      platform: "desktop";
      media: {
        openImportDialog(): Promise<{ filePaths: string[] } | null>;
        scanMetadata(filePath: string): Promise<{
          extension: string;
          durationSeconds: number | null;
          width: number | null;
          height: number | null;
          frameRate: number | null;
          colorSpace: string | null;
          codecName: string | null;
          sampleRate: number | null;
          channels: number | null;
          thumbnailDataUrl: string | null;
          probeSource: "ffprobe" | "browser" | "fallback";
        }>;
      };
      project: DesktopProjectBridge;
    };
  }
}

export {};
