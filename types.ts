import { BrowserWindow } from "electron";
import { EventEmitter } from "./classes/event-emitter";

export interface ExposedAPI {
  listSiblings: (path: string) => Promise<any>;
  getFilePath: (file: File) => string;
  attachDesktopStream: () => void;
  windowEventEmitter: EventEmitter;
  askCameraPermission: () => void;
  getLocalIp: (cb: Function) => void;
}

export interface FrontendState {
  selectedPath: string;
}

export type EventHandlerFunction = (
  event: Electron.IpcMainEvent,
  args: any,
  window: BrowserWindow,
  dependencies?: { systemPreferences: Electron.SystemPreferences }
) => void;

export type RendererEventHandlerFunction = (
  event: Electron.IpcRendererEvent,
  args: any
) => void;

declare global {
  interface Window {
    electron: ExposedAPI;
  }
}
