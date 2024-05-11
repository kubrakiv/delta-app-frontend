import React from "react";
import { Form } from "react-bootstrap";
import "./CargoComponent.scss";
import FormButtonComponent from "../FormButtonComponent/FormButtonComponent";

function CargoComponent({
    editModeCargo,
    setEditModeCargo,
    editModeOrder,
    setEditModeOrder,
    cargoName,
    setCargoName,
    cargoWeight,
    setCargoWeight,
    cargoLoadingType,
    setCargoLoadingType,
    trailerType,
    setTrailerType,
    handleFormSubmit,
    handleDoubleClick,
    onField = "cargo",
    dispatch,
}) {
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
                            <div className="order-details__form-col">
                                <Form.Control
                                    className="order-details__cargo-form-container__form-input"
                                    id="weight"
                                    name="weight"
                                    placeholder="Вага"
                                    value={cargoWeight}
                                    onChange={(e) =>
                                        setCargoWeight(e.target.value)
                                    }
                                ></Form.Control>
                                <Form.Control
                                    id="cargoName"
                                    name="cargoName"
                                    placeholder="Назва вантажу"
                                    className="order-details__cargo-form-container__form-input"
                                    value={cargoName}
                                    onChange={(e) =>
                                        setCargoName(e.target.value)
                                    }
                                ></Form.Control>
                            </div>
                            <div className="order-details__form-col">
                                <Form.Control
                                    id="bodyType"
                                    name="bodyType"
                                    placeholder="Тип кузова"
                                    className="order-details__cargo-form-container__form-input"
                                    value={trailerType}
                                    onChange={(e) =>
                                        setTrailerType(e.target.value)
                                    }
                                ></Form.Control>
                                <Form.Control
                                    id="loadingType"
                                    name="loadingType"
                                    placeholder="Тип завант"
                                    className="order-details__cargo-form-container__form-input"
                                    value={cargoLoadingType}
                                    onChange={(e) =>
                                        setCargoLoadingType(e.target.value)
                                    }
                                ></Form.Control>
                            </div>
                        </div>
                        {editModeCargo && (
                            <FormButtonComponent
                                onField={onField}
                                dispatch={dispatch}
                                handleFormSubmit={handleFormSubmit}
                                setEditModeOrder={setEditModeOrder}
                            />
                        )}
                    </Form>
                ) : (
                    <div className="order-details__content-row-block-value-cargo">
                        <div className="order-details__content-row-block-value-cargo-blocks">
                            Вага: {cargoWeight} т
                        </div>
                        <div className="order-details__content-row-block-value-cargo-blocks">
                            Тип кузова: {trailerType}
                        </div>
                        <div className="order-details__content-row-block-value-cargo-blocks">
                            Вантаж: {cargoName}
                        </div>
                        <div className="order-details__content-row-block-value-cargo-blocks">
                            Тип завант: {cargoLoadingType}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CargoComponent;
