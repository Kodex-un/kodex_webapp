import { CallableContext } from "firebase-functions/lib/common/providers/https";

const functions = require("firebase-functions");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const {
  ACCOUNT_STATUS,
  ACCOUNT_TYPE,
  TOKEN_STATUS,
  REQUEST_TYPE,
  ErrorCode,
} = require("./config");
const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const ruid = require("express-ruid");
const bodyParser = require("body-parser");
require("firebase-functions/logger/compat");

initializeApp();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  ruid({
    prefixRoot: "",
    prefixSeparator: "",
  }),
);

const db = getFirestore();

const checkToken = async (req: any, reqType: string) => {
  const token = req.get("Authorization");
  if (!token) {
    return {
      error: {
        code: ErrorCode.TOKEN_NOT_PRESENTED,
        message: "Token not found in this request",
      },
    };
  }

  const savedTokenSnap = await db.doc(`tokens/${token}`).get();

  if (savedTokenSnap.empty) {
    return {
      error: {
        code: ErrorCode.TOKEN_NOT_FOUND,
        message: "Token not found",
      },
    };
  }

  const savedToken = savedTokenSnap.data();
  if (savedToken.status !== "active") {
    return {
      error: {
        code: ErrorCode.TOKEN_NOT_ACTIVE,
        message: "Token is not active",
      },
    };
  }

  if (Array.isArray(savedToken.types) && !savedToken.types.includes(reqType)) {
    return {
      error: {
        code: ErrorCode.UNSUPPORTED_REQ_TYPE,
        message: `Token is not support this request type: ${reqType}`,
      },
    };
  }

  return Object.assign(savedToken, { token });
};

exports.getUserById = functions.https.onCall(async ({ id }: { id: string }) => {
  console.log("_:72", id);
  // if (!context.auth) {
  //   throw new functions.https.HttpsError(
  //     "unauthenticated",
  //     "only authenticated users allowed",
  //   );
  // }

  const user = await db.doc(`users/${id}`).get();
  return user.data();
});

exports.getUserToken = functions.https.onCall(
  async ({ tokenId }: { tokenId: string }, context: CallableContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users allowed",
      );
    }

    const token = await db.doc(`tokens/${tokenId}`).get();
    return token.data();
  },
);

exports.setTokenSettings = functions.https.onCall(
  async (
    { tokenId, settings }: { tokenId: string; settings: any },
    context: CallableContext,
  ) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users allowed",
      );
    }

    console.log("_:87");
    const rules = {
      drugs: 0,
      age: settings.community.age,
      fakeInformation: 0,
      hateSpeech: 0,
      intellectualProperty: 0,
      sex: 0,
    };

    const token = await db.doc(`tokens/${tokenId}`).update({ rules });
    return token.data();
  },
);

exports.saveUserData = functions.auth.user().onCreate(async (user: any) => {
  const timestamp = new Date().toISOString();
  const tokenRef = db.collection("tokens").doc();
  const token = tokenRef.id;
  const userData = {
    email: user.email,
    id: user.uid,
    dateCreated: timestamp,
    emailVerified: user.emailVerified,
    providerId: user.providerData[0].providerId,
    status: ACCOUNT_STATUS.ACTIVE,
    tokens: [token],
    type: ACCOUNT_TYPE.CUSTOMER,
  };

  const tokenData = {
    dateCreated: timestamp,
    dateExpired: null,
    dateUpdated: timestamp,
    status: TOKEN_STATUS.ACTIVE,
    userId: user.uid,
    token,
  };

  await tokenRef.set(tokenData);
  return db.doc(`users/${user.uid}`).set(userData);
});

app.get("*/api/v1/moderateText", async (req: any, res: any) => {
  console.log("I am a log entry!", req);
  return res.status(200).send(JSON.stringify({ state: "approved" }));
});

app.post("*/api/v1/moderateText", async (req: any, res: any) => {
  const token = await checkToken(req, REQUEST_TYPE.TEXT);

  if (token.error) {
    console.log("I am a log entry!");
    return res.status(400).send(JSON.stringify(token.error));
  }

  await db.collection("logs").add({
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
  });

  return res.status(200).send(JSON.stringify({ state: "approved" }));
});

exports.getLogsByToken = functions.https.onCall(
  async (
    {
      token,
      offset = 0,
      limit = 20,
    }: {
      token: string;
      offset?: number;
      limit?: number;
    },
    context: CallableContext,
  ) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users allowed",
      );
    }

    const logsRef = db.collection("logs");
    const total = await logsRef.count().get();

    const query = logsRef
      .orderBy("time", "desc")
      .where("token", "==", token)
      .limit(limit)
      .offset(offset * limit);

    const logsSnap = await query.get();

    if (logsSnap.empty) {
      return null;
    }

    const logs: any[] = [];
    logsSnap.forEach((doc: any) => {
      logs.push(
        Object.assign(doc.data(), {
          id: doc.id,
        }),
      );
    });

    return {
      logs,
      total: total.data().count,
      offset,
    };
  },
);

exports.app = onRequest(app);
