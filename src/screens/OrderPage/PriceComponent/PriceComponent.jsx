import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./PriceComponent.scss";
import PricePerKmComponent from "../PricePerKmComponent/PricePerKmComponent";
import FormWrapper from "../../../components/FormWrapper";
import { listPaymentTypes } from "../../../actions/paymentTypeActions";
import { getCsrfToken } from "../../../utils/getCsrfToken";
import { updateOrder } from "../../../actions/orderActions";
import InputComponent from "../../../globalComponents/InputComponent";
import SelectComponent from "../../../globalComponents/SelectComponent";
import cn from "classnames";
import { transformSelectOptions } from "../../../utils/transformers";

const PRICE_CONSTANTS = {
  PRICE: "price",
  PAYMENT_PERIOD: "payment_period",
  PAYMENT_TYPE: "payment_type",
};

const { PRICE, PAYMENT_PERIOD, PAYMENT_TYPE } = PRICE_CONSTANTS;

function PriceComponent() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.ordersInfo.order.data);
  const paymentTypes = useSelector(
    (state) => state.paymentTypesInfo.paymentTypes.data
  );
  const paymentTypesOptions = transformSelectOptions(paymentTypes, "name");

  const [priceFields, setPriceFields] = useState(
    Object.values(PRICE_CONSTANTS).reduce((acc, item) => {
      acc[item] = "";
      return acc;
    }, {})
  );

  const formFields = [
    {
      id: PRICE,
      placeholder: "Тариф",
      type: "number",
    },
    {
      id: PAYMENT_PERIOD,
      placeholder: "Дні оплати",
      type: "text",
    },
    {
      id: PAYMENT_TYPE,
      type: "text",
      component: "select",
      title: "Тип оплати",
      isFullWidth: true,
    },
  ];

  const [selectedPaymentType, setSelectedPaymentType] = useState("");

  useEffect(() => {
    getCsrfToken();
  }, []);

  useEffect(() => {
    if (order) {
      const defaultValues = Object.values(PRICE_CONSTANTS).reduce(
        (acc, item) => {
          acc[item] = order?.[item] || "";
          return acc;
        },
        {}
      );
      setPriceFields(defaultValues);
      setSelectedPaymentType(order.payment_type);
    }
  }, [order]);

  useEffect(() => {
    dispatch(listPaymentTypes());
  }, [dispatch]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    let dataToUpdate = {};

    Object.keys(priceFields).forEach((key) => {
      dataToUpdate[key] = priceFields[key];
    });
    dataToUpdate.payment_type = selectedPaymentType;

    dispatch(updateOrder(dataToUpdate, order.id));
  };

  return (
    <>
      <FormWrapper
        title="Тариф"
        content={
          <>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                }}
                className="order-details__content-row-block-value"
              >
                {order.price} EUR
              </div>
              <div className="order-details__content-row-block-value">
                {order.payment_period} днів {order.payment_type}
              </div>
            </div>
          </>
        }
        secondTitle={
          <PricePerKmComponent
            type={"price"}
            price={order.price}
            distance={order.distance}
          />
        }
        handleFormSubmit={handleFormSubmit}
      >
        <form>
          <div className="order-details__price-form-container">
            <div className="order-details__form-row">
              {formFields.map((item) => {
                const {
                  component = "input",
                  id,
                  placeholder,
                  type,
                  title,
                } = item;
                return (
                  <div
                    key={id}
                    className={cn("order-details__form-row_item", {
                      "full-width": item.isFullWidth,
                    })}
                  >
                    {component === "select" ? (
                      <SelectComponent
                        title={title}
                        id={id}
                        name={id}
                        value={selectedPaymentType}
                        onChange={(e) => setSelectedPaymentType(e.target.value)}
                        options={paymentTypesOptions}
                      />
                    ) : (
                      <InputComponent
                        key={id}
                        id={id}
                        name={id}
                        type={type}
                        title={placeholder}
                        placeholder={placeholder}
                        value={priceFields[id]}
                        onChange={(e) => handlePriceChange(e)}
                        autoFocus
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </FormWrapper>
    </>
  );
}

export default PriceComponent;
