import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import PlanScreen from "./screens/PlanScreen";
import PlanScreenTest from "./screens/PlanScreenTest";
import StartScreen from "./screens/StartScreen";
import TaskScreen from "./screens/TaskScreen";
import TasksScreen from "./screens/TasksScreen";
import AddTaskScreen from "./screens/AddTaskScreen";
import Sidebar from "./components/Sidebar/Sidebar";
import Orders from "./screens/Orders";
import Dashboard from "./screens/Dashboard";

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
                    <Route index path="/tasks/:id" element={<TaskScreen />} />
                    <Route path="/tasks" element={<TasksScreen />} />
                    <Route path="/tasks/add" element={<AddTaskScreen />} />
                </Routes>
            </Sidebar>
            <Footer />
        </Router>
    );
}

export default App;
