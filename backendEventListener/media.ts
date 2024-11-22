import { desktopCapturer, systemPreferences } from "electron";
import { EventHandlerFunction } from "../types";

export const attachDesktopStream: EventHandlerFunction = async (
  event,
  args,
  window
) => {
  console.log("reached");
  window.webContents.session.setDisplayMediaRequestHandler(
    (request, callback) => {
      desktopCapturer.getSources({ types: ["screen"] }).then((sources) => {
        callback({ video: sources[0], audio: "loopback" });
      });
    },
    { useSystemPicker: false }
  );
};

export const askForCameraPermissions: EventHandlerFunction = async (
  event,
  args,
  window,
  deps
) => {
  try {
  } catch (error) {
    console.log("catch error", error);
  }
};
