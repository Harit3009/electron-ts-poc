import * as React from "react";

export const Connection = () => {
  const [net, setNet] = React.useState<{ ipAddress: string; port: string }>();
  const [localSDP, setLocalSDP] = React.useState<RTCSessionDescriptionInit>();
  const [remoteSDP, setRemoteSDP] = React.useState<RTCSessionDescriptionInit>();
  const [STUN_Url, setStunUrl] = React.useState<string>("");
  const stream = React.useRef<MediaStream>(new MediaStream());
  const rtcConnection = React.useRef<RTCPeerConnection>(
    new RTCPeerConnection()
  );

  React.useEffect(() => {
    window.electron.onRemoteSDPNotification(
      (_remoteSDP: RTCSessionDescriptionInit) => {
        setRemoteSDP(_remoteSDP);
      }
    );
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

  React.useEffect(() => {
    console.log(remoteSDP);
    (async () => {
      if (remoteSDP) {
        await rtcConnection.current
          .setRemoteDescription(remoteSDP)
          .then((res) => {
            console.log("remote connection was established", res);
          });
      }
    })();
  }, [remoteSDP]);

  const sendConnectionRequest = async () => {
    if (!localSDP) return;
    const res = await fetch(`http://${STUN_Url}/connect`, {
      method: "POST",
      body: JSON.stringify({
        sdp: localSDP,
      }),
    }).then((res) => res.json());

    console.log(res, "fetch response");

    setRemoteSDP(res.remoteSdp);
  };

  return (
    <>
      {net && (
        <>
          <p>{`http://${net?.ipAddress}:${net?.port}`}</p>

          <div className="d-flex flex-column">
            <input
              value={STUN_Url}
              onChange={(e) => setStunUrl(e.target.value)}
              type="text"
              className="p-1 w-50"
            />
            <div className="d-flex">
              <button onClick={sendConnectionRequest}>connect</button>
              <button onClick={() => {}}>cancel</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
