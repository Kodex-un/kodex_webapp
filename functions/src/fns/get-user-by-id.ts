import functions from "firebase-functions";
import { CallableContext } from "firebase-functions/lib/common/providers/https";
import { getFirestore } from "firebase-admin/lib/firestore";

const db = getFirestore();

exports.getUserById = functions.https.onCall(
  async ({ id }: { id: string }, context: CallableContext) => {
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
