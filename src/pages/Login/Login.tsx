import "./Login.styles.scss";
import Button from "@components/Button";
import LogoIcon from "@components/icons/LogoIcon";
import { googleLogin } from "@utils/google.ts";
import GoogleLogoIcon from "@components/icons/GoogleLogoIcon";
import MetaMaskLogoIcon from "@components/icons/MetaMaskLogoIcon";

const Login = () => {
  return (
    <div className="loginPage">
      <div className="loginPage__logo">
        <LogoIcon size={85} />
        KODEX
      </div>
      <div className="loginPage__container">
        <p className="loginPage__container_title">
          <b>Login</b> and
          <br />
          level up your community vibe!
        </p>
        <div className={"loginPage__controls"}>
          <Button onClick={googleLogin} type="login" icon={<GoogleLogoIcon />}>
            Google
          </Button>
          <Button
            onClick={googleLogin}
            type="login"
            icon={<MetaMaskLogoIcon />}
          >
            MetaMask
          </Button>
          <p className="other">Other</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
