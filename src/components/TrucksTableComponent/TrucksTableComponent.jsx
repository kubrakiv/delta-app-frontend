import React, { useEffect, useState } from "react";
import "./TrucksTableComponent.scss";
import { set } from "date-fns";
import axios from "axios";
import GenericModalComponent from "../GenericModalComponent/GenericModalComponent";
import TruckFormComponent from "../TruckFormComponent/TruckFormComponent";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import cn from "classnames";

const TrucksTableComponent = () => {
    const [trucks, setTrucks] = useState([]);
    const [selectedTruck, setSelectedTruck] = useState({});
    const [showTruckModal, setShowTruckModal] = useState(false);
    const [search, setSearch] = useState("");
    const [truckFormProps, setTruckFormProps] = useState({});

    const [selectedTrucks, setSelectedTrucks] = useState([]);

    // Edit truck mode
    const [editTruckMode, setEditTruckMode] = useState(false);
    const [activeTruck, setActiveTruck] = useState({});

    const openModal = (props) => {
        setTruckFormProps(props);
        setShowTruckModal(true);
    };

    const closeModal = () => {
        setShowTruckModal(false);
    };

    const handleCheckBoxChange = (truckID) => {
        setSelectedTrucks((prev) => {
            if (prev.includes(truckID)) {
                return prev.filter((id) => id !== truckID);
            }
            return [...prev, truckID];
        });
    };

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/api/trucks/");
            setTrucks(data);
        })();
    }, []);

    console.log("trucks", trucks);

    const handleRowDoubleClick = (e, truck) => {
        e.stopPropagation();
        console.log("double click for truck");

        openModal({ truck: truck });
        setSelectedTruck(truck);
    };

    return (
        <>
            <GenericModalComponent
                show={showTruckModal}
                onClose={closeModal}
                content={<TruckFormComponent {...truckFormProps} />}
            />
            <div className="trucks-container">
                <div className="trucks-header-block">
                    <h2 className="trucks-table__name">Автомобілі компанії</h2>
                </div>
                <div className="drivers-header-block__buttons-container">
                    <button
                        className="drivers-header-block__add-driver-btn"
                        title="Додати водія"
                        // onClick={handleAddDriverButton}
                    >
                        <FaPlus />
                    </button>
                    <button
                        className="drivers-header-block__delete-driver-btn"
                        title="Видалити вибраних водіїв"
                        // onClick={handleDeleteSelectedDrivers}
                    >
                        <FaRegTrashAlt />
                    </button>
                    <button
                        className="drivers-header-block__edit-driver-btn"
                        title="Редагувати водія"
                        // onClick={handleEditProfileMode}
                    >
                        <FaPencilAlt />
                    </button>
                </div>
                <div className="table-container">
                    <table className="trucks-table">
                        <thead className="trucks-table__header">
                            <tr className="trucks-table__head-row">
                                <th className="trucks-table__head-th">ID</th>
                                <th className="trucks-table__head-th">
                                    Модель
                                </th>
                                <th className="trucks-table__head-th">
                                    Номер авто
                                </th>
                                <th className="trucks-table__head-th">
                                    Причіп
                                </th>
                                <th className="trucks-table__head-th">Водій</th>

                                <th className="trucks-table__head-th">
                                    Рік випуску
                                </th>
                                <th className="trucks-table__head-th">VIN</th>
                                <th className="trucks-table__head-th"></th>
                            </tr>
                        </thead>
                        <tbody className="trucks-table__body">
                            {trucks
                                .filter((truck) => {
                                    const searchTerm = search.toLowerCase();
                                    return (
                                        searchTerm === "" ||
                                        truck.plates
                                            .toLowerCase()
                                            .includes(searchTerm)
                                    );
                                })
                                .map((truck, index) => (
                                    <tr
                                        key={truck.id}
                                        // className="trucks-table__body-row"
                                        className={cn(
                                            "drivers-table__body-row",
                                            {
                                                "drivers-table__body-row_active":
                                                    selectedTrucks.includes(
                                                        truck.id
                                                    ),
                                            }
                                        )}
                                        onDoubleClick={(e) =>
                                            handleRowDoubleClick(e, truck)
                                        }
                                    >
                                        <td className="trucks-table__body-td">
                                            {index + 1}
                                        </td>
                                        <td className="trucks-table__body-td">
                                            {truck.model}
                                        </td>
                                        <td className="trucks-table__body-td">
                                            {truck.plates}
                                        </td>
                                        <td className="trucks-table__body-td">
                                            {truck.trailer}
                                        </td>
                                        <td className="trucks-table__body-td">
                                            {truck.driver}
                                        </td>
                                        <td className="trucks-table__body-td">
                                            {truck.year}
                                        </td>
                                        <td className="trucks-table__body-td">
                                            {truck.vin_code}
                                        </td>
                                        <td className="trucks-table__body-td">
                                            <input
                                                type="checkbox"
                                                checked={selectedTrucks.includes(
                                                    truck.id
                                                )}
                                                onChange={() =>
                                                    handleCheckBoxChange(
                                                        truck.id
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default TrucksTableComponent;
