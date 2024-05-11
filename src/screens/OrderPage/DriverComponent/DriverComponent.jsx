import React from "react";
import { Form } from "react-bootstrap";
import "./DriverComponent.scss";
import { FaUserCog } from "react-icons/fa";
import FormButtonComponent from "../FormButtonComponent/FormButtonComponent";

function DriverComponent({
    handleDoubleClick,
    drivers,
    selectedDriver,
    setSelectedDriver,
    editModeDriver,
    editModeOrder,
    setEditModeOrder,
    handleFormSubmit,
    onField = "driver",
    dispatch,
}) {
    return (
        <>
            <div
                className="order-details__content-row-block"
                onDoubleClick={() => handleDoubleClick("driver")}
            >
                <div className="order-details__content-row-block-title">
                    Водій
                </div>
                {editModeDriver || editModeOrder ? (
                    <Form>
                        <Form.Select
                            id="driver"
                            name="driver"
                            className="form-select-mb10"
                            value={selectedDriver}
                            onChange={(e) => setSelectedDriver(e.target.value)}
                            autoFocus
                        >
                            {drivers.map((driver) => (
                                <option
                                    key={driver.id}
                                    value={driver.full_name}
                                    selected={
                                        selectedDriver === driver.full_name
                                    }
                                >
                                    {driver.full_name}
                                </option>
                            ))}
                        </Form.Select>
                        {editModeDriver && (
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
                            <FaUserCog /> {selectedDriver}
                        </div>
                        <div className="order-details__content-row-block-value">
                            &#9990; +42-077-419-18-01
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default DriverComponent;
