import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
    return (
        <header className="header">
            <div className="header-navbar">
                <div className="header-navbar__title">
                    <Link to="/">DELTA LOGISTICS SRO</Link>
                </div>
                <div className="header-navbar__login">
                    <Link to="/login">LOGIN</Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
