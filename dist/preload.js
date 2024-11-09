"use strict";
(() => {
  // classes/event-emitter.ts
  var EventEmitter = class {
    constructor() {
      this.listeners = {};
    }
    emit(eventName, data) {
      this.listeners[eventName]?.forEach(
        (callback) => setTimeout(callback.apply(this, [this, ...data]), 0)
      );
    }
    on(name, callback) {
      if (typeof callback === "function" && typeof name === "string") {
        if (!this.listeners[name]) this.listeners[name] = [];
        this.listeners[name].push(callback);
      }
    }
    off(eventName, callback) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (listener) => !(listener === callback)
      );
    }
    destroy() {
      this.listeners = {};
    }
  };

  // dist/_preload.ts
var { ipcRenderer } = require('electron');
var { contextBridge } = require('electron');
var { webUtils } = require('electron');
  var electronAPI = {
    listSiblings: async (filePath) => {
      ipcRenderer.send("fs:listSibling:req" /* LIST_SIBLINGS_QUERY */, {
        filePath
      });
    },
    getFilePath: webUtils.getPathForFile,
    attachDesktopStream: () => ipcRenderer.send("media:attachDesktopCapturer:req" /* ATTACH_DSKTOP_CAPTURER_REQ */),
    windowEventEmitter: new EventEmitter(),
    askCameraPermission: () => ipcRenderer.send("media:askCameraPErmission:req" /* ASK_PERMISSION_CAMERA_REQ */),
    getLocalIp: (cb) => {
      ipcRenderer.send("network:getlocalip:req" /* GET_LOCAL_IP_REQ */);
      ipcRenderer.on("network:getlocalip:res" /* GET_LOCAL_IP_RES */, (_, args) => {
        console.log(args);
        cb(args);
      });
    }
  };
  contextBridge.exposeInMainWorld("electron", electronAPI);
})();
