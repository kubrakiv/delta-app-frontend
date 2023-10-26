import React, { useState } from "react";
import {
    FaTh,
    FaBars,
    FaCalendarWeek,
    FaTruckMoving,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaTasks,
    FaThList,
    FaPlus,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItems = [
        {
            path: "/",
            name: "My Company",
            icon: <FaTruckMoving />,
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaTh />,
        },
        {
            path: "/plan",
            name: "Weekly Planner",
            icon: <FaCalendarWeek />,
        },
        {
            path: "/plan-test",
            name: "Weekly Planner (test)",
            icon: <FaCalendarWeek />,
        },
        {
            path: "/orders",
            name: "Orders",
            icon: <FaThList />,
        },
        {
            path: "/tasks",
            name: "Tasks",
            icon: <FaTasks />,
        },
        {
            path: "/tasks/add",
            name: "Add Task",
            icon: <FaPlus />,
        },
    ];

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
                {menuItems.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className="link"
                        activeClassName="active-sidebar"
                    >
                        <div className="icon">{item.icon}</div>
                        <div
                            style={{ display: isOpen ? "block" : "none" }}
                            className="link_text"
                        >
                            {item.name}
                        </div>
                    </NavLink>
                ))}
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
