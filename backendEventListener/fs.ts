import { FS } from "../events";
import { EventHandlerFunction } from "../types";
import { readdir } from "fs";
import { join as pathJoin } from "path";

export const listSibling: EventHandlerFunction = (event, args, window) => {
  const parentDirectory = pathJoin(args.filePath, "..");
  readdir(parentDirectory, (err, files) => {
    if (err) return window.webContents.send(FS.LIST_SIBLINGS_RESP, { err });
    window.webContents.send(FS.LIST_SIBLINGS_RESP, { files });
  });
};
