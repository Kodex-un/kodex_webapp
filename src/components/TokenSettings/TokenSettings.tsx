import { useState } from "react";
import styles from "./TokenSettings.module.scss";
import FullPageComponent from "@components/FullPageComponent";
import Button from "@components/Button";
import Welcome from "./intro/Welcome";
import Category from "./intro/Category";
import Content from "./intro/Content";
import Community from "./intro/Community";
import { $token, saveTokenSettings } from "@stores/auth.ts";
import { useStore } from "@nanostores/react";
import { CommunityType, SettingsType } from "@types";

const TokenSettings = () => {
  const token = useStore($token);
  const [introScreenIndex, setIntroScreenIndex] = useState(0);
  const [settings, setSettings] = useState<Map<string, SettingsType>>(
    new Map(),
  );

  const onUpdate = (key: string, value: SettingsType) => {
    settings.set(key, value);
    setSettings(new Map(settings));
  };

  const introScreens = [
    {
      element: <Welcome />,
    },
    {
      element: (
        <Category onChange={(data: string) => onUpdate("category", data)} />
      ),
    },
    {
      element: (
        <Content onChange={(data: string[]) => onUpdate("content", data)} />
      ),
    },
    {
      element: (
        <Community
          onChange={(data: CommunityType) => {
            onUpdate("community", data);
          }}
        />
      ),
    },
  ];

  const changeIntroPage = () => {
    const newIndex = introScreenIndex + 1;
    if (newIndex < introScreens.length) {
      setIntroScreenIndex(newIndex);
    } else {
      return saveTokenSettings(token.token, Object.fromEntries(settings));
    }
  };

  if (!token || token.rules) return null;

  return (
    <FullPageComponent>
      <div className={styles.fullPage}>
        {introScreens[introScreenIndex].element}
        <Button type={"secondary"} onClick={changeIntroPage}>
          {introScreenIndex < introScreens.length - 1
            ? `Continue (${introScreenIndex + 1}/${introScreens.length})`
            : "Done"}
        </Button>
      </div>
    </FullPageComponent>
  );
};

export default TokenSettings;
