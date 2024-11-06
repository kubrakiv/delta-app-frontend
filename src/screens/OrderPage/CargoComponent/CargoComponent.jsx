import { useEffect, useState } from "react";
import FormWrapper from "../../../components/FormWrapper";
import InputComponent from "../../../globalComponents/InputComponent";
import { updateOrder } from "../../../actions/orderActions";
import { getCsrfToken } from "../../../utils/getCsrfToken";
import { useSelector, useDispatch } from "react-redux";

import "./CargoComponent.scss";

const CARGO_CONSTANTS = {
  CARGO_NAME: "cargo_name",
  CARGO_WEIGHT: "cargo_weight",
  CARGO_LOADING_TYPE: "loading_type",
  TRAILER_TYPE: "trailer_type",
};

const { CARGO_NAME, CARGO_WEIGHT, CARGO_LOADING_TYPE, TRAILER_TYPE } =
  CARGO_CONSTANTS;

const CargoComponent = () => {
  const order = useSelector((state) => state.ordersInfo.order.data);

  const dispatch = useDispatch();

  const [cargoFields, setCargoFields] = useState(
    Object.values(CARGO_CONSTANTS).reduce((acc, item) => {
      acc[item] = "";
      return acc;
    }, {})
  );

  useEffect(() => {
    if (order) {
      const defaultValues = Object.values(CARGO_CONSTANTS).reduce(
        (acc, item) => {
          acc[item] = order?.[item] || "";
          return acc;
        },
        {}
      );
      setCargoFields(defaultValues);
    }
  }, [order]);

  const formFields = [
    [
      {
        id: CARGO_NAME,
        placeholder: "Вантаж",
      },
      {
        id: CARGO_WEIGHT,
        placeholder: "Вага, т",
      },
    ],
    [
      {
        id: TRAILER_TYPE,
        placeholder: "Тип кузова",
      },
      {
        id: CARGO_LOADING_TYPE,
        placeholder: "Тип завант",
      },
    ],
  ];

  const handleCargoChange = (e) => {
    const { name, value } = e.target;
    setCargoFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getCsrfToken();
  });

  const handleFormSubmit = () => {
    let dataToUpdate = {};
    Object.keys(cargoFields).forEach((key) => {
      dataToUpdate[key] = cargoFields[key];
    });

    dispatch(updateOrder(dataToUpdate, order.id));
  };

  return (
    <>
      <FormWrapper
        title="Вантаж"
        handleFormSubmit={handleFormSubmit}
        content={
          <div className="order-details__content-row-block-value-cargo">
            {formFields.flatMap((item) =>
              item.map((field) => (
                <div
                  key={field.id}
                  className="order-details__content-row-block-value-cargo-blocks"
                >
                  <span>{field.placeholder}:</span>
                  <span className="order-details__content-row-block-value-cargo-blocks_right-span">
                    {cargoFields[field.id]}
                  </span>
                </div>
              ))
            )}
          </div>
        }
      >
        <form>
          <div className="order-details__cargo-form-container">
            {formFields.map((fields, index) => (
              <div key={index} className="order-details__form-col">
                {fields.map((field) => {
                  return (
                    <InputComponent
                      id={field.id}
                      key={field.id}
                      name={field.id}
                      placeholder={field.placeholder} // FIXME: placeholder is not rendering
                      value={cargoFields[field.id]}
                      onChange={(e) => handleCargoChange(e)}
                      //   autoFocus
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </form>
      </FormWrapper>
    </>
  );
};

export default CargoComponent;
