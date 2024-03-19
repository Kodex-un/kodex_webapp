const { ErrorCode } = require("../config");
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

const checkToken = async (req: any, reqType: string) => {
  const token = req.get("Authorization");
  if (!token) {
    return {
      error: {
        code: ErrorCode.TOKEN_NOT_PRESENTED,
        message: "Token not found in this request",
      },
    };
  }

  const savedTokenSnap = await db.doc(`tokens/${token}`).get();

  if (!savedTokenSnap.exists) {
    return {
      error: {
        code: ErrorCode.TOKEN_NOT_FOUND,
        message: "Token not found",
      },
    };
  }

  const savedToken = savedTokenSnap.data();

  if (!savedToken) {
    return {
      error: {
        code: ErrorCode.TOKEN_NOT_FOUND,
        message: "Token not found",
      },
    };
  }

  if (savedToken.status !== "active") {
    return {
      error: {
        code: ErrorCode.TOKEN_NOT_ACTIVE,
        message: "Token is not active",
      },
    };
  }

  if (Array.isArray(savedToken.types) && !savedToken.types.includes(reqType)) {
    return {
      error: {
        code: ErrorCode.UNSUPPORTED_REQ_TYPE,
        message: `Token is not support this request type: ${reqType}`,
      },
    };
  }

  return Object.assign(savedToken, { token });
};

exports.checkToken = checkToken;
