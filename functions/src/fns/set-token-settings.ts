import functions from "firebase-functions";
import { CallableContext } from "firebase-functions/lib/common/providers/https";
import { getFirestore } from "firebase-admin/lib/firestore";

const db = getFirestore();

exports.setTokenSettings = functions.https.onCall(
  async (
    { tokenId, settings }: { tokenId: string; settings: any },
    context: CallableContext,
  ) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users allowed",
      );
    }

    const rules = {
      drugs: 0,
      age: settings.community.age,
      fakeInformation: 0,
      hateSpeech: 0,
      intellectualProperty: 0,
      sex: 0,
    };

    const tokenRef = db.doc(`tokens/${tokenId}`);
    return tokenRef
      .update({ rules })
      .then(() => true)
      .catch((error) => {
        console.error("ERROR in setTokenSettings", error);
        return false;
      });
  },
);
