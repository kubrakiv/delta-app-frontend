import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import "./PriceComponent.scss";
import PricePerKmComponent from "../PricePerKmComponent/PricePerKmComponent";
import FormWrapper from "../../../components/FormWrapper";
import { listPaymentTypes } from "../../../actions/paymentTypeActions";
import { getCsrfToken } from "../../../utils/getCsrfToken";
import { updateOrder } from "../../../actions/orderActions";
import InputComponent from "../../../globalComponents/InputComponent";
import SelectComponent from "../../../globalComponents/SelectComponent";

const PRICE_CONSTANTS = {
    PRICE: "price",
    PAYMENT_PERIOD: "payment_period",
};

const { PRICE, PAYMENT_PERIOD } = PRICE_CONSTANTS;

function PriceComponent() {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.ordersInfo.order.data);
    const paymentTypes = useSelector(
        (state) => state.paymentTypesInfo.paymentTypes.data
    );

    const [priceFields, setPriceFields] = useState(
        Object.values(PRICE_CONSTANTS).reduce((acc, item) => {
            acc[item] = "";
            return acc;
        }, {})
    );

    const formFields = [
        [
            {
                id: PRICE,
                placeholder: "Тариф",
                type: "number",
            },
            {
                id: PAYMENT_PERIOD,
                placeholder: "Дні оплати",
                type: "text",
            },
        ],
    ];

    const [selectedPaymentType, setSelectedPaymentType] = useState("");

    useEffect(() => {
        getCsrfToken();
    }, []);

    useEffect(() => {
        if (order) {
            const defaultValues = Object.values(PRICE_CONSTANTS).reduce(
                (acc, item) => {
                    acc[item] = order?.[item] || "";
                    return acc;
                },
                {}
            );
            setPriceFields(defaultValues);
            setSelectedPaymentType(order.payment_type);
        }
    }, [order]);

    useEffect(() => {
        dispatch(listPaymentTypes());
    }, [dispatch]);

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPriceFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = () => {
        let dataToUpdate = {};

        Object.keys(priceFields).forEach((key) => {
            dataToUpdate[key] = priceFields[key];
        });
        dataToUpdate.payment_type = selectedPaymentType;

        dispatch(updateOrder(dataToUpdate, order.id));
    };

    return (
        <>
            <FormWrapper
                title="Тариф"
                content={
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
                                {order.price} EUR
                            </div>
                            <div className="order-details__content-row-block-value">
                                {order.payment_period} днів {order.payment_type}
                            </div>
                        </div>
                    </>
                }
                secondTitle={
                    <PricePerKmComponent
                        type={"price"}
                        price={order.price}
                        distance={order.distance}
                    />
                }
                handleFormSubmit={handleFormSubmit}
            >
                <Form>
                    <div className="order-details__price-form-container">
                        {formFields.map((item, index) => (
                            <div
                                key={index}
                                className="order-details__form-row"
                            >
                                {item.map((field) => (
                                    <InputComponent
                                        key={field.id}
                                        id={field.id}
                                        name={field.id}
                                        type={field.type}
                                        title={field.placeholder}
                                        placeholder={field.placeholder}
                                        value={priceFields[field.id]}
                                        onChange={(e) => handlePriceChange(e)}
                                        autoFocus
                                    />
                                ))}
                            </div>
                        ))}
                        <div className="order-details__form-row">
                            <SelectComponent
                                title="Тип оплати"
                                id="payment-type"
                                name="payment-type"
                                value={selectedPaymentType}
                                onChange={(e) =>
                                    setSelectedPaymentType(e.target.value)
                                }
                                options={paymentTypes.map((type) => (
                                    <option key={type.id} value={type.name}>
                                        {type.name}
                                    </option>
                                ))}
                            />
                        </div>
                    </div>
                </Form>
            </FormWrapper>
        </>
    );
}

export default PriceComponent;
