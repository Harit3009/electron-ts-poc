import * as React from "react";

interface VideoComponentProps {}

export const VideoComponent: React.FunctionComponent<
  VideoComponentProps
> = () => {
  const vidRef = React.useRef<HTMLVideoElement>(null);
  const [srcObject, setSrcObject] = React.useState<MediaStream>();
  const [deviceId, setDeviceID] = React.useState<string>("");
  const getScreenMedia = () => {
    navigator.mediaDevices
      .getDisplayMedia()
      .then((strem) => {
        setSrcObject(strem);
      })
      .catch((error) => {
        console.log("errored in video ", { error });
      });
  };

  const getCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((strem) => {
        setSrcObject(strem);
      })
      .catch((error) => {
        console.log("errored in video ", { error });
      });
  };

  React.useEffect(() => {
    if (srcObject) vidRef.current!.srcObject = srcObject;
  }, [srcObject]);

  React.useEffect(() => {
    if (deviceId) getScreenMedia();
  }, [deviceId]);

  React.useEffect(() => {}, []);

  return (
    <div className="d-flex flex-column">
      <video
        onLoadedMetadata={(meta) => {
          vidRef.current?.play();
        }}
        ref={vidRef}
      ></video>

      <div className="d-flex">
        <button
          onClick={async () => {
            getCamera();
          }}
        >
          Camera
        </button>
        <button
          onClick={async () => {
            window.electron.attachDesktopStream();
          }}
        >
          Start
        </button>
        <button>Stop</button>
      </div>
    </div>
  );
};

export default VideoComponent;
