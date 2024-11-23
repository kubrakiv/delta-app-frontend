import { useSelector, useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, Suspense } from "react";

import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import { logout } from "./actions/userActions";

const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Normalize path by removing trailing slash
  const normalizedPathname = location.pathname.replace(/\/$/, "");
  const isRootUrl = normalizedPathname === "";

  useEffect(() => {
    if (userInfo && isRootUrl) {
      dispatch(logout());
    }
  }, [userInfo, isRootUrl, dispatch]);

  return userInfo ? (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Sidebar>
          <Outlet />
          <Toaster position="top-right" reverseOrder={false} />
        </Sidebar>
        <Footer />
      </Suspense>
    </div>
  ) : (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
        <Toaster position="top-right" reverseOrder={false} />
      </Suspense>
    </div>
  );
};

export default Layout;
