"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderApp = void 0;
var client_1 = require("react-dom/client");
var react_1 = require("react");
var React = __importStar(require("react"));
var video_1 = __importDefault(require("./video"));
var connection_1 = require("./connection");
var App = function () {
    var _a = (0, react_1.useState)(""), file = _a[0], setFile = _a[1];
    var _electron = window.electron;
    return (<>
      <connection_1.Connection />
      <video_1.default />
    </>);
};
var body = document.getElementById("body");
var root = (0, client_1.createRoot)(body, {});
var renderApp = function () {
    // @ts-expect-error
    window._root = root;
    root.render(<App />);
};
exports.renderApp = renderApp;
