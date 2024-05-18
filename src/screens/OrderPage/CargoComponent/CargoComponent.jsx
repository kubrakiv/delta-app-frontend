import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./CargoComponent.scss";
import FormButtonComponent from "../FormButtonComponent/FormButtonComponent";
import { useSelector } from "react-redux";

const CARGO_CONSTANTS = {
    CARGO_NAME: "cargo_name",
    CARGO_WEIGHT: "cargo_weight",
    CARGO_LOADING_TYPE: "loading_type",
    TRAILER_TYPE: "trailer_type",
};

function CargoComponent({
    editModeCargo,
    editModeOrder,
    setEditModeOrder,
    handleFormSubmit,
    handleDoubleClick,
    onField = "cargo",
}) {
    const order = useSelector((state) => state.orderDetails.order);

    const [cargoFields, setCargoFields] = useState({
        ...Object.keys(CARGO_CONSTANTS).map((item) => ({ [item]: "" })),
    });

    useEffect(() => {
        if (order) {
            const defaultValues = Object.values(CARGO_CONSTANTS).reduce(
                (acc, item) => {
                    acc[item] = order?.[item] || "";
                    return acc;
                },
                {}
            );
            console.log("defaultValues", defaultValues);
            setCargoFields(defaultValues);
        }
    }, [order]);

    console.log("Order", order);

    const formFields = [
        [
            {
                id: CARGO_CONSTANTS.CARGO_NAME,
                placeholder: "Вантаж",
            },
            {
                id: CARGO_CONSTANTS.CARGO_WEIGHT,
                placeholder: "Вага",
            },
        ],
        [
            {
                id: CARGO_CONSTANTS.TRAILER_TYPE,
                placeholder: "Тип кузова",
            },
            {
                id: CARGO_CONSTANTS.CARGO_LOADING_TYPE,
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

    return (
        <>
            <div
                className="order-details__content-row-block"
                onDoubleClick={() => handleDoubleClick("cargo")}
            >
                <div className="order-details__content-row-block-title">
                    Вантаж
                </div>
                {editModeCargo || editModeOrder ? (
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
                                            onChange={(e) =>
                                                handleCargoChange(e)
                                            }
                                        ></Form.Control>
                                    ))}
                                </div>
                            ))}
                        </div>
                        {editModeCargo && (
                            <FormButtonComponent
                                onField={onField}
                                handleFormSubmit={handleFormSubmit}
                                setEditModeOrder={setEditModeOrder}
                            />
                        )}
                    </Form>
                ) : (
                    <div className="order-details__content-row-block-value-cargo">
                        {formFields.flatMap((item) =>
                            item.map((field) => (
                                <div className="order-details__content-row-block-value-cargo-blocks">
                                    {field.placeholder}:{cargoFields[field.id]}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default CargoComponent;
