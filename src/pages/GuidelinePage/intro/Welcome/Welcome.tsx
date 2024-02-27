import React from "react";
import styles from "./Welcome.module.scss";
import LogoIcon from "@components/icons/LogoIcon";
import Icon from "./Icon.png";

const Welcome = () => {
  return (
    <div>
      <div>
        <LogoIcon />
      </div>
      <div>Welcome to KODEX!</div>
      <div>
        <img src={Icon} />
        In the next few steps, we'll ask you a few questions to create perfect
        guidelines for your community. It won't take more than 5 minutes.
      </div>
    </div>
  );
};

export default Welcome;
