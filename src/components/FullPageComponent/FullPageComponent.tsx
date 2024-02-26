import React from "react";
import styles from "./FullPageComponent.module.scss";

const FullPageComponent = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.page}>{children}</div>;
};

export default FullPageComponent;
