import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PlanScreen from "./screens/PlanScreen";
import PlanScreenTest from "./screens/PlanScreenTest";
import StartScreen from "./screens/StartScreen";
import TaskPage from "./screens/TaskPage/TaskPage";
import TaskTablePage from "./screens/TaskTablePage";
import Sidebar from "./components/Sidebar/Sidebar";
import Orders from "./components/Orders/Orders";
import OrderPage from "./screens/OrderPage/OrderPage";
import Dashboard from "./screens/Dashboard/Dashboard";
import AddTaskPage from "./screens/AddTaskPage";
import OrdersList from "./components/Orders/OrdersList";

function App() {
    return (
        <Router>
            <Header />
            <Sidebar>
                <Routes>
                    <Route path="/" element={<StartScreen />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/plan" element={<PlanScreen />} />
                    <Route path="/plan-test" element={<PlanScreenTest />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route index path="/orders/:id" element={<OrderPage />} />
                    <Route path="/orders-list" element={<OrdersList />} />
                    <Route index path="/tasks/:id" element={<TaskPage />} />
                    <Route path="/tasks" element={<TaskTablePage />} />
                    <Route path="/tasks/add" element={<AddTaskPage />} />
                </Routes>
            </Sidebar>
            <Footer />
        </Router>
    );
}

export default App;
