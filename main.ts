import { app, BrowserWindow, ipcMain, systemPreferences } from "electron";
import path from "path";
import { eventHandlerMap } from "./backendEventListener";
import { config } from "dotenv";
import WSClient from "ws";
import express from "express";
import { BackendStore } from "./types";
import { NETWORK } from "./events";

config();
const httpServer = express();

const store: BackendStore = { remoteSdps: [] };

httpServer.use(express.json());
httpServer.use(express.urlencoded({ extended: true }));

const handshakePort = 2345;

httpServer.post("/connect", (req, res) => {
  const sdp = req.body.sdp;
  if (!sdp) {
    res.status(400).send({ message: "SDP is required field" });
    return;
  }
  if (!store.localSdp) {
    res.status(404).send({ message: "No sdp found yet!" });
    return;
  }
  store.remoteSdps.push(sdp);
  mainWindow.webContents.send(NETWORK.NOTIFY_REMOTE_SDP, sdp);
  res.status(200).send({ remoteSDP: store.localSdp });
});

httpServer.listen(handshakePort, "0.0.0.0", () => {});

// write event listener to send it to screen

const { APP_ENVIRONMENT } = process.env;

let wsClient: WSClient;
let mainWindow: BrowserWindow;

if (APP_ENVIRONMENT === "DEV") {
  wsClient = new WSClient("ws://localhost:6030", {});
  wsClient.on("connect", (ws) => {});

  wsClient.on("message", (res: any) => {
    const data = JSON.parse(res.toString());
    if (data.payload == "reload" && mainWindow.isVisible()) mainWindow.reload();
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
    eventHandlerMap[event](recievedEvent, args, mainWindow, store)
  );
});
