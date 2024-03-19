const { tracer } = require("../tracer");
const { REQUEST_TYPE } = require("../config");
const { checkToken } = require("./check-token");
const express = require("express");
const ruid = require("express-ruid");
const bodyParser = require("body-parser");
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(express.json());
server.use(
  ruid({
    prefixRoot: "",
    prefixSeparator: "",
  }),
);

server.post("*/api/v1/moderateText", async (req: any, res: any) => {
  const span = tracer.startSpan("foo");
  span.setAttribute("key2222", "value2222");
  span.addEvent("invoking work22222");
  span.end();
  const token = await checkToken(req, REQUEST_TYPE.TEXT);

  if (token.error) {
    return res.status(400).send(JSON.stringify(token.error));
  }

  await db.collection("logs").add({
    rid: req.rid,
    time: new Date().toISOString(),
    text: req.body.text,
    // token: token.token,
    code: "Sex",
    type: "Appeal",
    transcription: req.body.text,
    state: 1,
    moderator: {
      name: "ML_Audio_123F22",
      type: "ML",
      id: "moderator_id",
    },
  });
  return res.status(200).send(JSON.stringify({ state: "approved" }));
});

exports.server = server;
