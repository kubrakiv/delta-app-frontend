import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.scss";
import DragAndDropComponent from "../../components/DragAndDropComponent/DragAndDropComponent";

const Dashboard = () => {
    const [orders, setOrders] = useState([]);

    const handleOrders = (reorderedOrder) => {
        setOrders(reorderedOrder);
    };

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/api/orders/");
            setOrders(data);
        })();
    }, []);

    return (
        <>
            <DragAndDropComponent orders={orders} handleOrders={handleOrders} />
        </>
    );
};

export default Dashboard;
