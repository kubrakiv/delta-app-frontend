import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Header.scss";
import { logout } from "../../actions/userActions";

import OpenContext from "../OpenContext";

function Header() {
  const { toggleSidebar } = useContext(OpenContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-navbar">
        <div className="top-section-header" onClick={toggleSidebar}>
          <FaBars />
        </div>
        <div className="header-navbar__title">
          <Link to="/start">DELTA APP</Link>
        </div>

        {userInfo ? (
          // TODO: add dropdown menu for profile and logout
          <>
            <div className="header-navbar__user">
              <Link to="/profile">{userInfo.full_name}</Link>
            </div>
            <div className="header-navbar__logout-btn" onClick={logoutHandler}>
              <span>Вийти</span>
            </div>
          </>
        ) : (
          <div className="header-navbar__login">
            <Link to="/login">LOGIN</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
