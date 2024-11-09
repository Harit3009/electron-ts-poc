import * as React from "react";

export const Connection = () => {
  const [net, setNet] = React.useState<{ ipAddress: string; port: string }>();

  React.useEffect(() => {
    window.electron.getLocalIp((args: any) => {
      setNet(args);
    });
  }, []);

  return <>{net && <p>{`http://${net?.ipAddress}:${net?.port}`}</p>}</>;
};
