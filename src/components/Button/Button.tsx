import styles from "./Button.module.scss";
import classNames from "classnames";
import { SizeType } from "@types";
import React from "react";

type ButtonProps = {
  type?: "login" | "primary" | "secondary";
  children?: string;
  icon?: React.ReactNode | string;
  size?: SizeType;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: false;
};

const Button = ({
  type = "primary",
  size = "medium",
  children,
  icon,
  onClick,
  isLoading = false,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
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
