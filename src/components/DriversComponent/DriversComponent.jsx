import React, { useEffect, useState } from "react";
import "./DriversComponent.scss";
import axios from "axios";
import DriverSearchComponent from "./DriverSearchComponent/DriverSearchComponent";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import DriverModalComponent from "./DriverModalComponent/DriverModalComponent";
import driverImagePlaceholder from "../../img/driver_placeholder.jpg";
import cn from "classnames";

const { REACT_APP_PROXY: proxyUrl } = process.env;

const DriversComponent = () => {
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState({});
    const [search, setSearch] = useState("");
    const [showDriverModal, setShowDriverModal] = useState(false);
    const [driverImage, setDriverImage] = useState(driverImagePlaceholder);

    const [selectedDrivers, setSelectedDrivers] = useState([]);

    // All edit mode hooks
    const [editDriverProfileMode, setEditDriverProfileMode] = useState(false);
    const [activeDriver, setActiveDriver] = useState({});

    // const proxyUrl = process.env.REACT_APP_PROXY;
    console.log("PROXY URL", proxyUrl);

    const BASE_URL = "http://localhost:8000";

    const handleCheckboxChange = (driverID) => {
        setSelectedDrivers((prevSelectedDrivers) => {
            if (prevSelectedDrivers.includes(driverID)) {
                return prevSelectedDrivers.filter((id) => id !== driverID);
            } else {
                return [...prevSelectedDrivers, driverID];
            }
        });
    };

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/api/driver-profiles/");
            setDrivers(data);
        })();
    }, []);

    console.log(drivers);

    const handleEditProfileMode = (e) => {
        e.preventDefault();

        if (selectedDrivers.length === 0) {
            window.alert("Виберіть водія для редагування");
        } else if (selectedDrivers.length > 1) {
            window.alert("Виберіть лише одного водія для редагування");
        }
        if (selectedDrivers.length === 1) {
            setSelectedDriver(
                drivers.find((driver) => driver.user === selectedDrivers[0])
            );
            setEditDriverProfileMode(true);
            setShowDriverModal(true);
        }
    };

    const handleRowDoubleClick = (e, driver) => {
        e.stopPropagation();

        setSelectedDriver(driver);
        setShowDriverModal(true);
    };

    const handleSelectedDriver = (driver) => {
        setSelectedDriver(driver);
    };

    const handleRemoveSelectedDriver = (driver) => {
        setSelectedDriver({});
    };

    // const handleAddDriverButton = (e) => {
    //     e.stopPropagation();

    // };

    // const handleEditModeButton = (e, driver) => {
    //     e.stopPropagation();
    //     setShowDriverModal(true);
    //     setSelectedDriver(driver);
    //     setEditDriverProfileMode(true);
    // };

    const handleDeleteSelectedDrivers = async () => {
        console.log("Delete selected drivers", selectedDrivers);
        // try {
        //     for (let orderID of selectedOrders) {
        //         await axios.delete(`/api/orders/delete/${orderID}`, {
        //             headers: {
        //                 "X-CSRFToken": csrfToken,
        //             },
        //         });
        //     }
        //     setOrders(
        //         orders.filter((order) => !selectedOrders.includes(order.id))
        //     );
        //     setSelectedOrders([]); // Clear selected orders
        // } catch (error) {
        //     console.error("Error deleting orders:", error.message);
        // }
    };

    const handleDriverUpdate = async (driverId, driverData) => {
        const updatedDrivers = drivers.map((driver) => {
            if (driver.user === driverId) {
                return driverData;
            }
            return driver;
        });
        console.log("Updated drivers", updatedDrivers);
        setDrivers(updatedDrivers);
    };

    return (
        <>
            <DriverModalComponent
                showDriverModal={showDriverModal}
                setShowDriverModal={setShowDriverModal}
                selectedDriver={selectedDriver}
                setSelectedDriver={setSelectedDriver}
                editDriverProfileMode={editDriverProfileMode}
                setEditDriverProfileMode={setEditDriverProfileMode}
                handleEditProfileMode={handleEditProfileMode}
                handleRemoveSelectedDriver={handleRemoveSelectedDriver}
                handleDriverUpdate={handleDriverUpdate}
            />
            <div className="drivers-container">
                <div className="drivers-header-block">
                    <h2 className="drivers-table__name">Мої водії</h2>
                    <div className="drivers-header-block__buttons-container">
                        <button
                            className="drivers-header-block__add-driver-btn"
                            title="Додати водія"
                            // onClick={handleAddDriverButton}
                            // TODO: Add actions pannel
                        >
                            <FaPlus />
                        </button>
                        <button
                            className="drivers-header-block__delete-driver-btn"
                            title="Видалити вибраних водіїв"
                            onClick={handleDeleteSelectedDrivers}
                        >
                            <FaRegTrashAlt />
                        </button>
                        <button
                            className="drivers-header-block__edit-driver-btn"
                            title="Редагувати водія"
                            onClick={handleEditProfileMode}
                        >
                            <FaPencilAlt />
                        </button>
                    </div>
                </div>
                <DriverSearchComponent search={search} setSearch={setSearch} />
                <div className="table-container">
                    <table className="drivers-table">
                        <thead className="drivers-table__header">
                            <tr className="drivers-table__head-row">
                                <th className="drivers-table__head-th">ID</th>
                                <th className="drivers-table__head-th">
                                    {" "}
                                    Фото{" "}
                                </th>
                                <th className="drivers-table__head-th">
                                    Повне ім'я
                                </th>
                                <th className="drivers-table__head-th">
                                    Номер телефону
                                </th>
                                <th className="drivers-table__head-th">
                                    Посада
                                </th>
                                <th className="drivers-table__head-th">
                                    Автомобіль
                                </th>
                                <th className="drivers-table__head-th"></th>
                                {/* <th className="drivers-table__head-th">Дії</th> */}
                            </tr>
                        </thead>
                        <tbody data-link="row" className="drivers-table__body">
                            {drivers &&
                                drivers
                                    .filter((item) => {
                                        const searchTerm = search.toLowerCase();
                                        return (
                                            searchTerm === "" ||
                                            item.full_name
                                                .toLowerCase()
                                                .includes(searchTerm)
                                        );
                                    })
                                    .map((driver, index) => (
                                        <tr
                                            key={driver.user}
                                            className={cn(
                                                "drivers-table__body-row",
                                                {
                                                    "drivers-table__body-row_active":
                                                        selectedDrivers.includes(
                                                            driver.user
                                                        ),
                                                }
                                            )}
                                            onDoubleClick={(e) =>
                                                handleRowDoubleClick(e, driver)
                                            }
                                        >
                                            <td className="drivers-table__body-td">
                                                {index + 1}
                                            </td>
                                            <td className="drivers-table__body-td drivers-table__body-td_image">
                                                <img
                                                    src={
                                                        driver.image
                                                            ? `${BASE_URL}${driver.image}`
                                                            : driverImagePlaceholder
                                                    }
                                                    alt=""
                                                />
                                            </td>
                                            <td className="drivers-table__body-td">
                                                {driver.full_name}
                                            </td>
                                            <td className="drivers-table__body-td">
                                                {driver.phone_number}
                                            </td>
                                            <td className="drivers-table__body-td">
                                                {driver.position}
                                            </td>
                                            <td className="drivers-table__body-td">
                                                {driver.trucks &&
                                                    driver.trucks[0].plates}
                                            </td>
                                            <td className="drivers-table__body-td">
                                                <input
                                                    type="checkbox"
                                                    className="drivers-table__checkbox"
                                                    checked={selectedDrivers.includes(
                                                        driver.user
                                                    )}
                                                    onChange={() => {
                                                        handleCheckboxChange(
                                                            driver.user
                                                        );
                                                    }}
                                                />
                                            </td>
                                            {/* <td className="drivers-table__body-td">
                                                <button
                                                    title="Редагувати водія"
                                                    className="points-table__btn points-table__btn_edit"
                                                    onClick={(e) =>
                                                        handleEditModeButton(
                                                            e,
                                                            driver
                                                        )
                                                    }
                                                >
                                                    <FaPencilAlt />
                                                </button>
                                                <button
                                                    title="Видалити водія"
                                                    className="points-table__btn points-table__btn_delete"
                                                    // onClick={(e) =>
                                                    //     handleDeletePoint(
                                                    //         e,
                                                    //         point.id
                                                    //     )
                                                    // }
                                                >
                                                    <FaRegTrashAlt />
                                                </button>
                                            </td> */}
                                        </tr>
                                    ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default DriversComponent;
