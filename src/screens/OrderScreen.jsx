import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderPage from "./OrderPage/OrderPage";
import { useParams } from "react-router-dom";
import { listOrderDetails } from "../actions/orderActions";

const OrderScreen = () => {
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, order, error } = orderDetails;

    const { id } = useParams();

    useEffect(() => {
        dispatch(listOrderDetails(id));
    }, [dispatch, id]);

    return (
        <>
            {loading ? (
                <h4>Loading</h4>
            ) : error ? (
                <h4>{error}</h4>
            ) : (
                order && <OrderPage order={order} />
            )}
        </>
    );
};

export default OrderScreen;
