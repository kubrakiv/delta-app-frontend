import React, { useContext } from "react";
import sidebarMenuItems from "./sidebarMenuItems";
import OpenContext from "../OpenContext";
import "./Sidebar.scss";
import SidebarItem from "./SidebarItem/SidebarItem";

const Sidebar = ({ children }) => {
    const { isSidebarOpen } = useContext(OpenContext);

    return (
        <div className="container-sidebar">
            <div
                style={{ width: isSidebarOpen ? "250px" : "50px" }}
                className="sidebar"
            >
                {sidebarMenuItems.map((item, index) => (
                    <SidebarItem
                        key={index}
                        item={item}
                        isSidebarOpen={isSidebarOpen}
                    />
                ))}
            </div>
            <main className="page__main">{children}</main>
        </div>
    );
};

export default Sidebar;
