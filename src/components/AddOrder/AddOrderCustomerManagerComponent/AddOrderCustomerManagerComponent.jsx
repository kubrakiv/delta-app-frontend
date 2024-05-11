import React from "react";
import "./AddOrderCustomerManagerComponent.scss";

const AddOrderCustomerManagerComponent = ({
    selectedCustomerManager,
    setSelectedCustomerManager,
    customerManagersList,
}) => {
    return (
        <>
            <div className="add-order-details__content-row-block">
                <div className="add-order-details__content-row-block-title">
                    Менеджер замовника
                </div>
                <select
                    id="customerManager"
                    name="customerManager"
                    value={selectedCustomerManager}
                    onChange={(e) => setSelectedCustomerManager(e.target.value)}
                    // autoFocus
                >
                    <option value={null} selected /* disabled */>
                        Select manager
                    </option>
                    {customerManagersList.map((manager) => (
                        <option key={manager.email}>{manager.full_name}</option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default AddOrderCustomerManagerComponent;
