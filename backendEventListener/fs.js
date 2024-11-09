"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listSibling = void 0;
var events_1 = require("../events");
var fs_1 = require("fs");
var path_1 = require("path");
var listSibling = function (event, args, window) {
    var parentDirectory = (0, path_1.join)(args.filePath, "..");
    (0, fs_1.readdir)(parentDirectory, function (err, files) {
        if (err)
            return window.webContents.send(events_1.FS.LIST_SIBLINGS_RESP, { err: err });
        window.webContents.send(events_1.FS.LIST_SIBLINGS_RESP, { files: files });
    });
};
exports.listSibling = listSibling;
