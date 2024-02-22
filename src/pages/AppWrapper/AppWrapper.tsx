import "./AppWrapper.styles.scss";
import { Link, Outlet } from "react-router-dom";
import { useStore } from "@nanostores/react";
import $auth from "@stores/auth.ts";
import Login from "@pages/Login";
import LogoIcon from "@components/icons/LogoIcon";
import ArrowRightContainedIcon from "@components/icons/ArrowRightContained";

const AppWrapper = () => {
  const user = useStore($auth);

  if (user) {
    return (
      <div className="appWrapper">
        <div className="sidebar">
          <Link to="/" className="sidebar__logo">
            <LogoIcon size={55} />
            <div className="sidebar__logo_name">KODEX</div>
          </Link>
          <ul className="sidebar__list">
            <li className="sidebar__list_item">
              <Link className="sidebar__list_item_link" to="/logs">
                Log
              </Link>
            </li>
            <li className="sidebar__list_item selected">
              <Link className="sidebar__list_item_link" to="/guideline">
                Guideline
              </Link>
              <div className="sidebar__list_item_dot">
                <ArrowRightContainedIcon size={16} />
              </div>
            </li>
            <li className="sidebar__list_item">
              <Link className="sidebar__list_item_link" to="/analytics">
                Analytics
              </Link>
            </li>
            <li className="sidebar__list_item">
              <Link className="sidebar__list_item_link" to="/account">
                Account
              </Link>
            </li>
            <li className="sidebar__list_item">
              <Link className="sidebar__list_item_link" to="/api">
                API Doc
              </Link>
            </li>
            <li className="sidebar__list_item">
              <Link className="sidebar__list_item_link" to="/logout">
                Log Out
              </Link>
            </li>
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
