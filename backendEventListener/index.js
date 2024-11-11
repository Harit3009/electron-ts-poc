"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventHandlerMap = void 0;
var events_1 = require("../events");
var fs_1 = require("./fs");
var media_1 = require("./media");
var network_1 = require("./network");
exports.eventHandlerMap = (_a = {},
    _a[events_1.FS.LIST_SIBLINGS_QUERY] = fs_1.listSibling,
    _a[events_1.MEDIA.ATTACH_DSKTOP_CAPTURER_REQ] = media_1.attachDesktopStream,
    _a[events_1.MEDIA.ASK_PERMISSION_CAMERA_REQ] = media_1.askForCameraPermissions,
    _a[events_1.NETWORK.GET_LOCAL_IP_REQ] = network_1.getLocalIP,
    _a[events_1.NETWORK.SAVE_LOCAL_SDP_REQ] = network_1.saveLocalSdpInMain,
    _a[events_1.NETWORK.GET_LOCAL_SDP_REQ] = network_1.getLocalSDP,
    _a);
