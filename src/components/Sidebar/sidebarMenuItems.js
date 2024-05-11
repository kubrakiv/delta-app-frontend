import React from "react";
import {
    FaTh,
    FaCalendarWeek,
    FaTruckMoving,
    FaTasks,
    FaThList,
    FaPlus,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { RiDragDropLine } from "react-icons/ri";

const menuItems = [
    {
        title: "Моя компанія",
        path: "/start",
        icon: <FaTruckMoving />,
        childrens: [
            {
                path: "/start",
                title: "Головна сторінка",
            },
            {
                path: "/admin/userlist",
                title: "Мої співробітники",
            },
            {
                path: "/drivers",
                title: "Мої водії",
            },
            {
                path: "/vehicles",
                title: "Мої автомобілі",
            },
        ],
    },

    {
        path: "/dashboard",
        title: "Drag and Drop",
        icon: <RiDragDropLine />,
    },
    {
        path: "/modal-page",
        title: "Модалка",
        icon: <FaTh />,
    },
    {
        path: "/planner",
        title: "Рознарядка",
        icon: <FaCalendarWeek />,
    },
    {
        title: "Маршрути",
        path: "/orders",
        icon: <FaThList />,
        childrens: [
            {
                path: "/orders",
                title: "Список маршрутів",
            },
            {
                path: "/orders-list",
                title: "Реєстр маршрутів",
            },
            {
                path: "/orders/add",
                title: "Створити маршрут",
            },
        ],
    },
    {
        title: "Завдання",
        path: "/tasks",
        icon: <FaTasks />,
        childrens: [
            {
                path: "/tasks",
                title: "Реєстр завдань",
            },
            {
                path: "/tasks/add",
                title: "Додати завдання",
            },
        ],
    },
    {
        path: "/orders/add",
        title: "Створити маршрут",
        icon: <FaPlus />,
    },
    {
        path: "/map",
        title: "Карта",
        icon: <FaMapMarkedAlt />,
    },
    {
        path: "/points",
        title: "Мої пункти",
        icon: <FaMapMarkerAlt />,
    },
];

export default menuItems;
