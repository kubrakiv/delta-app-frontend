import React, { useEffect, useState } from "react";
import "./CustomerComponent.scss";
import PlatformComponent from "../../../components/PlatformComponent/PlatformComponent";
import { useDispatch, useSelector } from "react-redux";
import FormWrapper from "../../../components/FormWrapper";
import { updateOrder } from "../../../actions/orderActions";
import {
    listCustomers,
    setCustomerDetailsData,
    setManagerListData,
} from "../../../actions/customerActions";
import SelectComponent from "../../../globalComponents/SelectComponent";

function CustomerComponent() {
    const dispatch = useDispatch();

    const order = useSelector((state) => state.ordersInfo.order.data);
    const customers = useSelector(
        (state) => state.customersInfo.customers.data
    );

    const [selectedCustomer, setSelectedCustomer] = useState(order.customer);

    useEffect(() => {
        dispatch(listCustomers());
    }, []);

    useEffect(() => {
        const currentCustomer = customers.find(
            (customer) => customer.name === order.customer
        );
        if (currentCustomer) {
            dispatch(setManagerListData({ data: currentCustomer.managers }));
        }
    }, [dispatch, order.customer, customers]);

    useEffect(() => {
        const customer = customers.find(
            (customer) => customer.name === selectedCustomer
        );
        dispatch(
            setCustomerDetailsData({
                data: customer,
            })
        );
    }, [dispatch, selectedCustomer, customers]);

    const handleFormSubmit = () => {
        let dataToUpdate = {};
        dataToUpdate.customer = selectedCustomer;
        dispatch(updateOrder(dataToUpdate, order.id));
    };

    return (
        <>
            <FormWrapper
                title="Замовник"
                content={
                    <div className="order-details__content-row-block-value">
                        {order.customer}
                    </div>
                }
                secondTitle={<PlatformComponent platform={order.platform} />}
                handleFormSubmit={handleFormSubmit}
            >
                <form>
                    <SelectComponent
                        title="Виберіть замовника"
                        id="customer"
                        name="customer"
                        value={selectedCustomer}
                        onChange={(e) => setSelectedCustomer(e.target.value)}
                        autoFocus
                        options={customers.map((customer) => (
                            <option key={customer.id} value={customer.name}>
                                {customer.name}
                            </option>
                        ))}
                    />
                </form>
            </FormWrapper>
        </>
    );
}

export default CustomerComponent;
