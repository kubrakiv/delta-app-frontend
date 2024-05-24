import React, { useEffect, useState } from "react";
import "./CustomerComponent.scss";
import PlatformComponent from "../../../components/PlatformComponent/PlatformComponent";
import { useDispatch, useSelector } from "react-redux";
import FormWrapper from "../../../components/FormWrapper";
import { getCsrfToken } from "../../../utils/getCsrfToken";
import { updateOrder } from "../../../actions/orderActions";
import { listCustomers } from "../../../actions/customerActions";
import SelectComponent from "../../../globalComponents/SelectComponent";

function CustomerComponent() {
    const dispatch = useDispatch();

    const order = useSelector((state) => state.ordersInfo.order.data);
    const customers = useSelector(
        (state) => state.customersInfo.customers.data
    );

    const [selectedCustomer, setSelectedCustomer] = useState("");

    useEffect(() => {
        setSelectedCustomer(order.customer);
        dispatch(listCustomers());
    }, [dispatch, order]);

    useEffect(() => {
        getCsrfToken();
    });

    const handleFormSubmit = () => {
        let dataToUpdate = {};

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
                    ></SelectComponent>
                </form>
            </FormWrapper>
        </>
    );
}

export default CustomerComponent;
