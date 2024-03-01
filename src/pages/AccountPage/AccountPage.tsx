import styles from "./AccountPage.module.scss";
import { $user } from "@stores/auth.ts";
import { useStore } from "@nanostores/react";
import parseDate from "@utils/date-parse.ts";
import InputComponent from "@components/InputComponent";
import VerifiedIcon from "@components/icons/VerifiedIcon";

const AccountPage = () => {
  const user = useStore($user);

  if (!user) return null;
  const time = parseDate(user.dateCreated).format("DD/MM/YYYY");
  return (
    <div className={styles.page}>
      <div>
        <strong>Registered:</strong> {time}
      </div>
      <div className={styles.email}>
        <strong>Email:</strong> {user.email}{" "}
        <VerifiedIcon verified={user.emailVerified} />
      </div>
      <div>
        <strong>API-Key:</strong>
        {user.tokens.map((token) => (
          <InputComponent value={token} secured={true} width={400} />
        ))}
      </div>
    </div>
  );
};

export default AccountPage;
