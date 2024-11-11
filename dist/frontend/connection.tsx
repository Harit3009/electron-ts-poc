import * as React from "react";

export const Connection = () => {
  const [net, setNet] = React.useState<{ ipAddress: string; port: string }>();
  const [localSDP, setLocalSDP] = React.useState<RTCSessionDescriptionInit>();
  const [remoteSDP, setRemoteSDP] = React.useState<RTCSessionDescriptionInit>();
  const [ip, setIp] = React.useState<string>("");
  const stream = React.useRef<MediaStream>(new MediaStream());
  const rtcConnection = React.useRef<RTCPeerConnection>(
    new RTCPeerConnection()
  );

  React.useEffect(() => {
    window.electron.getLocalIp((args: any) => {
      setNet(args);
    });

    window.electron.getLocalSDP((sdp?: RTCSessionDescriptionInit) => {
      console.log("recievedLocal sdp", sdp);
      if (sdp) {
        setLocalSDP(sdp);
        return;
      }
      createAndSetLocalOffer().then((offer) =>
        window.electron.saveLocalSDP(offer)
      );
    });
  }, []);

  const createAndSetLocalOffer = async () => {
    const offer = await rtcConnection.current.createOffer();
    console.log(offer);
    setLocalSDP(offer);
    return offer;
  };

  React.useEffect(() => {
    console.log(localSDP);
    (async () => {
      if (localSDP) {
        await rtcConnection.current.setLocalDescription(localSDP);
      }
    })();
  }, [localSDP]);

  return (
    <>
      {net && (
        <>
          <p>{`http://${net?.ipAddress}:${net?.port}`}</p>

          <div className="d-flex flex-column">
            <input
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              type="text"
              className="p-1 w-50"
            />
            <div className="d-flex p-2">
              <button>connect</button>
              <button onClick={() => {}}>cancel</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
