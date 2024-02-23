import "./AppWrapper.styles.scss";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useStore } from "@nanostores/react";
import $auth from "@stores/auth.ts";
import Login from "@pages/Login";
import LogoIcon from "@components/icons/LogoIcon";
import ArrowRightContainedIcon from "@components/icons/ArrowRightContained";

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
  },
];

const AppWrapper = () => {
  const user = useStore($auth);
  const { pathname } = useLocation();
  if (user) {
    return (
      <div className="appWrapper">
        <div className="sidebar">
          <Link to="/" className="sidebar__logo">
            <LogoIcon size={55} />
            <div className="sidebar__logo_name">KODEX</div>
          </Link>
          <ul className="sidebar__list">
            {sidebarLinks.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li className={`sidebar__list_item ${isActive && "selected"}`}>
                  <Link className="sidebar__list_item_link" to={item.path}>
                    {item.name}
                  </Link>
                  {isActive && (
                    <div className="sidebar__list_item_dot">
                      <ArrowRightContainedIcon size={16} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }

  return <Login />;
};

export default AppWrapper;
