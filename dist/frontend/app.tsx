import { ExposedAPI } from "../../types";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import * as React from "react";
import VideoComponent from "./video";
import { Connection } from "./connection";

const App: React.FC<{}> = () => {
  const [file, setFile] = useState<string>("");

  const _electron: ExposedAPI = window.electron;

  return (
    <>
      <Connection />
      <VideoComponent />
    </>
  );
};

const body = document.getElementById("body")!;
const root = createRoot(body, {});
export const renderApp = () => {
  // @ts-expect-error
  window._root = root;
  root.render(<App />);
};
