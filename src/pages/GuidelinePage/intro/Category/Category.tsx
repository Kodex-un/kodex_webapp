import { useEffect, useState } from "react";
import styles from "./Category.module.scss";
import LogoIcon from "@components/icons/LogoIcon";
import Gaming from "./gaming.png";
import Social from "./social.png";
import Community from "./community.png";

const Category = ({ onChange }: { onChange: (a: string) => void }) => {
  const [category, setCategory] = useState(null);
  useEffect(() => {
    onChange(category);
  }, [category]);
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
          <img alt={"Gaming"} src={Gaming} />
          <p>Gaming</p>
          <input
            onChange={() => setCategory("gaming")}
            name={"category"}
            type={"radio"}
          />
        </label>
        <label className={styles.controls__item}>
          <img alt={"Social"} src={Social} />
          <p>Social Media</p>
          <input
            onChange={() => setCategory("social_media")}
            name={"category"}
            type={"radio"}
          />
        </label>
        <label className={styles.controls__item}>
          <img alt={"Community"} src={Community} />
          <p>Community</p>
          <input
            onChange={() => setCategory("community")}
            name={"category"}
            type={"radio"}
          />
        </label>
      </div>
    </div>
  );
};

export default Category;
