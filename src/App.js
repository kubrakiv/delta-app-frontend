import React from "react";
import { RouterProvider } from "react-router-dom";

import OpenContextProvider from "./components/OpenContextProvider/OpenContextProvider";

import router from "./router.js";

function App({ Component, pageProps }) {
    return (
        <OpenContextProvider>
            <RouterProvider router={router}></RouterProvider>
        </OpenContextProvider>
    );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";
// import OpenContextProvider from "./components/OpenContextProvider/OpenContextProvider";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
// import PlanScreen from "./screens/PlanScreen";
// import StartScreen from "./screens/StartScreen";
// import TaskPage from "./screens/TaskPage/TaskPage";
// import TaskTablePage from "./screens/TaskTablePage";
// import Sidebar from "./components/Sidebar/Sidebar";
// import Orders from "./components/Orders/Orders";
// import Dashboard from "./screens/Dashboard/Dashboard";
// import ModalPage from "./screens/ModalPage/ModalPage";
// import AddTaskPage from "./screens/AddTaskPage";
// import OrdersTableComponent from "./components/OrdersTableComponent/OrdersTableComponent";
// import AddOrder from "./components/AddOrder/AddOrder";
// import MapPage from "./screens/MapPage/MapPage";
// import PointsPage from "./screens/PointsPage/PointsPage";
// import PointPage from "./screens/PointPage/PointPage";
// import OrderScreen from "./screens/OrderScreen";
// import LoginPage from "./screens/LoginPage/LoginPage";
// import RegisterPage from "./screens/RegisterPage/RegisterPage";
// import ProfilePage from "./screens/ProfilePage/ProfilePage";
// import UserListPage from "./screens/UserListPage/UserListPage";
// import UserEditPage from "./screens/UserEditPage/UserEditPage";
// import MainPage from "./screens/MainPage/MainPage";

// function App() {
//     const userLogin = useSelector((state) => state.userLogin);
//     const { userInfo } = userLogin;

//     return (
//         <Router>
//             <OpenContextProvider>
//                 {!userInfo ? (
//                     <Routes>
//                         <Route path="/" element={<MainPage />} />
//                         <Route path="/login" element={<LoginPage />} />
//                         <Route path="/register" element={<RegisterPage />} />
//                     </Routes>
//                 ) : (
//                     <>
//                         <Header />
//                         <Sidebar>
//                             <Routes>
//                                 <Route
//                                     path="/start"
//                                     element={<StartScreen />}
//                                 />
//                                 <Route
//                                     path="/profile"
//                                     element={<ProfilePage />}
//                                 />
//                                 <Route
//                                     path="/admin/userlist"
//                                     element={<UserListPage />}
//                                 />
//                                 <Route
//                                     path="/admin/user/:id/edit"
//                                     element={<UserEditPage />}
//                                 />

//                                 <Route
//                                     path="/orders/:id"
//                                     element={<OrderScreen />}
//                                 />
//                                 <Route
//                                     path="/dashboard"
//                                     element={<Dashboard />}
//                                 />
//                                 <Route
//                                     path="/modal-page"
//                                     element={<ModalPage />}
//                                 />
//                                 <Route path="/plan" element={<PlanScreen />} />
//                                 <Route path="/orders" element={<Orders />} />
//                                 <Route
//                                     path="/orders-list"
//                                     element={<OrdersTableComponent />}
//                                 />
//                                 <Route path="/tasks">
//                                     <Route index element={<TaskTablePage />} />
//                                     <Route path=":id" element={<TaskPage />} />
//                                 </Route>
//                                 <Route
//                                     path="/tasks/add"
//                                     element={<AddTaskPage />}
//                                 />
//                                 <Route
//                                     path="/orders/add"
//                                     element={<AddOrder />}
//                                 />
//                                 <Route path="/map" element={<MapPage />} />
//                                 <Route path="/points">
//                                     <Route index element={<PointsPage />} />
//                                     <Route path=":id" element={<PointPage />} />
//                                 </Route>
//                             </Routes>
//                         </Sidebar>
//                         <Footer />
//                     </>
//                 )}
//             </OpenContextProvider>
//         </Router>
//     );
// }

// export default App;
