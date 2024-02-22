import "./Button.styles.scss";

type ButtonProps = {
  type?: "login" | "primary" | "secondary";
  text?: string;
  icon?: string;
  onClick: () => void;
};

const Button = ({ type, text, icon, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`buttonComponent buttonComponent__type_${type}`}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
