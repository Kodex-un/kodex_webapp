import { map } from "nanostores";
import { LogItem } from "@types";
const mock: LogItem[] = [
  {
    id: "222",
    time: new Date().toISOString(),
    code: "Hate",
    type: "User",
    transcription: "Take your shit off",
    status: 3,
    moderator: {
      id: "111",
      name: "mrWoody",
    },
  },
  {
    id: "223",
    time: new Date().toISOString(),
    code: "Hate",
    type: "Appeal",
    transcription: "Take your shit off",
    status: 1,
    moderator: {
      id: "111",
      name: "ML_Audio_123F22",
    },
  },
  {
    id: "224",
    time: new Date().toISOString(),
    code: "Sex",
    type: "User",
    transcription: "You’re orange skinned MFer",
    status: 2,
    moderator: {
      id: "111",
      name: "Jane",
    },
  },
  {
    id: "224",
    time: new Date().toISOString(),
    code: "Sex",
    type: "User",
    transcription: "You’re orange skinned MFer",
    status: 2,
    moderator: {
      id: "111",
      name: "Jane",
    },
  },
  {
    id: "224",
    time: new Date().toISOString(),
    code: "Sex",
    type: "User",
    transcription: "You’re orange skinned MFer",
    status: 2,
    moderator: {
      id: "111",
      name: "Jane",
    },
  },
  {
    id: "224",
    time: new Date().toISOString(),
    code: "Sex",
    type: "User",
    transcription: "You’re orange skinned MFer",
    status: 2,
    moderator: {
      id: "111",
      name: "Jane",
    },
  },
];

const $logs = map<LogItem[] | null>(mock);

export function fetchLogs() {
  return new Promise((resolve) => {
    setTimeout(() => {
      $logs.set([...$logs.value, ...mock]);
      resolve(true);
    }, 3000);
  });
}

export default $logs;
