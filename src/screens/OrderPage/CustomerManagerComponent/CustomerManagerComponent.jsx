import React, { useEffect, useState } from "react";
import "./CustomerManagerComponent.scss";
import { FaRegUser } from "react-icons/fa";
import FormWrapper from "../../../components/FormWrapper";
import { useDispatch, useSelector } from "react-redux";
import { listCustomers } from "../../../actions/customerActions";
import SelectComponent from "../../../globalComponents/SelectComponent";

function CustomerManagerComponent() {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.ordersInfo.order.data);
    const customers = useSelector(
        (state) => state.customersInfo.customers.data
    );
    const { customer_manager } = order;

    const [customerManagersList, setCustomerManagersList] = useState([]);

    const [selectedCustomer, setSelectedCustomer] = useState("");

    const [showDetails, setShowDetails] = useState(false);
    const [selectedCustomerManagerName, setSelectedCustomerManagerName] =
        useState("");

    const [selectedCustomerManagerObject, setSelectedCustomerManagerObject] =
        useState(
            customers
                .find((customer) => customer.name === selectedCustomer)
                ?.managers.find(
                    (manager) => manager.full_name === order.customer_manager
                )
        );

    useEffect(() => {
        setSelectedCustomer(order.customer);
        setSelectedCustomerManagerName(order.customer_manager);
    }, [order]);

    useEffect(() => {
        dispatch(listCustomers());
    }, [dispatch]);

    useEffect(() => {
        const targetCustomer = customers.find(
            (customer) => customer.name === selectedCustomer
        );
        setCustomerManagersList(targetCustomer ? targetCustomer.managers : []);
    }, [customers, selectedCustomer]);

    useEffect(() => {
        const managerObject = customerManagersList.find(
            (manager) => manager.full_name === selectedCustomerManagerName
        );

        setSelectedCustomerManagerObject(managerObject || {});
    }, [customerManagersList, selectedCustomerManagerName]);

    useEffect(() => {
        const managerObject = customers
            .find((customer) => customer.name === selectedCustomer)
            ?.managers.find(
                (manager) => manager.full_name === order.customer_manager
            );

        setSelectedCustomerManagerObject(managerObject || {});
    }, [customers, selectedCustomer, order]);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleFormSubmit = () => {
        console.log("submit");
    };

    return (
        <>
            <FormWrapper
                title="Менеджер замовника"
                hiddenContent={
                    <>
                        <div className="order-details__content-row-block-value">
                            &#128386;
                            {selectedCustomerManagerObject?.email}
                        </div>
                        <div className="order-details__content-row-block-value">
                            &#9990;
                            {selectedCustomerManagerObject?.phone}
                        </div>
                    </>
                }
                content={
                    <>
                        {customer_manager && (
                            <>
                                <div className="order-details__content-row-block-value">
                                    <FaRegUser />{" "}
                                    {selectedCustomerManagerObject?.full_name}
                                </div>
                            </>
                        )}
                    </>
                }
                handleFormSubmit={handleFormSubmit}
            >
                <form>
                    <SelectComponent
                        title="Виберіть менеджера замовника"
                        id="customer"
                        name="customer"
                        value={selectedCustomer}
                        onChange={(e) => setSelectedCustomer(e.target.value)}
                        options={customers.map((customer) => (
                            <option
                                key={customer.id}
                                value={customer.name}
                                // selected={selectedCustomer === customer.name}
                            >
                                {customer.name}
                            </option>
                        ))}
                    />
                </form>
            </FormWrapper>
        </>
    );
}

export default CustomerManagerComponent;
