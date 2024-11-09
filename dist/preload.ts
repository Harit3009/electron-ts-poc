import { ipcRenderer, contextBridge, webUtils } from "electron"; // should be on top...
import { FS, MEDIA, NETWORK } from "../events";
import { ExposedAPI } from "../types";
import { EventEmitter } from "../classes/event-emitter";

const electronAPI: ExposedAPI = {
  listSiblings: async (filePath: string) => {
    ipcRenderer.send(FS.LIST_SIBLINGS_QUERY, {
      filePath,
    });
  },
  getFilePath: webUtils.getPathForFile,
  attachDesktopStream: () => ipcRenderer.send(MEDIA.ATTACH_DSKTOP_CAPTURER_REQ),
  windowEventEmitter: new EventEmitter(),
  askCameraPermission: () => ipcRenderer.send(MEDIA.ASK_PERMISSION_CAMERA_REQ),
  getLocalIp: (cb: Function) => {
    ipcRenderer.send(NETWORK.GET_LOCAL_IP_REQ);
    ipcRenderer.on(NETWORK.GET_LOCAL_IP_RES, (_, args) => {
      console.log(args);
      cb(args);
    });
  },
};

contextBridge.exposeInMainWorld("electron", electronAPI);
