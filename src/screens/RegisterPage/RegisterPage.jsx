import React from "react";

import "./RegisterPage.scss";

import RegisterFormComponent from "./RegisterFormComponent";

const RegisterPage = () => {
  return (
    <div className="background">
      <div className="passport-container">
        <RegisterFormComponent />
      </div>
    </div>
  );
};

export default RegisterPage;
