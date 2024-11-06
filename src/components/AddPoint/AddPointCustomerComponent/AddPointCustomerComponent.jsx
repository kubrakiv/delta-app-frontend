import React from "react";
import "./AddPointCustomerComponent.scss";

const AddPointCustomerComponent = ({
  customers,
  selectedCustomer,
  setSelectedCustomer,
}) => {
  return (
    <>
      <div className="add-point-details__content-row-block">
        <div className="add-point-details__content-row-block-title">
          Замовник
        </div>
        <select
          id="customer"
          name="customer"
          className="add-point-details__select"
          value={selectedCustomer || ""}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          autoFocus
        >
          <option value={""} disabled>
            Select customer
          </option>
          {Array.isArray(customers) &&
            customers.map((customer) => (
              <option key={customer.id} value={customer.name}>
                {customer.name}
              </option>
            ))}
        </select>
      </div>
    </>
  );
};

export default AddPointCustomerComponent;
