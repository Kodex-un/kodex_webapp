import "./AppWrapper.styles.scss";
import { Outlet } from "react-router-dom";
import { useStore } from "@nanostores/react";
import $auth from "@stores/auth.ts";
import Login from "@pages/Login";

const AppWrapper = () => {
  const user = useStore($auth);
  if (user) {
    return (
      <div>
        <div>SIDEBAR</div>
        <div>
          <Outlet />
        </div>
      </div>
    );
  }

  return <Login />;
};

export default AppWrapper;
