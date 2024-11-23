import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";

import toast from "react-hot-toast";

import InputComponent from "../../globalComponents/InputComponent";
import MessageComponent from "../../components/MessageComponent/MessageComponent";

import "./LoginPage.scss";

import { formFields } from "./loginFormFields";
import { USER_CONSTANTS } from "../../constants/global";

const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.state?.from?.pathname || "/start";

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;

  const [message, setMessage] = useState("");
  const [isFilled, setIsFilled] = useState(false);

  const [userFields, setUserFields] = useState(
    Object.values(USER_CONSTANTS).reduce((acc, item) => {
      acc[item] = "";
      return acc;
    }, {})
  );

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    } else if (error) {
      toast.error(error, {
        position: "top-right",
        style: { color: "black", marginTop: "0rem" },
      });
    }
  }, [navigate, userInfo, redirect, error]);

  const handleSumbitLoginForm = (e) => {
    e.preventDefault();

    const { email, password } = userFields;

    // Check if both fields are filled
    if (!email || !password) {
      setMessage(`Введіть коректний логін та пароль!`);
      setIsFilled(true);
      return;
    }

    // Clear any error messages if inputs are correct
    setIsFilled(false);

    dispatch(login(email, password));
  };

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
                  {formFields.map((field, index) => (
                    <div key={index}>
                      <InputComponent
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        label={field.label}
                        value={userFields[field.id]}
                        onChange={(e) => handleUserDataChange(e)}
                      />
                    </div>
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
