import React, { useEffect, useState } from "react";
import "./DriversComponent.scss";
import DriverSearchComponent from "./DriverSearchComponent/DriverSearchComponent";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import driverImagePlaceholder from "../../img/driver_placeholder.jpg";
import cn from "classnames";
import GenericModalComponent from "../../globalComponents/GenericModalComponent";
import AddDriverComponent from "./AddDriverComponent/AddDriverComponent";
import { useDispatch, useSelector } from "react-redux";
import { deleteDriver, listDrivers } from "../../actions/driverActions";
import RegisterFormComponent from "../../screens/RegisterPage/RegisterFormComponent";
import { useNavigate } from "react-router-dom";

const { REACT_APP_PROXY: BASE_URL } = process.env;

const DriversComponent = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.driversInfo.drivers.data);
  const navigate = useNavigate();

  const [selectedDriver, setSelectedDriver] = useState({});
  const [search, setSearch] = useState("");
  const [showDriverModal, setShowDriverModal] = useState(false);

  const [selectedDrivers, setSelectedDrivers] = useState([]);

  // All edit mode hooks
  const [createDriverMode, setCreateDriverMode] = useState(false);
  const [editDriverProfileMode, setEditDriverProfileMode] = useState(false);

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
    dispatch(listDrivers());
  }, [dispatch]);

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
    console.log("Selected driver", driver);
    setShowDriverModal(true);
  };

  const handleAddDriverButton = (e) => {
    e.stopPropagation();
    setSelectedDriver({});
    console.log("Add driver button clicked");
    navigate("/drivers/add");
    // setShowDriverModal(true);
    // setCreateDriverMode(true);
  };

  const handleDeleteSelectedDrivers = () => {
    console.log("Delete selected drivers", selectedDrivers);
    if (selectedDrivers.length === 0) {
      window.alert("Виберіть водія для видалення");
      return;
    }
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this driver?"
    );
    if (!confirmDelete) {
      return;
    }

    if (confirmDelete) {
      console.log("Delete selected drivers", selectedDrivers);
      try {
        for (let driverId of selectedDrivers) {
          dispatch(deleteDriver(driverId));
        }
        setSelectedDrivers([]);
        dispatch(listDrivers());
      } catch (error) {
        console.error("Error deleting drivers:", error.message);
      }
    }
  };

  const handleDriverUpdate = (driverId, driverData) => {
    const updatedDrivers = drivers.map((driver) => {
      if (driver.user === driverId) {
        return driverData;
      }
      return driver;
    });
    console.log("Updated drivers", updatedDrivers);
    dispatch(listDrivers());
  };

  const handleModalClose = () => {
    setShowDriverModal(false);
  };

  return (
    <>
      <GenericModalComponent
        show={showDriverModal}
        onClose={handleModalClose}
        content={
          createDriverMode ? (
            <RegisterFormComponent
              setShowDriverModal={setShowDriverModal}
              setCreateDriverMode={setCreateDriverMode}
            />
          ) : (
            <AddDriverComponent
              setShowDriverModal={setShowDriverModal}
              showDriverModal={showDriverModal}
              selectedDriver={selectedDriver}
              editDriverProfileMode={editDriverProfileMode}
              setSelectedDriver={setSelectedDriver}
              setEditDriverProfileMode={setEditDriverProfileMode}
              handleEditProfileMode={handleEditProfileMode}
              handleDriverUpdate={handleDriverUpdate}
            />
          )
        }
      />
      <div className="drivers-container">
        <div className="drivers-header-block">
          <h2 className="drivers-table__name">Мої водії</h2>
          <div className="drivers-header-block__buttons-container">
            <button
              className="drivers-header-block__add-driver-btn"
              title="Додати водія"
              onClick={handleAddDriverButton}
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
            {/* TODO: Add this buttons block to globalComponents */}
          </div>
        </div>
        <DriverSearchComponent search={search} setSearch={setSearch} />
        <div className="table-container">
          <table className="drivers-table">
            <thead className="drivers-table__header">
              <tr className="drivers-table__head-row">
                <th className="drivers-table__head-th">ID</th>
                <th className="drivers-table__head-th"> Фото </th>
                <th className="drivers-table__head-th">Повне ім'я</th>
                <th className="drivers-table__head-th">Номер телефону</th>
                <th className="drivers-table__head-th">Посада</th>
                <th className="drivers-table__head-th">Автомобіль</th>
                <th className="drivers-table__head-th"></th>
              </tr>
            </thead>
            <tbody data-link="row" className="drivers-table__body">
              {drivers &&
                drivers
                  .filter((item) => {
                    const searchTerm = search.toLowerCase();
                    return (
                      searchTerm === "" ||
                      item.full_name.toLowerCase().includes(searchTerm)
                    );
                  })
                  .map((driver, index) => (
                    <tr
                      key={driver.user}
                      className={cn("drivers-table__body-row", {
                        "drivers-table__body-row_active":
                          selectedDrivers.includes(driver.user),
                      })}
                      onDoubleClick={(e) => handleRowDoubleClick(e, driver)}
                    >
                      <td className="drivers-table__body-td">{index + 1}</td>
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
                        {driver.trucks && driver?.trucks[0]?.plates}
                      </td>
                      <td className="drivers-table__body-td">
                        <input
                          type="checkbox"
                          className="drivers-table__checkbox"
                          checked={selectedDrivers.includes(driver.user)}
                          onChange={() => {
                            handleCheckboxChange(driver.user);
                          }}
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

export default DriversComponent;
