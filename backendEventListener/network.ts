import { NETWORK } from "../events";
import { EventHandlerFunction } from "../types";
import { NetworkInterfaceInfo, networkInterfaces } from "os";

export const getLocalIP: EventHandlerFunction = (event, args, window) => {
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

export const saveLocalSdpInMain: EventHandlerFunction = (
  event,
  args,
  win,
  store
) => {
  store.localSdp = args;
  event.sender.send(NETWORK.SAVE_LOCAL_SDP_RES);
};

export const getLocalSDP: EventHandlerFunction = (event, args, win, store) => {
  event.sender.send(NETWORK.GET_LOCAL_SDP_RES, store.localSdp);
};
