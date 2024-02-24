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
