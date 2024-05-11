import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./CustomerManagerComponent.scss";
import FormButtonComponent from "../FormButtonComponent/FormButtonComponent";
import { FaRegUser, FaAngleDown, FaAngleUp } from "react-icons/fa";

function CustomerManagerComponent({
    customerManagersList,
    selectedCustomerManagerName,
    setSelectedCustomerManagerName,
    selectedCustomerManagerObject,
    editModeCustomerManager,
    setEditModeCustomerManager,
    editModeOrder,
    setEditModeOrder,
    handleFormSubmit,
    handleDoubleClick,
    onField = "customerManager",
    dispatch,
}) {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    return (
        <>
            <div
                className="order-details__content-row-block"
                onDoubleClick={() => handleDoubleClick("customerManager")}
            >
                <div
                    className="order-details__content-row-block-title"
                    onClick={toggleDetails}
                    style={{ cursor: "pointer" }}
                >
                    Менеджер замовника
                    {showDetails ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {editModeCustomerManager || editModeOrder ? (
                    <Form>
                        <Form.Select
                            id="customerManager"
                            name="customerManager"
                            value={selectedCustomerManagerName}
                            onChange={(e) =>
                                setSelectedCustomerManagerName(e.target.value)
                            }
                            className="form-select-mb10"
                            autoFocus
                        >
                            {customerManagersList.map((manager) => (
                                <option
                                    key={manager.email}
                                    value={manager.full_name}
                                >
                                    {manager.full_name}
                                </option>
                            ))}
                        </Form.Select>
                        {editModeCustomerManager && (
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
                        {selectedCustomerManagerObject && (
                            <>
                                <div className="order-details__content-row-block-value">
                                    <FaRegUser />{" "}
                                    {selectedCustomerManagerObject.full_name}
                                </div>
                                {showDetails && (
                                    <>
                                        <div className="order-details__content-row-block-value">
                                            &#128386;
                                            {
                                                selectedCustomerManagerObject.email
                                            }
                                        </div>
                                        <div className="order-details__content-row-block-value">
                                            &#9990;
                                            {
                                                selectedCustomerManagerObject.phone
                                            }
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default CustomerManagerComponent;
