import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MessageComponent from "../../../components/MessageComponent/MessageComponent";
import { getCsrfToken } from "../../../utils/getCsrfToken";
import { register } from "../../../actions/userActions";
import { listDrivers } from "../../../actions/driverActions";
import "./style.scss";
import SelectComponent from "../../../globalComponents/SelectComponent";
import InputComponent from "../../../globalComponents/InputComponent";
import { transformSelectOptions } from "../../../utils/transformers";
import { listRoles } from "../../../features/roles/roleOperations";
import { selectRoles } from "../../../features/roles/roleSelectors";

const REGISTER_CONSTANTS = {
  ROLE: "role",
  FIRST_NAME: "first_name",
  LAST_NAME: "last_name",
  EMAIL: "email",
  PHONE: "phone_number",
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirm_password",
};

const {
  ROLE,
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  PHONE,
  PASSWORD,
  CONFIRM_PASSWORD,
} = REGISTER_CONSTANTS;

const RegisterFormComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedRole, setSelectedRole] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const [registerFields, setRegisterFields] = useState(
    Object.values(REGISTER_CONSTANTS).reduce((acc, item) => {
      acc[item] = "";
      return acc;
    }, {})
  );

  // const redirect = location.search ? location.search.split("=")[1] : "/start";
  const redirect = "/login";

  const userRegister = useSelector((state) => state.userRegister);
  const { success, error } = userRegister;

  const roles = useSelector(selectRoles);

  const roleTypesOptions = transformSelectOptions(roles, "name");

  useEffect(() => {
    getCsrfToken();
  }, []);

  useEffect(() => {
    dispatch(listRoles());
  }, [dispatch]);

  const handleRegisterDataChange = (e) => {
    const { name, value } = e.target;
    setRegisterFields((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let userData = {};
    let isValid = true;
    setMessage("");

    // Check if all necessary fields are filled
    Object.keys(registerFields).forEach((key) => {
      if (!registerFields[key] && key !== REGISTER_CONSTANTS.CONFIRM_PASSWORD) {
        isValid = false;
        setMessage(`Поле ${key} не може бути порожнім!`);
      }
    });

    // Check if password and confirmPassword match
    if (REGISTER_CONSTANTS.PASSWORD !== REGISTER_CONSTANTS.CONFIRM_PASSWORD) {
      setMessage("Паролі не співпадають!");
      isValid = false;
    }

    // Check if selected role is not empty
    if (isValid) {
      Object.keys(registerFields).forEach((key) => {
        if (key !== REGISTER_CONSTANTS.CONFIRM_PASSWORD) {
          userData[key] = registerFields[key];
        }
        userData[ROLE] = selectedRole;
      });
      console.log("User data:", userData);
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (success) {
      setMessage("Користувач зареєстрований успішно!");
      setIsRegistered(true);
    } else if (error) {
      setMessage("Помилка реєстрації користувача!");
    }
  }, [success, error]);

  const handleCloseRegistration = () => {
    setIsRegistered(false);
    setMessage("");
    dispatch(listDrivers());
    navigate("/drivers");
  };

  const formFields = [
    {
      id: FIRST_NAME,
      placeholder: "Введіть ім'я",
      type: "text",
      title: "Ім'я",
      label: "Ім'я",
    },
    {
      id: LAST_NAME,
      placeholder: "Введіть прізвище",
      type: "text",
      title: "Прізвище",
      label: "Прізвище",
    },
    {
      id: EMAIL,
      placeholder: "Введіть email",
      type: "email",
      title: "Email",
      label: "Email",
    },
    {
      id: PHONE,
      placeholder: "Введіть телефон",
      type: "tel",
      title: "Телефон",
      label: "Телефон",
    },
    {
      id: PASSWORD,
      placeholder: "Введіть пароль",
      type: "password",
      title: "Пароль",
      label: "Пароль",
    },
    {
      id: CONFIRM_PASSWORD,
      placeholder: "Повторіть пароль",
      type: "password",
      title: "Повторний пароль",
      label: "Повторний пароль",
    },
  ];

  return (
    <>
      {success && isRegistered ? (
        <div className="login-form-container">
          <MessageComponent color={"green"}>{message}</MessageComponent>
          <Link to={"/login"}>Увійти</Link>
          <button
            onClick={handleCloseRegistration}
            className="form-footer-btn form-footer-btn_close"
          >
            Завершити реєстрацію
          </button>
        </div>
      ) : (
        <div className="add-order-details" style={{ margin: "auto" }}>
          <div className="login-form-container">
            <form className="login-form" onSubmit={(e) => submitHandler(e)}>
              <h3>Реєстрація</h3>
              {message && (
                <MessageComponent color={"red"}>{message}</MessageComponent>
              )}

              <div className="login-form__input-group">
                <SelectComponent
                  title="Роль користувача"
                  id="role"
                  name="role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  options={roleTypesOptions}
                />
              </div>
              <div className="order-details__form-row">
                {formFields.map((item) => {
                  const { id, placeholder, type, title, label } = item;
                  return (
                    <div key={id} className="order-details__form-row_item">
                      <InputComponent
                        required
                        label={label}
                        id={id}
                        name={id}
                        type={type}
                        title={title}
                        placeholder={placeholder}
                        value={registerFields[id]}
                        onChange={(e) => handleRegisterDataChange(e)}
                      />
                    </div>
                  );
                })}
              </div>
              {location.pathname === "/drivers/add" && (
                <button
                  className="form-footer-btn form-footer-btn_save"
                  type="submit"
                >
                  Зареєструвати водія
                </button>
              )}
              {location.pathname === "/register" && (
                <button
                  className="form-footer-btn form-footer-btn_save"
                  type="submit"
                >
                  Зареєструватися
                </button>
              )}
            </form>
            {location.pathname === "/register" && (
              <div className="login-form__input-group">
                <label />
                <div>
                  Вже зареєструвалися?{" "}
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  >
                    Увійти
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterFormComponent;
