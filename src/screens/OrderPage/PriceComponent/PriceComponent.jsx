import React from "react";
import { Form } from "react-bootstrap";
import "./PriceComponent.scss";
import FormButtonComponent from "../FormButtonComponent/FormButtonComponent";
import PricePerKmComponent from "../PricePerKmComponent/PricePerKmComponent";
import { round } from "../../../utils/round";

function PriceComponent({
    onField = "price",
    order,
    price,
    setPrice,
    editModePrice,
    editModeOrder,
    setEditModeOrder,
    handleFormSubmit,
    handleDoubleClick,
    paymentDays,
    setPaymentDays,
    paymentTypes,
    selectedPaymentType,
    setSelectedPaymentType,
    dispatch,
}) {
    return (
        <>
            <div
                className="order-details__content-row-block"
                onDoubleClick={() => handleDoubleClick("price")}
            >
                <div className="order-details__content-row-block_price">
                    <div className="order-details__content-row-block-title">
                        Тариф
                    </div>
                    <div className="order-details__content-row-block-title">
                        <PricePerKmComponent
                            order={order}
                            price={price}
                            round={round}
                            type={"price"}
                        />
                    </div>
                </div>
                {editModePrice || editModeOrder ? (
                    <Form>
                        <div className="order-details__price-form-container">
                            <div className="order-details__form-row">
                                <Form.Control
                                    id="price"
                                    name="text"
                                    className="order-details__price-form-container__form-input"
                                    value={price}
                                    placeholder="Тариф"
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                                <Form.Control
                                    id="paymentDays"
                                    name="number"
                                    className="order-details__price-form-container__form-input"
                                    value={paymentDays}
                                    placeholder="Дні оплати"
                                    onChange={(e) =>
                                        setPaymentDays(e.target.value)
                                    }
                                ></Form.Control>
                            </div>
                            <div className="order-details__form-row">
                                <Form.Select
                                    id="payment-type"
                                    name="payment-type"
                                    className="order-details__price-form-container__form-input"
                                    value={selectedPaymentType}
                                    onChange={(e) =>
                                        setSelectedPaymentType(e.target.value)
                                    }
                                >
                                    <option value={null} selected>
                                        Тип оплати
                                    </option>
                                    {paymentTypes.map((type) => (
                                        <option key={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </div>
                        </div>
                        {editModePrice && (
                            <FormButtonComponent
                                onField={onField}
                                dispatch={dispatch}
                                handleFormSubmit={handleFormSubmit}
                                setEditModeOrder={setEditModeOrder}
                            />
                        )}
                    </Form>
                ) : (
                    <>
                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "5px",
                                }}
                                className="order-details__content-row-block-value"
                            >
                                {price} EUR
                            </div>
                            <div className="order-details__content-row-block-value">
                                {paymentDays} днів {selectedPaymentType}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default PriceComponent;
