import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
// import tasks from "../tasks";
import axios from "axios";
import ModalTaskLeftSideComponent from "../Tasks/ModalTaskLeftSideComponent";
import Task from "../Task/Task";
import TasksInOrder from "../Tasks/TasksInOrder";
import { useSelector } from "react-redux";

function Orders() {
    const orderList = useSelector((state) => state.ordersInfo.orders);
    const { data: ordersData, loading, error } = orderList;

    const navigate = useNavigate();

    return (
        <>
            <div className="table__container">
                <h2 className="table__name">Таблиця замовлень альтернативна</h2>
                <table className="orders-table">
                    <thead className="orders-table__header">
                        <tr className="orders-table__header-row">
                            <th className="orders-table__header-th">Number</th>
                            <th className="orders-table__header-th">Price</th>
                            <th className="orders-table__header-th">Rout</th>
                            <th className="orders-table__header-th">Tasks</th>
                            <th className="orders-table__header-th">
                                Customer
                            </th>
                        </tr>
                    </thead>
                    <tbody className="orders-table__body">
                        {ordersData.map((order, index) => (
                            <tr
                                key={index}
                                className="orders-table__body-row"
                                // onClick={() => handleRowClick(order)}
                            >
                                <td className="orders-table__body-td">
                                    {order.number}
                                </td>
                                <td className="orders-table__body-td">
                                    {order.price}
                                </td>
                                <td className="orders-table__body-td">
                                    {order.rout}
                                </td>
                                <td className="orders-table__body-td">
                                    {order.tasks.map((task) => (
                                        <>
                                            <TasksInOrder task={task} />
                                        </>
                                    ))}
                                </td>
                                <td className="orders-table__body-td">
                                    {order.customer}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Orders;
