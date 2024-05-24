import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TruckComponent.scss";
import { FaTruckMoving } from "react-icons/fa";
import FormWrapper from "../../../components/FormWrapper";
import { listTrucks } from "../../../actions/truckActions";
import { updateOrder } from "../../../actions/orderActions";
import SelectComponent from "../../../globalComponents/SelectComponent";

function TruckComponent() {
    const dispatch = useDispatch();

    const trucks = useSelector((state) => state.trucksInfo.trucks.data);
    const order = useSelector((state) => state.ordersInfo.order.data);

    const [selectedTruck, setSelectedTruck] = useState("");

    useEffect(() => {
        setSelectedTruck(order.truck);

        dispatch(listTrucks());
    }, [dispatch, order]);

    const handleFormSubmit = () => {
        let dataToUpdate = {};
        dataToUpdate = { truck: selectedTruck };
        dispatch(updateOrder(dataToUpdate, order.id));
    };

    return (
        <>
            <FormWrapper
                title="Автомобіль"
                content={
                    <div className="order-details__content-row-block-value">
                        <FaTruckMoving /> {selectedTruck}
                    </div>
                }
                handleFormSubmit={handleFormSubmit}
            >
                <form>
                    <SelectComponent
                        title="Виберіть авто"
                        id="truck"
                        name="truck"
                        value={selectedTruck}
                        onChange={(e) => setSelectedTruck(e.target.value)}
                        autoFocus
                        options={trucks.map((truck) => (
                            <option key={truck.id} value={truck.plates}>
                                {truck.plates}
                            </option>
                        ))}
                    />
                </form>
            </FormWrapper>
        </>
    );
}

export default TruckComponent;
