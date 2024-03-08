import React from "react";
import styles from "./Welcome.module.scss";
import LogoIcon from "@components/icons/LogoIcon";
import Icon from "./Icon.png";

const Welcome = () => {
  return (
    <div className={styles.page}>
      <LogoIcon size={120} color={"#D9D9D9"} />
      <div className={styles.page__title}>
        Welcome to <div className={styles.page__title_name}>KODEX!</div>
      </div>
      <div className={styles.page__content}>
        <img src={Icon} width={95} height={95} />
        <p>
          In the next few steps, we'll ask you a few questions to create perfect
          guidelines for your community. It won't take more than 5 minutes.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
