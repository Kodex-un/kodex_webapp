export type LogITemStatusProgress = 1;
export type LogITemStatusApproved = 2;
export type LogITemStatusDeclined = 3;

export type Moderator = {
  id: string;
  name: string;
};

export type LogItem = {
  id: string;
  time: string;
  code: string;
  type: string;
  transcription: string;
  status: LogITemStatusProgress | LogITemStatusApproved | LogITemStatusDeclined;
  moderator: Moderator;
};
