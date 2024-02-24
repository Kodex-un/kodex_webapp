import styles from "./LogPage.module.scss";
import TagComponent from "@components/TagComponent";
import Button from "@components/Button";
import classNames from "classnames";
import SoundIcon from "@components/icons/SoundIcon";
import parseDate from "@utils/date-parse.ts";
import { LOG_ITEM_STATUS } from "@config";
import { useStore } from "@nanostores/react";
import $logs, { fetchLogs } from "@stores/logs.ts";
import { useState } from "react";
import { LogType } from "@types";

const logStatusMap: { [a: number]: LogType } = {
  [LOG_ITEM_STATUS.APPROVED]: "approved",
  [LOG_ITEM_STATUS.DECLINED]: "declined",
  [LOG_ITEM_STATUS.PROGRESS]: "progress",
};

const LogPage = () => {
  const logs = useStore($logs);
  const [isLoading, setLoading] = useState(false);
  const loadMore = () => {
    setLoading(true);
    fetchLogs().finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className={styles.logsPage}>
      <div className={styles.logsPage__header}>
        <div className={styles.logsPage__header_tabs}>
          <div className={styles.logsPage__header_tabs_tab}>Reports (3)</div>
        </div>
        <div className={styles.logsPage__header_filters}>
          <div className={styles.logsPage__header_dateRange}>
            Feb 2016 - Jul 2016
          </div>
          <div className={styles.logsPage__header_group}>Daily</div>
          <div className={styles.logsPage__header_group}>Weekly</div>
          <div
            className={`${styles.logsPage__header_group} ${styles.selected}`}
          >
            Monthly
          </div>
        </div>
      </div>
      <div className={styles.logsPage__content}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.table__th}>Time</th>
              <th
                className={classNames(styles.table__th, styles.table__th_code)}
              >
                Code
              </th>
              <th className={styles.table__th}>Report Type</th>
              <th className={styles.table__th}>Transcription</th>
              <th
                className={classNames(
                  styles.table__th,
                  styles.table__th_content,
                )}
              >
                Content
              </th>
              <th className={styles.table__th}>State</th>
              <th className={styles.table__th} colSpan={2}>
                Moderator
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => {
              return (
                <tr key={log.id}>
                  <td
                    className={`${styles.table__cell} ${styles.table__cell_time}`}
                  >
                    {parseDate(log.time).format("HH:MM")}
                  </td>
                  <td
                    className={`${styles.table__cell} ${styles.table__cell_code}`}
                  >
                    {log.code}
                  </td>
                  <td
                    className={`${styles.table__cell} ${styles.table__cell_reportType}`}
                  >
                    {log.type}
                  </td>
                  <td
                    className={`${styles.table__cell} ${styles.table__cell_transcription}`}
                  >
                    {log.transcription}
                  </td>
                  <td
                    className={`${styles.table__cell} ${styles.table__cell_content}`}
                  >
                    <SoundIcon />
                  </td>
                  <td
                    className={`${styles.table__cell} ${styles.table__cell_status}`}
                  >
                    <TagComponent
                      type={logStatusMap[log.status]}
                      size={"medium"}
                    >
                      Declined
                    </TagComponent>
                  </td>
                  <td
                    className={`${styles.table__cell} ${styles.table__cell_moderator}`}
                  >
                    {log.moderator.name}
                  </td>
                  <td
                    className={`${styles.table__cell} ${styles.table__cell_action}`}
                  >
                    <Button
                      onClick={() => {
                        console.log("_:126", log.id);
                      }}
                    >
                      Report Error
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className={styles.logsPage__footer}>
          <Button onClick={loadMore} isLoading={isLoading}>
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogPage;
