import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useSelector } from "react-redux";

const Layout = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

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
