import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getUserDetails,
    updateUserProfile,
    USER_UPDATE_PROFILE_RESET,
} from "../../actions/userActions";
import "./ProfilePage.scss";
import MessageComponent from "../../components/MessageComponent/MessageComponent";

const ProfilePage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, user, error } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        } else {
            if (!user || !user.email || success || userInfo.id !== user.id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails("profile"));
            } else {
                setFirstName(user.first_name);
                setLastName(user.last_name);
                setEmail(user.email);
                setPhone(user.phone_number);
                setRole(user.role);
            }
        }
    }, [navigate, userInfo, dispatch, user, success]);

    const submitHandler = (e, id) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Паролі не співпадають!");
        } else {
            console.log("update profile");
            const userData = {
                id,
                first_name: firstName,
                last_name: lastName,
                phone_number: phone,
                email,
                password,
            };
            dispatch(updateUserProfile(userData));
            setMessage("");
        }
    };

    const getRole = (role) => {
        switch (role) {
            case "admin":
                return "адміністратора";
            case "driver":
                return "водія";
            case "logist":
                return "логіста";
            default:
                return null;
        }
    };

    return (
        <div>
            <form className="login-form" onSubmit={(e) => submitHandler(e)}>
                <h3>Profile Page {getRole(role)}</h3>
                {message && (
                    <MessageComponent color={"red"}>{message}</MessageComponent>
                )}
                <div className="login-form__input-group">
                    <label htmlFor="name">Ім'я</label>
                    <input
                        required
                        type="text"
                        id="name"
                        placeholder="Введіть ім'я"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="login-form__input-group">
                    <label htmlFor="surname">Прізвище</label>
                    <input
                        required
                        type="text"
                        id="surname"
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
                        type="password"
                        id="password"
                        placeholder="Введіть пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="login-form__input-group">
                    <label htmlFor="confirm-password">Повторний пароль</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Введіть повторний пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button className="button" type="submit">
                    Оновити профіль
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;
