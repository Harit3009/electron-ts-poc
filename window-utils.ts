import { BrowserWindow } from "electron";

export const sendEventToWindow = (
  window: BrowserWindow,
  event: string,
  data: any
) => {
  window.webContents.executeJavaScript(
    `window.electron.windowEventEmitter.emit(${event}, ${data})`
  );
};
