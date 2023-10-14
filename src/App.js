import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import PlanScreen from "./screens/PlanScreen";
import StartScreen from "./screens/StartScreen";
import TaskScreen from "./screens/TaskScreen";
import TasksScreen from "./screens/TasksScreen";
import AddTaskScreen from "./screens/AddTaskScreen";

function App() {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path="/" element={<StartScreen />} />
                        <Route path="/plan" element={<PlanScreen />} />
                        <Route
                            index
                            path="/tasks/:id"
                            element={<TaskScreen />}
                        />
                        <Route path="/tasks" element={<TasksScreen />} />
                        <Route path="/tasks/add" element={<AddTaskScreen />} />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
