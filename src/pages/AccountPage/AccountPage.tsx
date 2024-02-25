import React, { useEffect } from "react";
import "./AccountPage.styles.scss";
import { fetchUser, $user } from "@stores/auth.ts";
import { useStore } from "@nanostores/react";
import parseDate from "@utils/date-parse.ts";

const AccountPage = () => {
  const user = useStore($user);
  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return null;
  const time = parseDate(user.dateCreated).format("DD/MM/YYYY");
  return (
    <div>
      <div>
        <strong>Registered:</strong> {time}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>Email verified: {user.emailVerified ? "true" : "false"}</div>
      <div>login provider: {user.providerId}</div>
      <div>status: {user.status}</div>
      <div>type: {user.type}</div>
      <div>
        <strong>API-Key:</strong>
        {user.tokens.map((token) => (
          <input type="text" value={token} />
        ))}
      </div>
    </div>
  );
};

export default AccountPage;
