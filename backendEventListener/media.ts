import { desktopCapturer, systemPreferences } from "electron";
import { EventHandlerFunction } from "../types";

export const attachDesktopStream: EventHandlerFunction = (
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

export const askForCameraPermissions: EventHandlerFunction = (
  event,
  args,
  window,
  deps
) => {
  try {
    console.log(deps?.systemPreferences);
    console.log(deps?.systemPreferences.getMediaAccessStatus("camera"));
    console.log(deps?.systemPreferences.getMediaAccessStatus("microphone"));
  } catch (error) {
    console.log("catch error", error);
  }
};
