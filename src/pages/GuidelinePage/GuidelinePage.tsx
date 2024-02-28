import styles from "./GuidelinePage.module.scss";
import Button from "@components/Button";
import classNames from "classnames";
import { useEffect, useState } from "react";
import FullPageComponent from "@components/FullPageComponent";
import Welcome from "@pages/GuidelinePage/intro/Welcome";
import Category from "@pages/GuidelinePage/intro/Category";
import Content from "@pages/GuidelinePage/intro/Content";
import Community from "@pages/GuidelinePage/intro/Community";

const rules = [
  {
    id: "age",
    name: "Age",
    value: 3,
    description:
      "In order to use our services, a person must be 13 years of age or older. If a person is between the ages of 13 and 17, they must get permission from their parent or guardian before using use our services.",
  },
  {
    id: "hateSpeech",
    name: "Hate Speech",
    value: 1,
    description:
      "We do not tolerate Talks, messages or other content that encourages violence, bullying, hatred or harm against an individual or a group of individuals on the basis of age, body type, disability, ethnicity, gender, intellect, race, religion or belief, sexual orientation or socioeconomic status. Any content deliberately degrading or humiliating other people or encouraging those actions will be removed.",
  },
  {
    id: "sex",
    name: "Sex",
    value: 2,
    description:
      "Text, voice, image, video, graphic or digitally-created descriptions containing: explicit, simulated, fictional, or implied sex or masturbation. This includes oral, anal, and vaginal sex, close-ups of fully-nude buttocks, touching of genitals or nipples in self or mutual masturbation, as well as sexual bodily fluids or sex toys. We do not tolerate broadcasting, uploading, soliciting, offering, advertisement and linking listed content as well as sexual services, including prostitution, escort services, sexual massages, and filmed sexual activity. The above concerns any human of any age and any gender.",
  },
  {
    id: "drugs",
    name: "Drugs",
    value: 3,
    description:
      "Zero tolerance to the content that encourages, glorifying or romanticising the illegal substance use or its distribution, inform on obtaining or manufacturing of drugs.",
  },
  {
    id: "fakeInformation",
    name: "Fake Information",
    value: 4,
    description:
      "Zero tolerance to the creation or dissemination of fake information, false news, or disinformation.",
  },
  {
    id: "intellectualProperty",
    name: "Intellectual Property",
    value: 5,
    description:
      "No use of content that is pirated or obtained from unauthorized private servers such as: мusic, movies, TV shows, or sports matches you do not own or do not have the rights to share, including streamed in the background.",
  },
];

const rulesMap = {
  1: "Allowed",
  2: "Moderated",
  3: "Controlled",
  4: "Prohibited",
  5: "Strictly Prohibited",
};

const getRuleValue = (rule) => {
  if (rule.id === "age") {
    return `${rule.value}+`;
  }
  return rulesMap[rule.value];
};

const GuidelinePage = () => {
  const [activeRuleId, setActiveRuleId] = useState("age");
  const [rule, setRule] = useState(null);
  const [activeRuleIndex, setActiveRuleIndex] = useState(null);
  const [introScreenIndex, setIntroScreenIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  const introScreens = [
    {
      element: <Welcome />,
    },
    {
      element: <Category onChange={() => {}} />,
    },
    {
      element: <Content onChange={() => {}} />,
    },
    {
      element: <Community onChange={() => {}} />,
    },
  ];

  const changeIntroPage = () => {
    const newIndex = introScreenIndex + 1;
    if (newIndex === introScreens.length) {
      setShowIntro(false);
    } else {
      setIntroScreenIndex(newIndex);
    }
  };

  useEffect(() => {
    setRule(rules.find((rule) => rule.id === activeRuleId));
  }, [activeRuleId]);

  return (
    <div className={styles.page}>
      <div className={styles.page__content}>
        <div className={styles.page__content_left}>
          {rules.map((rule, index) => {
            return (
              <div
                className={classNames(styles.rule, {
                  [styles.selected]: activeRuleId === rule.id,
                })}
                onClick={() => {
                  setActiveRuleId(rule.id);
                  setActiveRuleIndex(index);
                }}
              >
                <div className={styles.rule__button}>
                  {rule.name}: {getRuleValue(rule)}
                </div>
                <div className={styles.rule__div} />
              </div>
            );
          })}
        </div>
        <div className={styles.page__content_right}>
          {rule && (
            <div
              className={styles.info}
              style={{
                marginTop: -40 + activeRuleIndex * 60,
              }}
            >
              <div className={styles.info_head}>
                <div>{`${rule.name}: ${getRuleValue(rule)}`}</div>
                <Button onClick={() => {}} size={"small"}>
                  Change
                </Button>
              </div>
              <p className={styles.info_text}>{rule.description}</p>
            </div>
          )}
        </div>
      </div>
      {showIntro && (
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
      )}
    </div>
  );
};

export default GuidelinePage;
