import React from "react";
import "./MainPage.scss";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    };
    return (
        <>
            <div className="background">
                <h2 className="title">WELCOME TO DELTA APP</h2>
                <button className="enter-button" onClick={handleLogin}>
                    Вхід
                </button>
            </div>
        </>
    );
};

export default MainPage;
