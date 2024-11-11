"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askForCameraPermissions = exports.attachDesktopStream = void 0;
var electron_1 = require("electron");
var attachDesktopStream = function (event, args, window) {
    console.log("reached");
    window.webContents.session.setDisplayMediaRequestHandler(function (request, callback) {
        electron_1.desktopCapturer.getSources({ types: ["screen"] }).then(function (sources) {
            callback({ video: sources[0], audio: "loopback" });
        });
    }, { useSystemPicker: false });
};
exports.attachDesktopStream = attachDesktopStream;
var askForCameraPermissions = function (event, args, window, deps) {
    try {
    }
    catch (error) {
        console.log("catch error", error);
    }
};
exports.askForCameraPermissions = askForCameraPermissions;
