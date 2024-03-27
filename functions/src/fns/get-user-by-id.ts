const functions = require("firebase-functions");
const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();

exports.getUserById = functions.https.onCall(
  async ({ id }: { id: string }, context: any) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users allowed",
      );
    }

    const user = await db.doc(`users/${id}`).get();
    return user.data();
  },
);
