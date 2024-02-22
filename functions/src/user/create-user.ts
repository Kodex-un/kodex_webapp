import { ACCOUNT_STATUS } from "../../../src/config";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { saveUser } = require("./search-users");
const firestore = admin.firestore();

exports.createUser = functions.auth.user().onCreate(async (user) => {
  console.log("USER SIGNED", user);
  let userpic = user.photoURL;

  const userData = {
    name: user.displayName,
    email: user.email,
    phone: user.phoneNumber,
    image: userpic,
    id: user.uid,
    dateCreated: Date.now(),
    description: null,
    emailVerified: user.emailVerified,
    providerId: user.providerData[0].providerId,
    status: ACCOUNT_STATUS.ACTIVE,
  };

  saveUser(userData)
    .then(() => {
      console.log("User was saved in Algolia");
      return true;
    })
    .catch((error) => {
      console.log("User was saved in Algolia wit error ", error);
    });

  // store in firestore
  return await firestore.collection("users").doc(user.uid).set(userData);
});
