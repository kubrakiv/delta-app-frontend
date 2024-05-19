import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./CargoComponent.scss";
import { useSelector, useDispatch } from "react-redux";
import { getCsrfToken } from "../../../utils/getCsrfToken";
import { updateOrder } from "../../../actions/orderActions";
import FormWrapper from "../../../components/FormWrapper";

const CARGO_CONSTANTS = {
    CARGO_NAME: "cargo_name",
    CARGO_WEIGHT: "cargo_weight",
    CARGO_LOADING_TYPE: "loading_type",
    TRAILER_TYPE: "trailer_type",
};

const { CARGO_NAME, CARGO_WEIGHT, CARGO_LOADING_TYPE, TRAILER_TYPE } =
    CARGO_CONSTANTS;

const CargoComponent = () => {
    const order = useSelector((state) => state.ordersInfo.order.data);

    const dispatch = useDispatch();

    const [cargoFields, setCargoFields] = useState(
        Object.values(CARGO_CONSTANTS).reduce((acc, item) => {
            acc[item] = "";
            return acc;
        }, {})
    );

    useEffect(() => {
        if (order) {
            const defaultValues = Object.values(CARGO_CONSTANTS).reduce(
                (acc, item) => {
                    acc[item] = order?.[item] || "";
                    return acc;
                },
                {}
            );
            setCargoFields(defaultValues);
        }
    }, [order]);

    const formFields = [
        [
            {
                id: CARGO_NAME,
                placeholder: "Вантаж",
            },
            {
                id: CARGO_WEIGHT,
                placeholder: "Вага, т",
            },
        ],
        [
            {
                id: TRAILER_TYPE,
                placeholder: "Тип кузова",
            },
            {
                id: CARGO_LOADING_TYPE,
                placeholder: "Тип завант",
            },
        ],
    ];

    const handleCargoChange = (e) => {
        const { name, value } = e.target;
        setCargoFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        getCsrfToken();
    });

    const handleFormSubmit = () => {
        let dataToUpdate = {};
        Object.keys(cargoFields).forEach((key) => {
            dataToUpdate[key] = cargoFields[key];
        });

        dispatch(updateOrder(dataToUpdate, order.id));
    };

    return (
        <>
            <FormWrapper
                title="Вантаж"
                handleFormSubmit={handleFormSubmit}
                content={
                    <div className="order-details__content-row-block-value-cargo">
                        {formFields.flatMap((item) =>
                            item.map((field) => (
                                <div className="order-details__content-row-block-value-cargo-blocks">
                                    {field.placeholder}: {cargoFields[field.id]}
                                </div>
                            ))
                        )}
                    </div>
                }
            >
                <Form>
                    <div className="order-details__cargo-form-container">
                        {formFields.map((item) => (
                            <div className="order-details__form-col">
                                {item.map((field) => (
                                    <Form.Control
                                        key={field.id}
                                        className="order-details__cargo-form-container__form-input"
                                        id={field.id}
                                        name={field.id}
                                        placeholder={field.placeholder}
                                        value={cargoFields[field.id]}
                                        onChange={(e) => handleCargoChange(e)}
                                    ></Form.Control>
                                ))}
                            </div>
                        ))}
                    </div>
                </Form>
            </FormWrapper>
        </>
    );
};

export default CargoComponent;
