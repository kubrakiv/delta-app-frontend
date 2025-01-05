import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import MainPage from "./screens/MainPage/MainPage";
import LoginPage from "./screens/LoginPage/LoginPage";
import StartScreen from "./screens/StartScreen";
import ProfilePage from "./screens/ProfilePage/ProfilePage";
import UserListPage from "./screens/UserListPage/UserListPage";
import UserEditPage from "./screens/UserEditPage/UserEditPage";
// import Orders from "./components/Orders/Orders";
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
import OrderPage from "./screens/OrderPage/OrderPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import DriverListPage from "./screens/DriverListPage/DriverListPage";
import TrucksPage from "./screens/TrucksPage";
import AddDriverPage from "./screens/AddDriverPage";
import MainPageComponent from "./screens/MainPageComponent";
import CareerPage from "./screens/CareerPage";
import CustomerPage from "./screens/CustomerPage";
import InvoicePage from "./screens/InvoicePage";
import InvoiceComponent from "./components/InvoiceComponent";

import { RestrictedRoute } from "./RestrictedRoute";

const routes = [
  { path: "/career", element: <CareerPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  {
    path: "/start",
    element: <StartScreen />,
    roles: ["admin", "logist", "driver"],
  },
  { path: "/profile", element: <ProfilePage />, roles: ["admin", "logist"] },
  { path: "/admin/userlist", element: <UserListPage />, roles: ["admin"] },
  { path: "/admin/user/:id/edit", element: <UserEditPage />, roles: ["admin"] },
  // { path: "/orders-list", element: <Orders />, roles: ["admin", "logist"] },
  {
    path: "/orders",
    element: <OrdersTableComponent />,
    roles: ["admin", "logist"],
  },
  { path: "/orders/:id", element: <OrderPage />, roles: ["admin", "logist"] },
  { path: "/points", element: <PointsPage />, roles: ["admin", "logist"] },
  { path: "/dashboard", element: <Dashboard />, roles: ["admin", "logist"] },
  { path: "/planner", element: <PlanScreen />, roles: ["admin", "logist"] },
  { path: "/tasks", element: <TaskTablePage />, roles: ["admin", "logist"] },
  { path: "/tasks/:id", element: <TaskPage />, roles: ["admin", "logist"] },
  { path: "/tasks/add", element: <AddTaskPage />, roles: ["admin", "logist"] },
  { path: "/orders/add", element: <AddOrder />, roles: ["admin", "logist"] },
  { path: "/map", element: <MapPage />, roles: ["admin", "logist"] },
  { path: "/points/:id", element: <PointPage />, roles: ["admin", "logist"] },
  { path: "/drivers", element: <DriverListPage />, roles: ["admin", "logist"] },
  {
    path: "/drivers/add",
    element: <AddDriverPage />,
    roles: ["admin", "logist"],
  },
  { path: "/vehicles", element: <TrucksPage />, roles: ["admin", "logist"] },
  { path: "/customers", element: <CustomerPage />, roles: ["admin", "logist"] },
  { path: "/invoices", element: <InvoicePage />, roles: ["admin", "logist"] },
  {
    path: "/invoices/create",
    element: <InvoiceComponent />,
    roles: ["admin", "logist"],
  },
  {
    path: "/invoices/:invoiceId",
    element: <InvoiceComponent />,
    roles: ["admin", "logist"],
  },
  {
    path: "/invoices/create",
    element: <InvoiceComponent />,
    roles: ["admin", "logist"],
  },
];

const generateRoutes = (routes) =>
  routes.map(({ path, element, roles }) => ({
    path,
    element: roles ? (
      <RestrictedRoute requiredRoles={roles}>{element}</RestrictedRoute>
    ) : (
      element
    ),
  }));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MainPageComponent /> },
      ...generateRoutes(routes),
    ],
  },
]);

export default router;
