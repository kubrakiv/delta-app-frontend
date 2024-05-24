import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderPage from "./OrderPage/OrderPage";
import { useParams } from "react-router-dom";
import { listOrderDetails } from "../actions/orderActions";

const OrderScreen = () => {
    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.ordersInfo.order);
    const { loading, data, error } = orderList;

    const { id } = useParams();

    useEffect(() => {
        dispatch(listOrderDetails(id));
    }, [dispatch, id]);

    return (
        <>
            {loading ? (
                <h4>Loading...</h4>
            ) : error ? (
                <h4>{error}</h4>
            ) : data ? (
                <OrderPage order={data} />
            ) : (
                <h4>No order found!</h4>
            )}
        </>
    );
};

export default OrderScreen;
