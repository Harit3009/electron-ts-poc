import { app, BrowserWindow, ipcMain, systemPreferences } from "electron";
import path from "path";
import { eventHandlerMap } from "./backendEventListener";
import { config } from "dotenv";
import WSClient from "ws";
import express from "express";
import { NetworkInterfaceInfo, networkInterfaces } from "os";

const httpServer = express();

const handshakePort = 2345;

httpServer.listen(handshakePort, "0.0.0.0", () => {
  // get the local ip
});

// write event listener to send it to screen

config();

const { APP_ENVIRONMENT } = process.env;

let wsClient: WSClient;
let mainWindow: BrowserWindow;

if (APP_ENVIRONMENT === "DEV") {
  wsClient = new WSClient("ws://localhost:6030", {});
  wsClient.on("connect", (ws) => {
    console.log("connection in main");
  });
  wsClient.on("message", (res: any) => {
    const data = JSON.parse(res.toString());
    if (data.payload == "reload") mainWindow.reload();
  });
}

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "dist", "preload.js"),
      allowRunningInsecureContent: true,
    },
    height: 1080,
    width: 1920,
  });

  mainWindow.on("show", () => {
    mainWindow.loadFile(path.join(__dirname, "dist", "index.html"), {});
  });

  mainWindow.show();

  app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");

  mainWindow.webContents.openDevTools({
    mode: "bottom",
  });
});

Object.keys(eventHandlerMap).forEach((event) => {
  ipcMain.on(event, (recievedEvent, args) =>
    eventHandlerMap[event](recievedEvent, args, mainWindow, {
      systemPreferences,
    })
  );
});
