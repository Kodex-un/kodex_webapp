import styles from "./AnalyticsPage.module.scss";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const rangeData = [
  {
    month: "Feb",
    value: 3900,
  },
  {
    month: "Mar",
    value: 3000,
  },
  {
    month: "Apr",
    value: 4500,
  },
  {
    month: "May",
    value: 1200,
  },
  {
    month: "Jun",
    value: 1700,
  },
];

const AnalyticsPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.page__block}>
        <div className={styles.logsPage__header}>
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
        <div className={styles.page__content}>
          <h2 className={styles.page__block_title}>User Reports</h2>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart width={730} height={250} data={rangeData}>
              <XAxis axisLine={false} tickLine={false} dataKey="month" />
              <YAxis axisLine={false} tickLine={false} />
              <Area dataKey="value" stroke="#6A68CA" fill="#DEEBFF" />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={styles.page__block}>
        <div className={styles.logsPage__header}>
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
        <div className={styles.page__content}>
          <h2 className={styles.page__block_title}>Appeals</h2>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              width={730}
              height={250}
              data={rangeData}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <XAxis axisLine={false} tickLine={false} dataKey="month" />
              <YAxis axisLine={false} tickLine={false} />
              <Area dataKey="value" stroke="#6A68CA" fill="#DEEBFF" />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
