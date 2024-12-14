import * as React from "react";

export const Connection = () => {
  const [net, setNet] = React.useState<{ ipAddress: string; port: string }>();
  const [localOffer, setLocalOffer] =
    React.useState<RTCSessionDescriptionInit>();
  const [remoteAnswer, setRemoteAnswer] =
    React.useState<RTCSessionDescriptionInit>();
  const [remoteOffer, setRemoteOffer] =
    React.useState<RTCSessionDescriptionInit>();
  const [remoteUrl, setRemoteUrl] =
    React.useState<string>("192.168.29.27:2345");
  const [localAnswer, setLocalAnswer] =
    React.useState<RTCSessionDescriptionInit>();
  const stream = React.useRef<MediaStream>(new MediaStream());
  const [loading, setLoading] = React.useState<boolean>(false);
  const rtcConnection = React.useRef<RTCPeerConnection>(
    new RTCPeerConnection({
      iceTransportPolicy: "all",
    })
  );

  const offererChannel = React.useRef<RTCDataChannel>();
  const answererChannel = React.useRef<RTCDataChannel>();

  React.useEffect(() => {
    window.electron.onDemandAnswerSDP(
      (_remoteSDP: RTCSessionDescriptionInit) => {
        setRemoteOffer(_remoteSDP);
      }
    );

    window.electron.getLocalIp((args: any) => {
      setNet(args);
    });

    window.electron.getLocalSDP((sdp?: RTCSessionDescriptionInit) => {
      if (sdp) {
        setLocalOffer(sdp);
        return;
      }
      createAndSetLocalOffer().then((offer) =>
        window.electron.saveLocalSDP(offer)
      );
    });

    rtcConnection.current.ondatachannel = (event) => {
      answererChannel.current = event.channel;

      answererChannel.current.onopen = () => {
        console.log("Data channel is open!");
      };

      answererChannel.current.onmessage = (event) => {
        console.log("Message from peer:", event.data);
      };
    };
    (window as any).a = rtcConnection.current;
  }, []);

  React.useEffect(() => {
    if (localAnswer) {
      window.electron.uploadLocalAnswer(localAnswer);
    }
  }, [localAnswer]);

  const createAndSetLocalOffer = async () => {
    const offer = await rtcConnection.current.createOffer();
    setLocalOffer(offer);
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
      if (remoteOffer) {
        await rtcConnection.current
          .setRemoteDescription(remoteOffer)
          .then((res) => {
            rtcConnection.current.createAnswer().then((answer) => {
              setLocalAnswer(answer);
              console.log("remote connection was established", answer);
            });
          });
      }
    })();
  }, [remoteOffer]);

  React.useEffect(() => {
    (async () => {
      if (remoteAnswer) {
        setLoading(false);
        await rtcConnection.current.setRemoteDescription(remoteAnswer);
        offererChannel.current =
          rtcConnection.current.createDataChannel("jsonChannel");
        offererChannel.current.onopen = () => {
          console.log("Data channel is open!");
        };

        offererChannel.current.onmessage = (event) => {
          console.log("Message from peer:", event.data);
        };
      }
    })();
  }, [remoteAnswer]);

  const sendConnectionRequest = async () => {
    if (!localOffer) return;
    setLoading(true);
    const body = JSON.stringify({
      sdp: localOffer,
    });
    const res = await fetch(`http://${remoteUrl}/connect`, {
      method: "POST",
      body,
      headers: [["content-type", "application/json"]],
    })
      .then((res) => res.json())
      .catch((er) => {
        console.log(er);
      });
    setRemoteAnswer(res.remoteAnswer);
  };

  React.useEffect(() => {
    console.log(
      "(offererChannel.current?.readyState",
      offererChannel.current?.readyState
    );
  }, [offererChannel.current?.readyState]);

  return (
    <>
      {net && (
        <>
          {loading ? (
            <div className="d-flex">Loading...</div>
          ) : (
            <>
              <p>{`http://${net?.ipAddress}:${net?.port}`}</p>

              <div className="d-flex flex-column">
                <input
                  value={remoteUrl}
                  onChange={(e) => setRemoteUrl(e.target.value)}
                  type="text"
                  className="p-1 w-50"
                />
                <div className="d-flex">
                  <button onClick={sendConnectionRequest}>connect</button>
                  <button onClick={() => {}}>cancel</button>
                  <button
                    onClick={() => {
                      if (offererChannel.current?.readyState === "open")
                        offererChannel.current?.send?.(
                          JSON.stringify({ remoteUrl })
                        );
                    }}
                  >
                    Send data test
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
