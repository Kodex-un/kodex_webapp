import styles from "./InputComponent.module.scss";
import classNames from "classnames";
import { SizeType } from "@types";
import { useState } from "react";
import EyeIcon from "@components/icons/EyeIcon";

type InputProps = {
  size?: SizeType;
  value?: string | number;
  type?: "text" | "password";
  placeholder?: string;
  secured?: boolean;
  disabled?: boolean;
  width?: number;
};

const InputComponent = ({
  type = "text",
  placeholder,
  size = "medium",
  value,
  secured = false,
  disabled = false,
  width,
}: InputProps) => {
  const [isHide, setHide] = useState(secured);
  const handleClick = () => {
    if (secured) {
      setHide(!isHide);
    }
  };
  const getIcon = () => {
    if (secured) {
      return (
        <div className={styles.iconContainer} onClick={handleClick}>
          <EyeIcon closed={isHide} />
        </div>
      );
    }

    return null;
  };

  return (
    <div className={styles.inputContainer}>
      <input
        disabled={secured || disabled}
        placeholder={placeholder}
        value={value}
        type={isHide ? "password" : type}
        onChange={() => {}}
        className={classNames(styles.input, styles[`input__size_${size}`], {
          [styles.icon]: secured,
        })}
        style={{
          width,
        }}
      />
      {getIcon()}
    </div>
  );
};

export default InputComponent;
