"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEventToWindow = void 0;
var sendEventToWindow = function (window, event, data) {
    window.webContents.executeJavaScript("window.electron.windowEventEmitter.emit(".concat(event, ", ").concat(data, ")"));
};
exports.sendEventToWindow = sendEventToWindow;
