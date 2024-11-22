import { BrowserWindow } from "electron";
import { EventEmitter } from "./classes/event-emitter";

export interface ExposedAPI {
  listSiblings: (path: string) => Promise<any>;
  getFilePath: (file: File) => string;
  attachDesktopStream: () => void;
  windowEventEmitter: EventEmitter;
  askCameraPermission: () => void;
  getLocalIp: (cb: Function) => void;
  saveLocalSDP: (sdp: RTCSessionDescriptionInit) => void;
  getLocalSDP: (cb: Function) => void;
  onDemandAnswerSDP: (cb: Function) => void;
  uploadLocalAnswer: (answer: RTCSessionDescriptionInit) => void;
}

export interface FrontendState {
  selectedPath: string;
}

export type BackendStore = {
  localAnswer?: RTCLocalSessionDescriptionInit;
  remoteOffer?: RTCLocalSessionDescriptionInit;
  localOffer?: RTCLocalSessionDescriptionInit;
  remoteAnswer?: RTCLocalSessionDescriptionInit;
  on: (key: keyof BackendStore, cb: Function) => any;
  callBacks: {
    [key in keyof BackendStore]: Function[];
  };
  off: (key: keyof BackendStore, cb: Function) => any;
};

export type EventHandlerFunction = (
  event: Electron.IpcMainEvent,
  args: any,
  window: BrowserWindow,
  store: BackendStore
) => Promise<void>;

export type RendererEventHandlerFunction = (
  event: Electron.IpcRendererEvent,
  args: any
) => void;

declare global {
  interface Window {
    electron: ExposedAPI;
  }
}
