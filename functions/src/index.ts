require("firebase-functions/logger/compat");
const { initializeApp } = require("firebase-admin/app");
initializeApp();

const { onRequest } = require("firebase-functions/v2/https");
const { server } = require("./server/server");

// exports.getUserById = require("./fns/get-user-by-id").getUserById;
// exports.getUserToken = require("./fns/get-user-token").getUserToken;
// exports.setTokenSettings = require("./fns/set-token-settings").setTokenSettings;
// exports.saveUserData = require("./fns/save-user-data").saveUserData;
// exports.getLogsByToken = require("./fns/get-logs-by-token").getLogsByToken;
//
exports.app = onRequest(server);
