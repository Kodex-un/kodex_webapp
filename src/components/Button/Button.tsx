import styles from "./Button.module.scss";
import classNames from "classnames";

type ButtonProps = {
  type?: "login" | "primary" | "secondary";
  children?: string;
  icon?: string;
  size?: "small" | "medium" | "large";
  onClick: () => void;
  isLoading: boolean;
};

const Button = ({
  type = "primary",
  size = "medium",
  children,
  icon,
  onClick,
  isLoading = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        styles.buttonComponent,
        styles[`buttonComponent__type_${type}`],
        styles[`buttonComponent__size_${size}`],
      )}
    >
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
