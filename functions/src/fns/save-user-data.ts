import functions from "firebase-functions";
import { ACCOUNT_STATUS, ACCOUNT_TYPE, TOKEN_STATUS } from "../config";
import { getFirestore } from "firebase-admin/lib/firestore";

const db = getFirestore();

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
