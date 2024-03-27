export const ACCOUNT_STATUS = {
  ACTIVE: "active",
  HIDDEN: "hidden",
  DELETED: "deleted",
};

export const TOKEN_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

export const ACCOUNT_TYPE = {
  ADMIN: "admin",
  MODERATOR: "moderator",
  CUSTOMER: "customer",
};

export const ErrorCode = {
  TOKEN_NOT_FOUND: 100, // Not in our DB
  TOKEN_NOT_ACTIVE: 101, // Expired
  UNSUPPORTED_REQ_TYPE: 102, // User not alowed to handle one of or several REQUEST_TYPE
  TOKEN_NOT_PRESENTED: 103, // Not in the request
};

export const REQUEST_TYPE = {
  TEXT: "text",
  AUDIO: "audio",
  VIDEO: "video",
  IMAGE: "image",
};
