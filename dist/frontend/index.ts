import * as React from "react";
import { renderApp } from "./app";

const initiateApp = () => {
  if (!React) initiateApp();
  else renderApp();
};

initiateApp();
