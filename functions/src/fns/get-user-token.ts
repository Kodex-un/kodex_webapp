import functions from "firebase-functions";
import { CallableContext } from "firebase-functions/lib/common/providers/https";
import { getFirestore } from "firebase-admin/lib/firestore";

const db = getFirestore();

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
