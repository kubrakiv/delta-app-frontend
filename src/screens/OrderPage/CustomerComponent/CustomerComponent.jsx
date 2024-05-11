import React from "react";
import { Form } from "react-bootstrap";
import "./CustomerComponent.scss";
import FormButtonComponent from "../FormButtonComponent/FormButtonComponent";
import PlatformComponent from "../../../components/PlatformComponent/PlatformComponent";

function CustomerComponent({
    order,
    customers,
    selectedCustomer,
    setSelectedCustomer,
    platforms,
    selectedPlatform,
    setSelectedPlatform,
    editModeCustomer,
    setEditModeCustomer,
    handleFormSubmit,
    handleDoubleClick,
    editModeOrder,
    setEditModeOrder,
    onField = "customer",
    dispatch,
}) {
    return (
        <>
            <div
                className="order-details__content-row-block"
                onDoubleClick={() => handleDoubleClick("customer")}
            >
                <div className="order-details__content-row-block_platform">
                    <div className="order-details__content-row-block-title">
                        Замовник
                    </div>
                    <div className="order-details__content-row-block-title">
                        <PlatformComponent
                            order={order}
                            selectedPlatform={selectedPlatform}
                        />
                    </div>
                </div>
                {editModeCustomer || editModeOrder ? (
                    <Form>
                        <Form.Select
                            id="customer"
                            name="customer"
                            value={selectedCustomer}
                            onChange={(e) =>
                                setSelectedCustomer(e.target.value)
                            }
                            className="form-select-mb10"
                            autoFocus
                        >
                            {Array.isArray(customers) &&
                                customers.map((customer) => (
                                    <option
                                        key={customer.id}
                                        value={customer.name}
                                    >
                                        {customer.name}
                                    </option>
                                ))}
                        </Form.Select>

                        <Form.Select
                            id="platform"
                            name="platform"
                            value={selectedPlatform}
                            onChange={(e) =>
                                setSelectedPlatform(e.target.value)
                            }
                        >
                            <option
                                value={null}
                                selected
                                // disabled
                            >
                                Select platform
                            </option>
                            {platforms.map((platform) => (
                                <option key={platform.id}>
                                    {platform.name}
                                </option>
                            ))}
                        </Form.Select>
                        {editModeCustomer && (
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
                            {selectedCustomer}
                            {/* FIXME: move order.customer to customer hook and render the hook on the page */}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default CustomerComponent;
