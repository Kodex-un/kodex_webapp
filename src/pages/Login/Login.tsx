import "./Login.styles.scss";
import Button from "@components/Button";
import LogoIcon from "@components/icons/LogoIcon";
import { googleLogin } from "@utils/google.ts";

const Login = () => {
  return (
    <div className="page loginPage">
      <div className="loginPage__logo">
        <LogoIcon size={65} />
        KODEX
      </div>
      <div className="loginPage__container">
        <p className="loginPage__container_title">
          <b>Login</b> and level up your community vibe!
        </p>
        <Button onClick={googleLogin} type="login" text={"Google"} />
      </div>
    </div>
  );
};

export default Login;
