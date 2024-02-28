import React from "react";
import styles from "./Community.module.scss";
import LogoIcon from "@components/icons/LogoIcon";
import ReactSlider from "react-slider";
import classNames from "classnames";

const vibeMap = ["Relaxed", "Moderate", "Strict"];

const Track = (props, state) => {
  return (
    <div
      {...props}
      className={classNames({
        [styles.slider__track]: true,
        [styles[`slider__track_${state.index}`]]: true,
      })}
    ></div>
  );
};
const TrackSingle = (props, state) => {
  return (
    <div
      {...props}
      className={classNames({
        [styles.slider__track]: true,
        [styles.single]: true,
      })}
    ></div>
  );
};
const Thumb = (props, state, isSingle) => {
  return (
    <div
      {...props}
      className={classNames(
        styles.slider__thumb,
        isSingle && styles.slider__thumb__single,
      )}
    >
      <div className={styles.slider__thumb_value}>
        {isSingle ? vibeMap[state.valueNow] : state.valueNow}
      </div>
    </div>
  );
};

const Community = ({ onChange }) => {
  return (
    <div className={styles.page}>
      <div>
        <LogoIcon size={120} color={"#D9D9D9"} />
      </div>
      <div className={styles.text}>
        What best describes your community members?
      </div>
      <div className={styles.control}>
        <div className={styles.control__text}>Age group</div>
        <ReactSlider
          className={styles.slider}
          thumbClassName={styles.slider__thumb}
          trackClassName={styles.slider__track}
          defaultValue={[0, 100]}
          ariaLabel={["Leftmost thumb", "Rightmost thumb"]}
          renderThumb={Thumb}
          renderTrack={Track}
          pearling
          minDistance={10}
        />
      </div>
      <div className={styles.control}>
        <div className={styles.control__text}>Vibe</div>
        <ReactSlider
          className={styles.slider}
          min={0}
          max={vibeMap.length - 1}
          marks
          renderThumb={(props, state) => Thumb(props, state, true)}
          renderTrack={TrackSingle}
        />
      </div>
    </div>
  );
};

export default Community;
