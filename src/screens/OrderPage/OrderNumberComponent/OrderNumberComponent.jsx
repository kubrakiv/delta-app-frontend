import React, { useEffect, useState } from "react";
import "./OrderNumberComponent.scss";
import FormWrapper from "../../../components/FormWrapper";
import InputComponent from "../../../globalComponents/InputComponent";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../../actions/orderActions";

function OrderNumberComponent() {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.ordersInfo.order.data);

    const [orderNumber, setOrderNumber] = useState("");

    useEffect(() => {
        setOrderNumber(order.order_number);
    }, [order]);

    const handleFormSubmit = () => {
        let dataToUpdate = {};
        dataToUpdate = { order_number: orderNumber };
        dispatch(updateOrder(dataToUpdate, order.id));
    };

    return (
        <>
            <FormWrapper
                title="Заявка"
                content={
                    <div className="order-details__order-number-value">
                        {order.order_number}
                    </div>
                }
                handleFormSubmit={handleFormSubmit}
            >
                <div className="order-details__order-number-form">
                    <form>
                        <InputComponent
                            id="orderNumber"
                            name="orderNumber"
                            value={order.order_number}
                            onChange={(e) => setOrderNumber(e.target.value)}
                            autoFocus
                        ></InputComponent>
                    </form>
                </div>
            </FormWrapper>
        </>
    );
}

export default OrderNumberComponent;
