import React from "react";
import styles from "./Content.module.scss";
import LogoIcon from "@components/icons/LogoIcon";
import Icon from "@pages/GuidelinePage/intro/Welcome/Icon.png";

const Content = ({ onChange }) => {
  return (
    <div>
      <div>
        <LogoIcon />
      </div>
      <div>What kind of content do you want to moderate?</div>
      <div>Text Audio Photo Video</div>
    </div>
  );
};

export default Content;
