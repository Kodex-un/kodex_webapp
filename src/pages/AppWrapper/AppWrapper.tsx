import styles from "./AppWrapper.module.scss";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useStore } from "@nanostores/react";
import $auth, { fetchUser, logOut, $user } from "@stores/auth.ts";
import Login from "@pages/Login";
import LogoIcon from "@components/icons/LogoIcon";
import ArrowRightContainedIcon from "@components/icons/ArrowRightContained";
import { useEffect } from "react";
import TokenSettings from "@components/TokenSettings";

const sidebarLinks = [
  {
    path: "/logs",
    name: "Logs",
  },
  {
    path: "/guideline",
    name: "Guideline",
  },
  {
    path: "/analytics",
    name: "Analytics",
  },
  {
    path: "/account",
    name: "Account",
  },
  {
    path: "/api",
    name: "API Doc",
  },
  {
    path: "/logout",
    name: "Log Out",
    action: logOut,
  },
];

const AppWrapper = () => {
  const auth = useStore($auth);
  const user = useStore($user);
  useEffect(() => {
    if (auth && auth.uid) {
      fetchUser(auth.uid);
    }
  }, [auth]);

  const { pathname } = useLocation();
  if (user) {
    return (
      <div className={styles.appWrapper}>
        <div className={styles.sidebar}>
          <Link to="/" className={styles.sidebar__logo}>
            <LogoIcon size={55} />
            <div className={styles.sidebar__logo_name}>KODEX</div>
          </Link>
          <ul className={styles.sidebar__list}>
            {sidebarLinks.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li
                  key={item.path}
                  className={`${styles.sidebar__list_item} ${isActive && styles.selected}`}
                >
                  {item.action ? (
                    <a
                      href={"/"}
                      onClick={item.action}
                      className={styles.sidebar__list_item_link}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      className={styles.sidebar__list_item_link}
                      to={item.path}
                    >
                      {item.name}
                    </Link>
                  )}
                  {isActive && (
                    <div className={styles.sidebar__list_item_dot}>
                      <ArrowRightContainedIcon size={16} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
        <TokenSettings />
      </div>
    );
  }

  return <Login />;
};

export default AppWrapper;
