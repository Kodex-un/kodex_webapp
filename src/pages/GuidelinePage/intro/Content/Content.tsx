import { useEffect, useState } from "react";
import styles from "./Content.module.scss";
import LogoIcon from "@components/icons/LogoIcon";
import Audio from "./images/audio.png";
import Image from "./images/image.png";
import Video from "./images/video.png";
import Text from "./images/text.png";

const Content = ({ onChange }: { onChange: (a: string[]) => void }) => {
  const [types, setTypes] = useState<Set<string>>(new Set());
  const handleChange = (type: string) => {
    if (types.has(type)) {
      types.delete(type);
    } else {
      types.add(type);
    }
    setTypes(new Set(types));
  };

  useEffect(() => {
    onChange(Array.from(types));
  }, [types]);

  return (
    <div className={styles.page}>
      <div>
        <LogoIcon size={120} color={"#D9D9D9"} />
      </div>
      <div className={styles.text}>
        What kind of content do you want to moderate?
      </div>
      <div className={styles.controls}>
        <label className={styles.controls__item}>
          <img alt={"Text"} src={Text} />
          <p className={styles.controls__item_text}>Text</p>
          <input
            type={"checkbox"}
            name={"content"}
            onChange={() => handleChange("text")}
          />
        </label>
        <label className={styles.controls__item}>
          <img alt={"Audio"} src={Audio} />
          <p className={styles.controls__item_text}>Audio</p>
          <input
            type={"checkbox"}
            name={"content"}
            onChange={() => handleChange("audio")}
          />
        </label>
        <label className={styles.controls__item}>
          <img alt={"Image"} src={Image} />
          <p className={styles.controls__item_text}>Photo</p>
          <input
            type={"checkbox"}
            name={"content"}
            onChange={() => handleChange("photo")}
          />
        </label>
        <label className={styles.controls__item}>
          <img alt={"Video"} src={Video} />
          <p className={styles.controls__item_text}>Video</p>
          <input
            type={"checkbox"}
            name={"content"}
            onChange={() => handleChange("video")}
          />
        </label>
      </div>
    </div>
  );
};

export default Content;
