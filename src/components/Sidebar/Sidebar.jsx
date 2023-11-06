import React, { useState } from "react";
import menuItems from "./menuItems";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Sidebar.scss";

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="container-sidebar">
            <div
                style={{ width: isOpen ? "250px" : "50px" }}
                className="sidebar"
            >
                <div className="top_section">
                    <h1
                        style={{ display: isOpen ? "block" : "none" }}
                        className="logo"
                    >
                        DeltaApp
                    </h1>
                    <div
                        style={{ marginLeft: isOpen ? "50px" : "0px" }}
                        className="bars"
                    >
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {menuItems.map((item, index) =>
                    item.children ? (
                        <div className="dropdown" key={index}>
                            <div className="icon">{item.icon}</div>
                            <div className="link_text">{item.name}</div>
                            <div className="dropdown-content">
                                {item.children.map((child, childIndex) => (
                                    <NavLink
                                        to={child.path}
                                        key={childIndex}
                                        className="link"
                                    >
                                        {child.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <NavLink to={item.path} key={index} className="link">
                            <div className="icon">{item.icon}</div>
                            <div
                                style={{
                                    display: isOpen ? "block" : "none",
                                }}
                                className="link_text"
                            >
                                {item.name}
                            </div>
                        </NavLink>
                    )
                )}
            </div>
            <main className="page__main">{children}</main>
        </div>
    );
};

export default Sidebar;
