export enum FS {
  LIST_SIBLINGS_QUERY = "fs:listSibling:req",
  LIST_SIBLINGS_RESP = "fs:listSibling:res",
}

export enum MEDIA {
  ATTACH_DSKTOP_CAPTURER_REQ = "media:attachDesktopCapturer:req",
  ATTACH_DSKTOP_CAPTURER_RES = "media:attachDesktopCapturer:res",
  ASK_PERMISSION_CAMERA_REQ = "media:askCameraPErmission:req",
  ASK_PERMISSION_CAMERA_RES = "media:askCameraPErmission:res",
}

export enum NETWORK {
  GET_LOCAL_IP_REQ = "network:getlocalip:req",
  GET_LOCAL_IP_RES = "network:getlocalip:res",
  SAVE_LOCAL_SDP_REQ = "network:saveLocalSDP:req",
  SAVE_LOCAL_SDP_RES = "network:saveLocalSDP:res",
  GET_LOCAL_SDP_REQ = "network:getLocalSDP:req",
  GET_LOCAL_SDP_RES = "network:getLocalSDP:res",
  NOTIFY_REMOTE_SDP = "network:remoteSDP:notify",
}
