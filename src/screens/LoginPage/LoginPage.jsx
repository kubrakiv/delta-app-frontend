import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import "./LoginPage.scss";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const submitHandler = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login(email, password));
    }
  };

  return (
    <>
      <div className="background">
        <div className="passport-container">
          <div className="login-form-container">
            <form className="login-form" onSubmit={(e) => submitHandler(e)}>
              <h3>Вхід</h3>
              <div className="login-form__input-group">
                <label htmlFor="email">Логін/Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Введіть логін/email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <button className="button" type="submit">
                Увійти
              </button>
              <div className="login-form__input-group">
                <label />
                <div>
                  Новий користувач?{" "}
                  {/* <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : "/register"
                    }
                  >
                    Зареєструватися
                  </Link> */}
                  <Link
                    to={
                      location.state?.from
                        ? `/register?redirect=${location.state.from.pathname}`
                        : "/register"
                    }
                  >
                    Зареєструватися
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
