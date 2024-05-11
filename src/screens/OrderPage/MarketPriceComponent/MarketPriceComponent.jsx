import React from "react";
import { Form } from "react-bootstrap";
import FormButtonComponent from "../FormButtonComponent/FormButtonComponent";

function MarketPriceComponent({
    order,
    selectedCustomer,
    price,
    distance,
    setPrice,
    setMarketPrice,
    editModeMarketPrice,
    setEditModeMarketPrice,
    editModeOrder,
    setEditModeOrder,
    handleFormSubmit,
    handleDoubleClick,
    onField = "marketPrice",
    marketPrice,
    dispatch,
}) {
    return selectedCustomer === "AGROMAT" ? (
        <>
            <div
                className="order-details__content-row-block"
                onDoubleClick={() => handleDoubleClick("marketPrice")}
            >
                <div className="order-details__content-row-block-title">
                    Ринковий Тариф
                </div>

                {editModeMarketPrice || editModeOrder ? (
                    <Form>
                        <Form.Control
                            id="price"
                            name="price"
                            className="form-select-mb10"
                            value={marketPrice}
                            onChange={(e) => setMarketPrice(e.target.value)}
                            autoFocus
                        ></Form.Control>
                        {editModeMarketPrice && (
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
                        <div className="order-details__content-row-block-value">
                            {marketPrice} EUR
                        </div>
                    </>
                )}
            </div>
        </>
    ) : null;
}

export default MarketPriceComponent;
