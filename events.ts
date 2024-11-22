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
  SAVE_LOCAL_OFFER_REQ = "network:saveLocalOfferSDP:req",
  SAVE_LOCAL_OFFER_RES = "network:saveLocalOfferSDP:res",
  GET_LOCAL_OFFER_REQ = "network:getLocalOffer:req",
  GET_LOCAL_OFFER_RES = "network:getLocalOffer:res",
  DEMAND_LOCAL_ANSWER_SDP_NOTIFY = "networ:demandLocalAnswerSDP:notify",
  LOCAL_ANSWER_SDP_REQ = "networ:localAnswerSDP:req",
}
