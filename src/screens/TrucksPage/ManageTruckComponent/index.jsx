import { useState } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";

import {
  createTruck,
  updateTruck,
} from "../../../features/trucks/trucksOperations";

import {
  setEditModeTruck,
  setSelectedTruck,
} from "../../../features/trucks/trucksSlice";

import { TRUCK_CONSTANTS } from "../../../constants/global";
import { formFields } from "./truckFormFields.jsx";
import { formatDateForInput } from "../../../utils/formatDate";

import ManageTruckFooterComponent from "../ManageTruckFooterComponent";
import InputComponent from "../../../globalComponents/InputComponent";

import "./style.scss";

const ManageTruckComponent = ({
  onCloseModal,
  onEditMode,
  initialTruckData = null,
}) => {
  const dispatch = useDispatch();

  const [truckFields, setTruckFields] = useState(() => {
    if (initialTruckData) {
      return {
        ...initialTruckData,
      };
    }

    return Object.values(TRUCK_CONSTANTS).reduce((acc, item) => {
      acc[item] = "";
      return acc;
    }, {});
  });

  const handleTruckChange = (e) => {
    const { name, value } = e.target;
    setTruckFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let data = {};
    Object.keys(truckFields).forEach((key) => {
      data[key] = truckFields[key];
    });

    if (initialTruckData) {
      dispatch(updateTruck(data));
      dispatch(setSelectedTruck(data));
      dispatch(setEditModeTruck(false));
    } else {
      dispatch(createTruck(data));
      onCloseModal();
    }
  };

  return (
    <>
      <form className="add-truck__form" onSubmit={(e) => handleFormSubmit(e)}>
        <div className="truck-card-container">
          <div className="truck-card-details">
            <div className="add-truck__content">
              <div className="add-truck__content-block">
                {!onEditMode && (
                  <h3 className="add-truck__title">Додати тягач</h3>
                )}
                <div className="add-truck__content-row">
                  {formFields.map((fields) => (
                    <div
                      className={cn(
                        "add-truck__content-row-block",
                        initialTruckData !== null &&
                          "add-truck__content-row-block_edit-mode"
                      )}
                      key={`fields-row-${fields[0].id}`}
                    >
                      {fields.map((field) => {
                        return (
                          <div key={field.id}>
                            <InputComponent
                              label={field.title}
                              id={field.id}
                              type={field.type}
                              name={field.id}
                              title={field.title}
                              placeholder={field.placeholder}
                              value={
                                field.type !== "date"
                                  ? truckFields[field.id]
                                  : formatDateForInput(truckFields[field.id])
                              }
                              onChange={(e) => handleTruckChange(e)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {!initialTruckData && (
              <ManageTruckFooterComponent onCloseModal={onCloseModal} />
            )}
            {initialTruckData && (
              <div className="edit-truck__footer">
                <button
                  title={
                    initialTruckData ? "Оновити тягач" : "Додати менеджера"
                  }
                  style={{ margin: "0px 0px 5px 5px" }}
                  className="end-time__footer-btn end-time__footer-btn_save"
                  type="submit"
                  // disabled={initialTruckData ? isFormValid : !isFormValid}
                >
                  {initialTruckData ? "Оновити тягач" : "Додати менеджера"}
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default ManageTruckComponent;
