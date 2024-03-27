const { tracer } = require("../tracer");
const { REQUEST_TYPE } = require("../config");
const { checkToken } = require("./check-token");
const express = require("express");
const ruid = require("express-ruid");
const bodyParser = require("body-parser");
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();
const { fileHandler, FILE_TYPES } = require("./file-handler");

const server = express();
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
server.use(express.json());
server.use(
  ruid({
    prefixRoot: "",
    prefixSeparator: "",
  }),
);

server.post(
  "*/api/v1/moderateAudio",
  fileHandler({ types: [FILE_TYPES.AUDIO] }),
  async (req: any, res: any) => {
    console.log(
      "_:39",
      req.body.fileUrl,
      req.body.fileName,
      req.body.mimeType,
      req.body.error,
    );
    return res.status(200).send(JSON.stringify({ state: "uploaded" }));
  },
);

server.post("*/api/v1/moderateText", async (req: any, res: any) => {
  const span = tracer.startSpan("moderateText");
  span.setAttribute("key2222", "value2222");
  span.addEvent("invoking work22222");
  const token = await checkToken(req, REQUEST_TYPE.TEXT);

  if (token.error) {
    const errorStr = JSON.stringify(token.error);
    span.setAttribute("error", errorStr);
    return res.status(400).send(errorStr);
  }

  const result = {
    rid: req.rid,
    time: new Date().toISOString(),
    text: req.body.text,
    token: token.token,
    code: "Sex",
    type: "Appeal",
    transcription: req.body.text,
    state: 1,
    moderator: {
      name: "ML_Audio_123F22",
      type: "ML",
      id: "moderator_id",
    },
  };

  await db.collection("logs").add(result);

  Object.entries(result).map((entry) => {
    span.setAttribute(...entry);
  });
  span.end();

  return res.status(200).send(JSON.stringify({ state: "approved" }));
});

exports.server = server;
