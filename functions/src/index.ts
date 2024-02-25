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
const { ACCOUNT_STATUS, ACCOUNT_TYPE, TOKEN_STATUS } = require("./config");
const { v4: uuidv4 } = require("uuid");

initializeApp();
const db = getFirestore();

export const saveUserData = functions.auth.user().onCreate(async (user) => {
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

  console.log("token", token, tokenData);

  await db.doc(`tokens/${token}`).set(tokenData);
  return db.doc(`users/${user.uid}`).set(userData);
});
