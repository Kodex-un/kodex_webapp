import { map } from "nanostores";
import { LogsResponse } from "@types";
import { httpsCallable, getFunctions } from "firebase/functions";
import { LOGS_PER_PAGE } from "@config";
const functions = getFunctions();

const $logs = map<LogsResponse | null>(null);

export function fetchLogs(token: string, offset = 0, limit = LOGS_PER_PAGE) {
  const getLogsByToken = httpsCallable(functions, "getLogsByToken");
  return getLogsByToken({ token, offset, limit })
    .then((result) => {
      const logs: LogsResponse = result.data as LogsResponse;
      $logs.set(logs);
    })
    .catch((error) => console.log("fetchLogs_:14", error));
}

export default $logs;
