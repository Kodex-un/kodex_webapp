import styles from "./TagComponent.module.scss";
import classNames from "classnames";
import { LogType } from "@types";

type TagProps = {
  children: string;
  type: LogType;
  size: "small" | "medium" | "large";
};

const TagComponent = ({
  children,
  type = "approved",
  size = "medium",
}: TagProps) => {
  return (
    <div
      className={classNames(
        styles.tag,
        styles[`tag__type_${type}`],
        styles[`tag__size_${size}`],
      )}
    >
      {children}
    </div>
  );
};

export default TagComponent;
