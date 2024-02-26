import styles from "./APIDocPage.module.scss";
import { Link } from "react-router-dom";
import CopyIcon from "@components/icons/CopyIcon";

const APIDocPage = () => {
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(
        "POST /moderateText\n" +
          "Headers: {\n" +
          "  Authorization: Api-Key {Your-API-Key}\n" +
          "}\n" +
          "Body: {\n" +
          '  "text": "Example text to moderate"\n' +
          "}\n",
      );
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <div className={styles.page}>
      <h1 className={styles.page__title}>Contents</h1>
      <ul>
        <li>
          <a>Text Moderation</a>
        </li>
        <li>
          <a>Audio Moderation</a>
        </li>
        <li>
          <a>Photo Moderation</a>
        </li>
        <li>
          <a>Video Moderation</a>
        </li>
      </ul>

      <h1 className={styles.page__title}>Text Moderation</h1>
      <p className={styles.page__text}>
        Our Text Moderation API helps you automatically flag and filter
        inappropriate content in user-generated text, maintaining the integrity
        and safety of your online community.
      </p>

      <h3 className={styles.page__subtitle}>Authentication</h3>
      <p className={styles.page__text}>
        Access to the Text Moderation API requires an API key for
        authentication. Go to <Link to={"/account"}>Account</Link> section to
        find your API key. Include your API key in the header of every request:
        Authorization: <strong>Api-Key &#123;*****&#125;</strong>
      </p>

      <ul className={styles.page__list}>
        <li className={styles.page__list_item}>Endpoint: /moderateText</li>
        <li className={styles.page__list_item}>Method: POST</li>
        <li className={styles.page__list_item}>
          Request Body: &#123; "text": "string" &#125;
        </li>
        <li className={styles.page__list_item}>
          Response: &#123;isAppropriate": boolean, "moderationScore": number
          &#125;
        </li>
        <li className={styles.page__list_item}>
          Example Request:
          <div>
            <code className={styles.page__code}>
              <div className={styles.page__code_copyIcon} onClick={copyContent}>
                <CopyIcon />
              </div>
              POST /moderateText
              <br />
              Headers: &#123;
              <br />
              &nbsp;&nbsp;Authorization: Api-Key &#123;Your-API-Key&#125;
              <br />
              &#125;
              <br />
              Body: &#123;
              <br />
              &nbsp;&nbsp;"text": "Example text to moderate"
              <br />
              &#125;
            </code>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default APIDocPage;
