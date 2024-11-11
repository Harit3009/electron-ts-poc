"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NETWORK = exports.MEDIA = exports.FS = void 0;
var FS;
(function (FS) {
    FS["LIST_SIBLINGS_QUERY"] = "fs:listSibling:req";
    FS["LIST_SIBLINGS_RESP"] = "fs:listSibling:res";
})(FS || (exports.FS = FS = {}));
var MEDIA;
(function (MEDIA) {
    MEDIA["ATTACH_DSKTOP_CAPTURER_REQ"] = "media:attachDesktopCapturer:req";
    MEDIA["ATTACH_DSKTOP_CAPTURER_RES"] = "media:attachDesktopCapturer:res";
    MEDIA["ASK_PERMISSION_CAMERA_REQ"] = "media:askCameraPErmission:req";
    MEDIA["ASK_PERMISSION_CAMERA_RES"] = "media:askCameraPErmission:res";
})(MEDIA || (exports.MEDIA = MEDIA = {}));
var NETWORK;
(function (NETWORK) {
    NETWORK["GET_LOCAL_IP_REQ"] = "network:getlocalip:req";
    NETWORK["GET_LOCAL_IP_RES"] = "network:getlocalip:res";
    NETWORK["SAVE_LOCAL_SDP_REQ"] = "network:saveLocalSDP:req";
    NETWORK["SAVE_LOCAL_SDP_RES"] = "network:saveLocalSDP:res";
    NETWORK["GET_LOCAL_SDP_REQ"] = "network:getLocalSDP:req";
    NETWORK["GET_LOCAL_SDP_RES"] = "network:getLocalSDP:res";
})(NETWORK || (exports.NETWORK = NETWORK = {}));
