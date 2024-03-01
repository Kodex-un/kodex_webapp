/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const {
  ACCOUNT_STATUS,
  ACCOUNT_TYPE,
  TOKEN_STATUS,
  ErrorCode,
} = require("./config");
const { v4: uuidv4 } = require("uuid");
const { onRequest } = require("firebase-functions/v2/https");

const express = require("express");
const app = express();

initializeApp();
const db = getFirestore();

exports.getUserById = functions.https.onCall(async ({ id }: { id: string }) => {
  const user = await db.doc(`users/${id}`).get();
  return user.data();
});
exports.saveUserData = functions.auth.user().onCreate(async (user: any) => {
  const token = uuidv4();
  const timestamp = new Date().toISOString();
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
  };

  await db.doc(`tokens/${token}`).set(tokenData);
  return db.doc(`users/${user.uid}`).set(userData);
});

app.use(express.json());
app.post("*/api/v1/moderateText", async (req: any, res: any) => {
  const token = req.get("Authorization");
  if (!token) {
    return res.status(200).send(
      JSON.stringify({
        error: {
          code: ErrorCode.TOKEN_NOT_FOUND,
          message: "Token not found",
        },
      }),
    );
  }

  const savedTokenRef = await db.doc(`tokens/${token}`).get();
  const savedToken = savedTokenRef.data();

  if (savedToken.status !== "active") {
    return res.status(200).send(
      JSON.stringify({
        error: {
          code: ErrorCode.TOKEN_NOT_ACTIVE,
          message: "Token is not active",
        },
      }),
    );
  }

  await db.collection("logs").add({
    time: new Date().toISOString(),
    text: req.body.text,
    token,
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

  return res
    .status(200)
    .send(JSON.stringify({ savedToken: savedToken, token, body: req.body }));
});

exports.getLogsByToken = functions.https.onCall(
  async ({
    token,
    offset = 0,
    limit = 20,
  }: {
    token: string;
    offset?: number;
    limit?: number;
  }) => {
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
