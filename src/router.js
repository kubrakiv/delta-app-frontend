import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import MainPage from "./screens/MainPage/MainPage";
import LoginPage from "./screens/LoginPage/LoginPage";
import StartScreen from "./screens/StartScreen";
import ProfilePage from "./screens/ProfilePage/ProfilePage";
import UserListPage from "./screens/UserListPage/UserListPage";
import UserEditPage from "./screens/UserEditPage/UserEditPage";
import Orders from "./components/Orders/Orders";
import OrdersTableComponent from "./components/OrdersTableComponent/OrdersTableComponent";
import PlanScreen from "./screens/PlanScreen";
import TaskPage from "./screens/TaskPage/TaskPage";
import TaskTablePage from "./screens/TaskTablePage";
import Dashboard from "./screens/Dashboard/Dashboard";
import AddTaskPage from "./screens/AddTaskPage";
import AddOrder from "./components/AddOrder/AddOrder";
import MapPage from "./screens/MapPage/MapPage";
import PointsPage from "./screens/PointsPage/PointsPage";
import PointPage from "./screens/PointPage/PointPage";
import OrderScreen from "./screens/OrderScreen";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import { RestrictedRoute } from "./RestrictedRoute";
import DriverListPage from "./screens/DriverListPage/DriverListPage";
import TrucksPage from "./screens/TrucksPage/TrucksPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
            {
                path: "/login",
                element: (
                    <RestrictedRoute
                        component={<LoginPage />}
                        redirectTo="/start"
                    />
                ),
            },
            {
                path: "/start",
                element: <StartScreen />,
            },
            {
                path: "/profile",
                element: <ProfilePage />,
            },
            {
                path: "/admin/userlist",
                element: <UserListPage />,
            },
            {
                path: "/admin/user/:id/edit",
                element: <UserEditPage />,
            },
            {
                path: "/orders-list",
                element: <Orders />,
            },
            {
                path: "/orders",
                element: <OrdersTableComponent />,
            },
            {
                path: "/orders/:id",
                element: <OrderScreen />,
            },

            {
                path: "/points",
                element: <PointsPage />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/planner",
                element: <PlanScreen />,
            },
            {
                path: "/tasks",
                element: <TaskTablePage />,
            },
            {
                path: "/tasks/:id",
                element: <TaskPage />,
            },
            {
                path: "/tasks/add",
                element: <AddTaskPage />,
            },
            {
                path: "/orders/add",
                element: <AddOrder />,
            },
            {
                path: "/map",
                element: <MapPage />,
            },
            {
                path: "/points/:id",
                element: <PointPage />,
            },
            {
                path: "/drivers",
                element: <DriverListPage />,
            },
            {
                path: "/vehicles",
                element: <TrucksPage />,
            },
        ],
    },
]);

export default router;
