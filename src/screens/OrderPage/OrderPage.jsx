import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./OrderPage.scss";
import map from "../../img/map.png";
import TaskOrder from "../../components/Task/TaskOrder";

function OrderScreen() {
    const { id } = useParams();

    const [order, setOrder] = useState([]);

    useEffect(() => {
        async function fetchOrder() {
            const { data } = await axios.get(`/api/orders/${id}`);
            setOrder(data);
        }
        fetchOrder();
    }, [id]);

    return (
        <>
            <div className="order-container">
                <div className="order-details">
                    <div className="order-details__header">
                        <div className="order-details__return-button">
                            <Link to="/orders-list">
                                <div>&gt;</div>
                            </Link>
                        </div>
                        <div className="order-details__header-block">
                            Маршрут № {order.number}
                        </div>
                        <div className="order-details__header-block">
                            {order.loading_address} – {order.unloading_address}
                        </div>
                        <div className="order-details__header-block">
                            Номер заявки 0352-421-0032
                        </div>
                    </div>
                    <div className="order-details__actions">
                        <button className="order-details__action">
                            <Link to="/orders-list">Tasks</Link>
                        </button>
                        <button className="order-details__action">
                            <Link to="/orders-list">Documents</Link>
                        </button>
                        <button className="order-details__action">
                            <Link to="/orders-list">Map</Link>
                        </button>
                    </div>
                    <div className="order-details__content">
                        <div className="order-details__content-block">
                            <div className="order-details__content-row">
                                <div className="order-details__content-row-block">
                                    <div className="order-details__content-row-block-title">
                                        Delta Logistics SRO
                                    </div>
                                    <div className="order-details__content-row-block-value">
                                        Перевізник
                                    </div>
                                </div>
                                <div className="order-details__content-row-block">
                                    <div className="order-details__content-row-block-title">
                                        Kubrak Ivan
                                    </div>
                                    <div className="order-details__content-row-block-value">
                                        &#9990; +380504186484 <br />
                                        &#128386; kubrak@gmail.com
                                    </div>
                                </div>
                            </div>
                            <div className="order-details__content-row">
                                <div className="order-details__content-row-block">
                                    <div className="order-details__content-row-block-title">
                                        Автомобіль
                                    </div>
                                    <div className="order-details__content-row-block-value">
                                        {order.truck}
                                    </div>
                                </div>

                                <div className="order-details__content-row-block">
                                    <div className="order-details__content-row-block-title">
                                        {order.driver}
                                    </div>
                                    <div className="order-details__content-row-block-value">
                                        &#9990; +380504186484
                                    </div>
                                </div>
                            </div>
                            <div className="order-details__content-row">
                                <div className="order-details__content-row-block">
                                    {order.tasks &&
                                        order.tasks.map((task) => (
                                            <TaskOrder
                                                key={task.id}
                                                task={task}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className="order-details__content-block">
                            <div className="order-details__content-row">
                                <div className="order-details__content-row-block">
                                    <div className="order-details__content-row-block-title">
                                        {order.price} EUR
                                    </div>
                                    <div className="order-details__content-row-block-value">
                                        45 днів по оригіналам
                                    </div>
                                </div>
                                <div className="order-details__content-row-block">
                                    <div className="order-details__content-row-block-title">
                                        LKW Walter
                                    </div>
                                    <div className="order-details__content-row-block-value">
                                        Платник
                                    </div>
                                </div>
                            </div>
                            <div className="order-details__content-row">
                                <div className="order-details__content-row-block">
                                    <div className="order-details__content-row-block-title">
                                        Вантаж
                                    </div>
                                    <div className="order-details__content-row-block-value">
                                        Вага: 24т | Вантаж: тнп
                                        <br />
                                        Тип кузова: тент | Завантаження: бічне
                                    </div>
                                </div>
                                <div className="order-details__content-row-block">
                                    <div className="order-details__content-row-block-title">
                                        Andrej Vladar
                                    </div>
                                    <div className="order-details__content-row-block-value">
                                        &#9990; +4200011103336 <br /> &#128386;
                                        vladar@lkw.com
                                    </div>
                                </div>
                            </div>
                            <div className="order-details__content-row">
                                <div className="order-details__content-row-block">
                                    <img src={map} alt="map" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderScreen;
