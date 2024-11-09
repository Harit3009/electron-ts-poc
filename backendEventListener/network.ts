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
