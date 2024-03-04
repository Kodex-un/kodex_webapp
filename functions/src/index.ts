const functions = require("firebase-functions");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const {
  ACCOUNT_STATUS,
  ACCOUNT_TYPE,
  TOKEN_STATUS,
  REQUEST_TYPE,
  ErrorCode,
} = require("./config");
const { onRequest } = require("firebase-functions/v2/https");
const multer = require("multer");
const express = require("express");
const { getStorage } = require("firebase-admin/storage");
const bodyParser = require("body-parser");
const serviceAccount = require("../kodex-un-415118-6a00a782dabf.json");

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "kodex-un.appspot.com",
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
  const user = await db.doc(`users/${id}`).get();
  return user.data();
});

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

  console.log("_:102");

  await tokenRef.set(tokenData);
  return db.doc(`users/${user.uid}`).set(userData);
});

app.use(express.json());
app.post("*/api/v1/moderateText", async (req: any, res: any) => {
  const token = await checkToken(req, REQUEST_TYPE.TEXT);

  if (token.error) {
    return res.status(400).send(JSON.stringify(token.error));
  }

  const reqRef = await db.collection("logs").add({
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
    .send(JSON.stringify({ id: reqRef.id, token, body: req.body }));
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
