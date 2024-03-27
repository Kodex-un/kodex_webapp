const functions = require("firebase-functions");
const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();

exports.getUserToken = functions.https.onCall(
  async ({ tokenId }: { tokenId: string }, context: any) => {
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
