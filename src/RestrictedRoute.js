import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const RestrictedRoute = ({ component: Component, redirectTo }) => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    return userInfo ? <Navigate to={redirectTo} /> : Component;
};
