import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
// import tasks from "../tasks";
import axios from "axios";
import ModalTaskLeftSideComponent from "../Tasks/ModalTaskLeftSideComponent";
import "./OrdersList.scss";
import tableHead from "./tableHead.json";

function OrdersList() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchOrders() {
            const { data } = await axios.get("/api/orders/");
            setOrders(data);
        }
        fetchOrders();
    }, []);

    const handleRowClick = (order) => {
        setSelectedOrder(order);
        navigate(`/orders/${order.id}`);
    };

    // const handleButtonClick = (event, task) => {
    //     event.stopPropagation();
    //     console.log("Button clicked for task:", task);
    // };

    return (
        <>
            <h2 className="table__name">Таблиця замовлень</h2>
            <div className="table-container">
                <table className="orders-table">
                    {/* <caption className="table__name">Таблиця замовлень</caption> */}
                    <thead className="orders-table__header">
                        <tr className="orders-table__header-row">
                            {tableHead.map((col, index) => (
                                <th
                                    key={index}
                                    className="orders-table__header-th"
                                >
                                    {Object.values(col)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="orders-table__body">
                        {orders.map((order, index) => (
                            <tr
                                key={index}
                                className="orders-table__body-row"
                                onClick={() => handleRowClick(order)}
                            >
                                <td className="orders-table__body-td">
                                    {"RT_NUM"}
                                </td>
                                <td className="orders-table__body-td">
                                    {order.rout}
                                </td>
                                <td className="orders-table__body-td">
                                    {order.number}
                                </td>
                                <td className="orders-table__body-td">
                                    {order.loading_address}
                                </td>
                                <td className="orders-table__body-td">
                                    {order.unloading_address}
                                </td>
                                <td className="orders-table__body-td">
                                    {order.customer}
                                </td>
                                <td className="orders-table__body-td">
                                    {"INTERNAL ORDER NUMBER"}
                                </td>
                                <td className="orders-table__body-td">
                                    {"EXTERNAL ORDER"}
                                </td>
                                <td className="orders-table__body-td">
                                    {"PAYMENT PERIOD"}
                                </td>
                                <td className="orders-table__body-td">
                                    {"MANAGER"}
                                </td>
                                <td className="orders-table__body-td">
                                    {"PLATFORM"}
                                </td>
                                <td className="orders-table__body-td">
                                    {"ORIGINAL CMR"}
                                </td>
                                <td className="orders-table__body-td">
                                    {"DOCUMENTS SENT DATE"}
                                </td>
                                <td className="orders-table__body-td">
                                    {"LKW DOCUMENT STATUS"}
                                </td>
                                <td className="orders-table__body-td">
                                    {order.driver}
                                </td>
                                <td className="orders-table__body-td">
                                    {order.truck}
                                </td>
                                <td className="orders-table__body-td">
                                    {"SEMITRAILER PLATES"}
                                </td>
                                <td className="orders-table__body-td">
                                    {order.loading_start_date}
                                </td>
                                <td className="orders-table__body-td">
                                    {order.loading_start_time}
                                </td>
                                <td className="orders-table__body-td">
                                    {order.unloading_start_date}
                                </td>
                                <td className="orders-table__body-td">
                                    {order.unloading_start_time}
                                </td>
                                <td className="orders-table__body-td">
                                    {"distance"}
                                </td>
                                <td className="orders-table__body-td">
                                    {order.price}
                                </td>
                                <td className="orders-table__body-td">
                                    {"smth"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default OrdersList;
