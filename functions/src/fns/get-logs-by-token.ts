import functions from "firebase-functions";
import { CallableContext } from "firebase-functions/lib/common/providers/https";
import { getFirestore } from "firebase-admin/lib/firestore";

const db = getFirestore();

exports.getLogsByToken = functions.https.onCall(
  async (
    {
      token,
      offset = 0,
      limit = 20,
    }: {
      token: string;
      offset?: number;
      limit?: number;
    },
    context: CallableContext,
  ) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users allowed",
      );
    }

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
