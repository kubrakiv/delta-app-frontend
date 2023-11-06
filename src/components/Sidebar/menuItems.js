import {
    FaTh,
    FaCalendarWeek,
    FaCalendarAlt,
    FaTruckMoving,
    FaListOl,
    FaTasks,
    FaThList,
    FaPlus,
} from "react-icons/fa";

const menuItems = [
    {
        path: "/",
        name: "My Company",
        icon: <FaTruckMoving />,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: <FaTh />,
    },
    {
        path: "/plan",
        name: "Weekly Planner",
        icon: <FaCalendarWeek />,
    },
    {
        path: "/plan-test",
        name: "Weekly Planner (test)",
        icon: <FaCalendarAlt />,
    },
    {
        path: "/orders",
        name: "Orders",
        icon: <FaThList />,
    },
    {
        path: "/orders-list",
        name: "Orders List",
        icon: <FaListOl />,
    },
    {
        name: "Tasks",
        icon: <FaTasks />,
        children: [
            {
                path: "/tasks",
                name: "All Tasks",
            },
            {
                path: "/tasks/pending",
                name: "Pending Tasks",
            },
            {
                path: "/tasks/completed",
                name: "Completed Tasks",
            },
        ],
    },
    {
        path: "/tasks/add",
        name: "Add Task",
        icon: <FaPlus />,
    },
];

export default menuItems;
