import { NETWORK } from "../events";
import { EventHandlerFunction } from "../types";
import { NetworkInterfaceInfo, networkInterfaces } from "os";

export const getLocalIP: EventHandlerFunction = async (event, args, window) => {
  const _net = networkInterfaces();

  const netInterfaces = Object.keys(_net);

  const address = netInterfaces
    .filter((str) => !str.includes("Loopback Pseudo-Interface"))
    .reduce(
      (acc: NetworkInterfaceInfo[], int) =>
        acc.concat(_net[int] as NetworkInterfaceInfo[]),
      []
    )
    .find((obj) => obj.family === "IPv4")?.address;

  window.webContents.send(NETWORK.GET_LOCAL_IP_RES, {
    ipAddress: address,
    port: 2345,
  });
};

export const saveLocalOfferInMain: EventHandlerFunction = async (
  event,
  args,
  win,
  store
) => {
  store.localOffer = args;
  event.sender.send(NETWORK.SAVE_LOCAL_OFFER_RES);
};

export const getLocalOffer: EventHandlerFunction = async (
  event,
  args,
  win,
  store
) => {
  event.sender.send(NETWORK.GET_LOCAL_OFFER_RES, store.localOffer);
};
