require("firebase-functions/logger/compat");
const { initializeApp, cert, getApps } = require("firebase-admin/app");
const creds = require("../kodex-un-415118-6a00a782dabf.json");

const apps = getApps();

if (apps.length === 0) {
  initializeApp({
    credential: cert(creds),
    storageBucket: "gs://kodex-un.appspot.com",
  });

  console.log("FUNCTIONS STARTED");
}

const { onRequest } = require("firebase-functions/v2/https");
const { server } = require("./server/server");

// exports.getUserById = require("./fns/get-user-by-id").getUserById;
// exports.getUserToken = require("./fns/get-user-token").getUserToken;
// exports.setTokenSettings = require("./fns/set-token-settings").setTokenSettings;
// exports.saveUserData = require("./fns/save-user-data").saveUserData;
// exports.getLogsByToken = require("./fns/get-logs-by-token").getLogsByToken;

exports.app = onRequest(server);
