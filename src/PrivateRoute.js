import React from "react";
import { useSelector } from "react-redux";

const PublicRoute = ({ component: Component, redirectTo = "" }) => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    return userInfo ? <div>PublicRoute</div> : Component;
};

export default PublicRoute;
