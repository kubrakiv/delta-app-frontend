import { CUSTOMER_CONSTANTS } from "../../../constants/global";

const {
  COMPANY_NAME,
  NIP_NUMBER,
  PAYMENT_PERIOD,
  PAYMENT_TYPE,
  EMAIL,
  WEBSITE,
  POST_ADDRESS,
} = CUSTOMER_CONSTANTS;

export const formFields = [
  [
    {
      id: COMPANY_NAME,
      title: "Назва компанії",
      type: "text",
      placeholder: "Назва компанії",
    },
    {
      id: NIP_NUMBER,
      title: "Податковий номер",
      type: "number",
      placeholder: "Податковий номер",
    },
    {
      id: PAYMENT_PERIOD,
      title: "Період оплати",
      type: "number",
      placeholder: "Період оплати",
    },
    {
      id: PAYMENT_TYPE,
      title: "Тип оплати",
      type: "text",
      placeholder: "Тип оплати",
      component: "select",
    },
    {
      id: EMAIL,
      title: "Email",
      type: "email",
      placeholder: "Email",
    },
    {
      id: WEBSITE,
      title: "Вебсайт",
      type: "text",
      placeholder: "Вебсайт",
    },
    {
      id: POST_ADDRESS,
      title: "Поштова адреса",
      type: "text",
      placeholder: "Поштова адреса",
    },
  ],
];
