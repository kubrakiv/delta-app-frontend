import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import "./LoginPage.scss";
import toast from "react-hot-toast";
import InputComponent from "../../globalComponents/InputComponent";
import MessageComponent from "../../components/MessageComponent/MessageComponent";

const USER_CONSTANTS = {
  EMAIL: "email",
  PASSWORD: "password",
};

const { EMAIL, PASSWORD } = USER_CONSTANTS;

const LoginPage = () => {
  const [message, setMessage] = useState("");
  const [isFilled, setIsFilled] = useState(false);
  const [userFields, setUserFields] = useState(
    Object.values(USER_CONSTANTS).reduce((acc, item) => {
      acc[item] = "";
      return acc;
    }, {})
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  //   const redirect = location.search ? location.search.split("=")[1] : "/start";
  const redirect = location.state?.from?.pathname || "/start";

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;

  useEffect(() => {
    const notify = () => {
      toast.error(error, {
        position: "top-right",
        style: { color: "black", marginTop: "0rem" },
      });
    };

    if (userInfo) {
      navigate(redirect);
    } else if (error) {
      navigate("/login");
      notify();
    }
  }, [navigate, userInfo, redirect, error]);

  const handleSumbitLoginForm = (e) => {
    e.preventDefault();
    let dataToUpdate = {};
    Object.keys(userFields).forEach((key) => {
      dataToUpdate[key] = userFields[key];
    });
    if (dataToUpdate.email && dataToUpdate.password) {
      dispatch(login(dataToUpdate.email, dataToUpdate.password));
    }
    if (dataToUpdate.email || dataToUpdate.password) {
      setMessage(`Введіть коректний логін та пароль!`);
      setIsFilled(true);
      return;
    }
  };

  const formFields = [
    {
      id: EMAIL,
      placeholder: "Введіть логін",
      label: "Логін/Email",
      type: "text",
    },
    {
      id: PASSWORD,
      placeholder: "Введіть пароль",
      label: "Пароль",
      type: "password",
    },
  ];

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="background">
        <div className="passport-container">
          <div className="login-form-container">
            {isFilled && (
              <MessageComponent color={"red"}>{message}</MessageComponent>
            )}
            <form
              className="login-form"
              onSubmit={(e) => handleSumbitLoginForm(e)}
            >
              <h2 className="login-form__title">Вхід до системи</h2>
              {
                <div className="login-form">
                  {formFields.map((field) => (
                    <InputComponent
                      key={field.id}
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      label={field.label}
                      value={userFields[field.id]}
                      onChange={(e) => handleUserDataChange(e)}
                    />
                  ))}
                </div>
              }
              <button className="login-enter-btn" type="submit">
                Увійти
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
