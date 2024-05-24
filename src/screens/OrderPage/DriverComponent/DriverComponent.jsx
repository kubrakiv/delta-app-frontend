import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DriverComponent.scss";
import { FaUserCog } from "react-icons/fa";
import FormWrapper from "../../../components/FormWrapper";
import { listDrivers } from "../../../actions/driverActions";
import { updateOrder } from "../../../actions/orderActions";
import SelectComponent from "../../../globalComponents/SelectComponent";

function DriverComponent() {
    const dispatch = useDispatch();
    const drivers = useSelector((state) => state.driversInfo.drivers.data);
    const order = useSelector((state) => state.ordersInfo.order.data);

    const [selectedDriver, setSelectedDriver] = useState("");

    useEffect(() => {
        setSelectedDriver(order.driver);
        dispatch(listDrivers());
    }, [order, dispatch]);

    const handleFormSubmit = () => {
        let dataToUpdate = {};
        dataToUpdate = { driver: selectedDriver };
        dispatch(updateOrder(dataToUpdate, order.id));
    };

    return (
        <>
            <FormWrapper
                title="Водій"
                content={
                    <>
                        <div className="order-details__content-row-block-value">
                            <FaUserCog /> {selectedDriver}
                        </div>
                        <div className="order-details__content-row-block-value">
                            &#9990; +42-077-419-18-01
                        </div>
                    </>
                }
                handleFormSubmit={handleFormSubmit}
            >
                <form>
                    <SelectComponent
                        title="Виберіть водія"
                        id="driver"
                        name="driver"
                        value={selectedDriver}
                        onChange={(e) => setSelectedDriver(e.target.value)}
                        autoFocus
                        options={drivers.map((driver) => (
                            <option
                                key={driver.id}
                                value={driver.full_name}
                                // selected={selectedDriver === driver.full_name}
                            >
                                {driver.full_name}
                            </option>
                        ))}
                    />
                </form>
            </FormWrapper>
        </>
    );
}

export default DriverComponent;
