import { FS, MEDIA, NETWORK } from "../events";
import { EventHandlerFunction } from "../types";
import { listSibling } from "./fs";
import { askForCameraPermissions, attachDesktopStream } from "./media";
import { getLocalIP, getLocalSDP, saveLocalSdpInMain } from "./network";

export const eventHandlerMap: {
  [key: string]: EventHandlerFunction;
} = {
  [FS.LIST_SIBLINGS_QUERY]: listSibling,
  [MEDIA.ATTACH_DSKTOP_CAPTURER_REQ]: attachDesktopStream,
  [MEDIA.ASK_PERMISSION_CAMERA_REQ]: askForCameraPermissions,
  [NETWORK.GET_LOCAL_IP_REQ]: getLocalIP,
  [NETWORK.SAVE_LOCAL_SDP_REQ]: saveLocalSdpInMain,
  [NETWORK.GET_LOCAL_SDP_REQ]: getLocalSDP,
};
