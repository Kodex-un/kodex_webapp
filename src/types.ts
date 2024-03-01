export type SizeType = "small" | "medium" | "large";

export type LogITemStatusProgress = 1;
export type LogITemStatusApproved = 2;
export type LogITemStatusDeclined = 3;

export type Moderator = {
  id: string;
  name: string;
};

export type LogType = "approved" | "declined" | "progress";

export type LogItem = {
  id: string;
  time: string;
  code: string;
  type: LogType;
  transcription: string;
  status: LogITemStatusProgress | LogITemStatusApproved | LogITemStatusDeclined;
  moderator: Moderator;
};

export type LogsResponse = {
  logs: LogItem[];
  total: number;
  offset: number;
};

export type UserType = {
  id: string;
  dateCreated: string;
  dateUpdated: string;
  email: string;
  emailVerified: boolean;
  providerId: string;
  status: string;
  type: string;
  tokens: string[];
  name: string;
};
