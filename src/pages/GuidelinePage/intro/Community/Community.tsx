import React from "react";
import styles from "./Community.module.scss";
import LogoIcon from "@components/icons/LogoIcon";

const Community = ({ onChange }) => {
  return (
    <div>
      <div>
        <LogoIcon />
      </div>
      <div>What best describes your community members?</div>
      <div>Age group Vibe</div>
    </div>
  );
};

export default Community;
