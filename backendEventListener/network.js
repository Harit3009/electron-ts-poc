"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalSDP = exports.saveLocalSdpInMain = exports.getLocalIP = void 0;
var events_1 = require("../events");
var os_1 = require("os");
var getLocalIP = function (event, args, window) {
    var _a;
    var _net = (0, os_1.networkInterfaces)();
    var netInterfaces = Object.keys(_net);
    var address = (_a = netInterfaces
        .filter(function (str) { return !str.includes("Loopback Pseudo-Interface"); })
        .reduce(function (acc, int) {
        return acc.concat(_net[int]);
    }, [])
        .find(function (obj) { return obj.family === "IPv4"; })) === null || _a === void 0 ? void 0 : _a.address;
    window.webContents.send(events_1.NETWORK.GET_LOCAL_IP_RES, {
        ipAddress: address,
        port: 2345,
    });
};
exports.getLocalIP = getLocalIP;
var saveLocalSdpInMain = function (event, args, win, store) {
    store.localSdp = args;
    event.sender.send(events_1.NETWORK.SAVE_LOCAL_SDP_RES);
};
exports.saveLocalSdpInMain = saveLocalSdpInMain;
var getLocalSDP = function (event, args, win, store) {
    event.sender.send(events_1.NETWORK.GET_LOCAL_SDP_RES, store.localSdp);
};
exports.getLocalSDP = getLocalSDP;
