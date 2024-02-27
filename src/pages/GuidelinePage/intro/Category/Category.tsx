import React from "react";
import styles from "./Category.module.scss";
import LogoIcon from "@components/icons/LogoIcon";
import Icon from "@pages/GuidelinePage/intro/Welcome/Icon.png";

const Category = ({ onChange }) => {
  return (
    <div>
      <div>
        <LogoIcon />
      </div>
      <div>What category does your product belong to?</div>
      <div>Gaming Social Media Community</div>
    </div>
  );
};

export default Category;
