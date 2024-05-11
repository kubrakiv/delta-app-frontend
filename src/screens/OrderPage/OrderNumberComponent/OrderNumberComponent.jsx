import React from "react";
import { Form } from "react-bootstrap";
import "./OrderNumberComponent.scss";
import FormButtonComponent from "../FormButtonComponent/FormButtonComponent";

function OrderNumberComponent({
    orderNumber,
    setOrderNumber,
    editModeOrderNumber,
    editModeOrder,
    setEditModeOrder,
    handleFormSubmit,
    onField = "orderNumber",
    dispatch,
}) {
    return (
        <>
            <div className="order-details__order-number-title">Заявка</div>
            {editModeOrderNumber || editModeOrder ? (
                <div className="order-details__order-number-form">
                    <Form>
                        <Form.Control
                            id="orderNumber"
                            name="orderNumber"
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                            autoFocus
                        ></Form.Control>
                        {editModeOrderNumber && (
                            <FormButtonComponent
                                onField={onField}
                                dispatch={dispatch}
                                handleFormSubmit={handleFormSubmit}
                                setEditModeOrder={setEditModeOrder}
                            />
                        )}
                    </Form>
                </div>
            ) : (
                <>
                    <div className="order-details__order-number-value">
                        {orderNumber}
                    </div>
                </>
            )}
        </>
    );
}

export default OrderNumberComponent;
