import { FS, MEDIA, NETWORK } from "../events";
import { EventHandlerFunction } from "../types";
import { listSibling } from "./fs";
import { askForCameraPermissions, attachDesktopStream } from "./media";
import { getLocalIP, getLocalOffer, saveLocalOfferInMain } from "./network";

export const eventHandlerMap: {
  [key: string]: EventHandlerFunction;
} = {
  [FS.LIST_SIBLINGS_QUERY]: listSibling,
  [MEDIA.ATTACH_DSKTOP_CAPTURER_REQ]: attachDesktopStream,
  [MEDIA.ASK_PERMISSION_CAMERA_REQ]: askForCameraPermissions,
  [NETWORK.GET_LOCAL_IP_REQ]: getLocalIP,
  [NETWORK.SAVE_LOCAL_OFFER_REQ]: saveLocalOfferInMain,
  [NETWORK.GET_LOCAL_OFFER_REQ]: getLocalOffer,
  [NETWORK.LOCAL_ANSWER_SDP_REQ]: async (ev, localAnswer, wind, store) => {
    store.localAnswer = localAnswer;
    return;
  },
};
