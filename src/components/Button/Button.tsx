import "./Button.styles.scss";

type ButtonProps = {
  type?: "login" | "primary" | "secondary";
  text?: string;
  icon?: string;
};

const Button = ({ type, text, icon }: ButtonProps) => {
  return (
    <button className={`buttonComponent buttonComponent__type_${type}`}>
      {icon}
      {text}
    </button>
  );
};

export default Button;
