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

const store: BackendStore = {
  on: function (changedProp: keyof BackendStore, cb) {
    this.callBacks[changedProp]!.push(cb);
  },
  off: function (prop: keyof BackendStore, cb) {
    if (this.callBacks[prop])
      this.callBacks[prop] = this.callBacks[prop]?.filter((fn) => fn != cb);
  },
  callBacks: {
    localAnswer: [],
    localOffer: [],
    remoteAnswer: [],
    remoteOffer: [],
    on: [],
    callBacks: [],
    off: [],
  },
};

const newStore = new Proxy(store, {
  set: (target, property, value, rec) => {
    console.log("value recieved within setter ", value);
    target.callBacks[property as keyof BackendStore]?.forEach((fn) => {
      fn(value);
    });
    return true;
  },
});

httpServer.use(express.json());
httpServer.use(express.urlencoded({ extended: true }));

const handshakePort = 2345;

httpServer.post("/connect", async (req, res) => {
  const sdp = req.body.sdp;
  if (!sdp) {
    res.status(400).send({ message: "SDP is required field" });
    return;
  }

  const cb = (localAnswer: any) => {
    // remote answer for offerer
    console.log("local answer in set store", localAnswer);
    res
      .status(200)
      .setHeader("content-type", "application/json")
      .send({ remoteAnswer: localAnswer });
    newStore.off("localAnswer", cb);
  };

  store.remoteOffer = sdp;
  newStore.on("localAnswer", cb);
  mainWindow.webContents.send(NETWORK.DEMAND_LOCAL_ANSWER_SDP_NOTIFY, sdp);
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
  ipcMain.on(
    event,
    async (recievedEvent, args) =>
      await eventHandlerMap[event](recievedEvent, args, mainWindow, newStore)
  );
});
