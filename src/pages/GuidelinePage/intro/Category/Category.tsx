import React from "react";
import styles from "./Category.module.scss";
import LogoIcon from "@components/icons/LogoIcon";
import Gaming from "./gaming.png";
import Social from "./social.png";
import Community from "./community.png";

const Category = ({ onChange }) => {
  return (
    <div className={styles.page}>
      <div>
        <LogoIcon size={120} color={"#D9D9D9"} />
      </div>
      <div className={styles.text}>
        What category does your product belong to?
      </div>
      <div className={styles.controls}>
        <label className={styles.controls__item}>
          <img src={Gaming} />
          <p>Gaming</p>
          <input type={"checkbox"} />
        </label>
        <label className={styles.controls__item}>
          <img src={Social} />
          <p>Social Media</p>
          <input type={"checkbox"} />
        </label>
        <label className={styles.controls__item}>
          <img src={Community} />
          <p>Community</p>
          <input type={"checkbox"} />
        </label>
      </div>
    </div>
  );
};

export default Category;
