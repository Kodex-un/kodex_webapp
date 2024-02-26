import styles from "./GuidelinePage.module.scss";
import Button from "@components/Button";
import classNames from "classnames";
import { useEffect, useState } from "react";
import FullPageComponent from "@components/FullPageComponent";

const rules = [
  {
    id: "age",
    name: "Age",
    value: 3,
    description:
      "Age We do not tolerate Talks, messages or other content that encourages violence, bullying, hatred or harm against an individual or a group of individuals on the basis of age, body type, disability, ethnicity, gender, intellect, race, religion or belief, sexual orientation or socioeconomic status. Any content deliberately degrading or humiliating other people or encouraging those actions will be removed.",
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
      "Sex We do not tolerate Talks, messages or other content that encourages violence, bullying, hatred or harm against an individual or a group of individuals on the basis of age, body type, disability, ethnicity, gender, intellect, race, religion or belief, sexual orientation or socioeconomic status. Any content deliberately degrading or humiliating other people or encouraging those actions will be removed.",
  },
  {
    id: "drugs",
    name: "Drugs",
    value: 3,
    description:
      "Drugs We do not tolerate Talks, messages or other content that encourages violence, bullying, hatred or harm against an individual or a group of individuals on the basis of age, body type, disability, ethnicity, gender, intellect, race, religion or belief, sexual orientation or socioeconomic status. Any content deliberately degrading or humiliating other people or encouraging those actions will be removed.",
  },
  {
    id: "fakeInformation",
    name: "Fake Information",
    value: 4,
    description:
      "Fake Information We do not tolerate Talks, messages or other content that encourages violence, bullying, hatred or harm against an individual or a group of individuals on the basis of age, body type, disability, ethnicity, gender, intellect, race, religion or belief, sexual orientation or socioeconomic status. Any content deliberately degrading or humiliating other people or encouraging those actions will be removed.",
  },
  {
    id: "intellectualProperty",
    name: "Intellectual Property",
    value: 5,
    description:
      "intellectual Property We do not tolerate Talks, messages or other content that encourages violence, bullying, hatred or harm against an individual or a group of individuals on the basis of age, body type, disability, ethnicity, gender, intellect, race, religion or belief, sexual orientation or socioeconomic status. Any content deliberately degrading or humiliating other people or encouraging those actions will be removed.",
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
      <FullPageComponent>
        <div>What kind of content do you want to moderate?</div>
      </FullPageComponent>
    </div>
  );
};

export default GuidelinePage;
