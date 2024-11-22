import * as React from "react";

export const Connection = () => {
  const [net, setNet] = React.useState<{ ipAddress: string; port: string }>();
  const [localOffer, setLocalSDP] = React.useState<RTCSessionDescriptionInit>();
  const [remoteSDP, setRemoteSDP] = React.useState<RTCSessionDescriptionInit>();
  const [STUN_Url, setStunUrl] = React.useState<string>("");
  const stream = React.useRef<MediaStream>(new MediaStream());
  const rtcConnection = React.useRef<RTCPeerConnection>(
    new RTCPeerConnection({
      iceTransportPolicy: "all",
    })
  );

  React.useEffect(() => {
    window.electron.onDemandAnswerSDP(
      async (_remoteSDP: RTCSessionDescriptionInit) => {
        setRemoteSDP(_remoteSDP);
        return await rtcConnection.current.createAnswer();
      }
    );

    window.electron.getLocalIp((args: any) => {
      setNet(args);
    });

    window.electron.getLocalSDP((sdp?: RTCSessionDescriptionInit) => {
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
    setLocalSDP(offer);
    return offer;
  };

  React.useEffect(() => {
    console.log(localOffer);
    (async () => {
      if (localOffer) {
        await rtcConnection.current.setLocalDescription(localOffer);
      }
    })();
  }, [localOffer]);

  React.useEffect(() => {
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
    if (!localOffer) return;
    const body = JSON.stringify({
      sdp: localOffer,
    });
    console.log(body);
    const res = await fetch(`http://${"192.168.29.27:2345"}/connect`, {
      method: "POST",
      body,
      headers: [["content-type", "application/json"]],
    }).then((res) => res.json());
    console.log(res, "fetch response");
    setRemoteSDP(res.remoteAnswer);
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
