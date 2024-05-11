import React from "react";
import { Form } from "react-bootstrap";
import "./TruckComponent.scss";
import { FaTruckMoving } from "react-icons/fa";
import FormButtonComponent from "../FormButtonComponent/FormButtonComponent";

function TruckComponent({
    trucks,
    selectedTruck,
    setSelectedTruck,
    editModeTruck,
    // setEditModeTruck,
    editModeOrder,
    setEditModeOrder,
    handleFormSubmit,
    handleDoubleClick,
    onField = "truck",
    dispatch,
}) {
    return (
        <>
            <div
                className="order-details__content-row-block"
                onDoubleClick={() => handleDoubleClick(onField)}
            >
                <div className="order-details__content-row-block-title">
                    Автомобіль
                </div>

                {editModeTruck || editModeOrder ? (
                    <Form /* onSubmit={(e) => handleFormSubmit(e, "truck")} */>
                        <Form.Select
                            id="truck"
                            name="truck"
                            className="form-select-mb10"
                            isSearchable
                            value={selectedTruck}
                            onChange={(e) => setSelectedTruck(e.target.value)}
                            autoFocus
                        >
                            <option value={null} disabled selected>
                                Select truck
                            </option>
                            {trucks.map((truck) => (
                                <option
                                    key={truck.id}
                                    value={truck.plates}
                                    selected={selectedTruck === truck.plates}
                                >
                                    {truck.plates}
                                </option>
                            ))}
                        </Form.Select>
                        {editModeTruck && (
                            <FormButtonComponent
                                onField={onField}
                                dispatch={dispatch}
                                handleFormSubmit={handleFormSubmit}
                                // setEditMode={setEditModeTruck}
                                setEditModeOrder={setEditModeOrder}
                            />
                        )}
                    </Form>
                ) : (
                    <div className="order-details__content-row-block-value">
                        <FaTruckMoving /> {selectedTruck}
                    </div>
                )}
            </div>
        </>
    );
}

export default TruckComponent;
