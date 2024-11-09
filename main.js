"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
var backendEventListener_1 = require("./backendEventListener");
var dotenv_1 = require("dotenv");
var ws_1 = __importDefault(require("ws"));
var express_1 = __importDefault(require("express"));
var httpServer = (0, express_1.default)();
var handshakePort = 2345;
httpServer.listen(handshakePort, "0.0.0.0", function () {
    // get the local ip
});
// write event listener to send it to screen
(0, dotenv_1.config)();
var APP_ENVIRONMENT = process.env.APP_ENVIRONMENT;
var wsClient;
var mainWindow;
if (APP_ENVIRONMENT === "DEV") {
    wsClient = new ws_1.default("ws://localhost:6030", {});
    wsClient.on("connect", function (ws) {
        console.log("connection in main");
    });
    wsClient.on("message", function (res) {
        var data = JSON.parse(res.toString());
        if (data.payload == "reload")
            mainWindow.reload();
    });
}
electron_1.app.on("ready", function () {
    mainWindow = new electron_1.BrowserWindow({
        show: false,
        webPreferences: {
            preload: path_1.default.join(__dirname, "dist", "preload.js"),
            allowRunningInsecureContent: true,
        },
        height: 1080,
        width: 1920,
    });
    mainWindow.on("show", function () {
        mainWindow.loadFile(path_1.default.join(__dirname, "dist", "index.html"), {});
    });
    mainWindow.show();
    electron_1.app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
    mainWindow.webContents.openDevTools({
        mode: "bottom",
    });
});
Object.keys(backendEventListener_1.eventHandlerMap).forEach(function (event) {
    electron_1.ipcMain.on(event, function (recievedEvent, args) {
        return backendEventListener_1.eventHandlerMap[event](recievedEvent, args, mainWindow, {
            systemPreferences: electron_1.systemPreferences,
        });
    });
});
