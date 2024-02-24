import styles from "./TagComponent.module.scss";
import classNames from "classnames";

type TagProps = {
  children: string;
  type: "approved" | "declined" | "progress";
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
