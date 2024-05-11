import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import "./RegisterPage.scss";
import MessageComponent from "../../components/MessageComponent/MessageComponent";
import axios from "axios";
import { getCsrfToken } from "../../utils/getCsrfToken";

const RegisterPage = () => {
    const [roles, setRoles] = useState([]);

    const [selectedRole, setSelectedRole] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    // const redirect = location.search ? location.search.split("=")[1] : "/start";
    const redirect = "/start";

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, userInfo, error } = userRegister;

    useEffect(() => {
        getCsrfToken();
    }, []);

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/api/roles/");
            setRoles(data);
        })();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Паролі не співпадають!");
        } else {
            const user = {
                role: selectedRole,
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone_number: phone,
                password: password,
            };
            dispatch(register(user));
        }
    };

    return (
        <div className="background">
            <div className="passport-container">
                <div className="login-form-container">
                    <form
                        className="login-form"
                        onSubmit={(e) => submitHandler(e)}
                    >
                        <h3>Реєстрація</h3>
                        {message && (
                            <MessageComponent color={"red"}>
                                {message}
                            </MessageComponent>
                        )}
                        <div className="login-form__input-group">
                            <label htmlFor="role">Роль користувача</label>
                            <select
                                required
                                id="role"
                                value={selectedRole}
                                onChange={(e) =>
                                    setSelectedRole(e.target.value)
                                }
                            >
                                <option value="">Оберіть роль</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.name}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="login-form__input-group">
                            <label htmlFor="first_name">Ім'я</label>
                            <input
                                required
                                type="first_name"
                                id="first_name"
                                placeholder="Введіть ім'я"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="login-form__input-group">
                            <label htmlFor="last_name">Прізвище</label>
                            <input
                                required
                                type="last_name"
                                id="last_name"
                                placeholder="Введіть ім'я"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div className="login-form__input-group">
                            <label htmlFor="email">Логін/Email</label>
                            <input
                                required
                                type="email"
                                id="email"
                                placeholder="Введіть логін/email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="login-form__input-group">
                            <label htmlFor="email">Телефон</label>
                            <input
                                required
                                type="phone"
                                id="phone"
                                placeholder="Введіть телефон"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="login-form__input-group">
                            <label htmlFor="password">Пароль</label>
                            <input
                                required
                                type="password"
                                id="password"
                                placeholder="Введіть пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="login-form__input-group">
                            <label htmlFor="confirm-password">
                                Повторний пароль
                            </label>
                            <input
                                required
                                type="password"
                                id="password"
                                placeholder="Введіть повторний пароль"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <button className="button" type="submit">
                            Зареєструватися
                        </button>
                    </form>
                    <div className="login-form__input-group">
                        <label />
                        <div>
                            Вже зараєструвалися?{" "}
                            <Link
                                to={
                                    redirect
                                        ? `/login?redirect=${redirect}`
                                        : "/login"
                                }
                            >
                                Увійти
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
