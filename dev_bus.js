var express = require("express");
var app = express();
var { WebSocketServer } = require("ws");

const connections = [];

wsServer = new WebSocketServer({
  port: 6030,
});

wsServer.on("connection", (ws) => {
  ws.on("closed", () => connections.filter((e) => e != ws));
  connections.push(ws);
});

app.get("/reload", (_, res) => {
  connections.forEach((ws) => {
    ws.send(JSON.stringify({ payload: "reload" }));
  });
  res.status(200).send({});
});

app.get("/connections", (_, res) => {
  res.status(200).send({ connections: connections.length });
});

app.listen(2948);
