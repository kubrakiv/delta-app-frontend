export const DELIVERY_CONSTANTS = {
  UNLOADING: "Unloading",
  LOADING: "Loading",
  SERVICE: "Service",
  DRIVING: "Driving",
  WEEKEND: "Weekend",
  RESERVE: "Reserve",
  DELIVERY: "Delivery",
  WAITING: "Waiting",
  DELIVERED: "Delivered",
  CANCELED: "Cancelled",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
};

export const ORDER_STATUSES = {
  CREATED: { id: 1, name: "created" },
  PLANNED: { id: 2, name: "planned" },
  IN_TRANSIT: { id: 4, name: "in_transit" },
  COMPLETED: { id: 6, name: "completed" },
  DOCUMENTS_SENT: { id: 7, name: "documents_sent" },
  PAID: { id: 8, name: "paid" },
};

export const CUSTOMER_MANAGER_CONSTANTS = {
  FULL_NAME: "full_name",
  POSITION: "position",
  PHONE: "phone",
  EMAIL: "email",
  CUSTOMER: "customer",
};

export const CUSTOMER_CONSTANTS = {
  COMPANY_NAME: "name",
  NIP_NUMBER: "nip_number",
  VAT_NUMBER: "vat_number",
  EMAIL: "email",
  WEBSITE: "website",
  POST_ADDRESS: "post_address",
};

export const TRUCK_CONSTANTS = {
  TRUCK_BRAND: "brand",
  TRUCK_MODEL: "model",
  TRUCK_PLATES: "plates",
  TRUCK_ENTRY_DATE: "entry_date",
  TRUCK_END_DATE: "end_date",
  TRUCK_VIN_CODE: "vin_code",
  TRUCK_YEAR: "year",
  TRUCK_ENTRY_MILEAGE: "entry_mileage",
  TRUCK_PRICE: "price",
  TRUCK_GPS_ID: "gps_id",
};

export const TRAILER_CONSTANTS = {
  TRAILER_BRAND: "brand",
  TRAILER_PLATES: "plates",
  TRAILER_ENTRY_DATE: "entry_date",
  TRAILER_END_DATE: "end_date",
  TRAILER_VIN_CODE: "vin_code",
  TRAILER_YEAR: "year",
  TRAILER_ENTRY_MILEAGE: "entry_mileage",
  TRAILER_PRICE: "price",
};

export const TASK_CONSTANTS = {
  TASK_TITLE: "title",
  TASK_TYPE: "type",
  TASK_DRIVER: "driver",
  TASK_TRUCK: "truck",
  TASK_START_DATE: "start_date",
  TASK_START_TIME: "start_time",
  TASK_END_DATE: "end_date",
  TASK_END_TIME: "end_time",
};

export const PRICE_CONSTANTS = {
  PRICE: "price",
  PAYMENT_PERIOD: "payment_period",
  PAYMENT_TYPE: "payment_type",
  CURRENCY: "currency",
  VAT: "vat",
};

export const USER_CONSTANTS = {
  EMAIL: "email",
  PASSWORD: "password",
};

export const POINT_CONSTANTS = {
  COMPANY_NAME: "company_name",
  COUNTRY: "country",
  CUSTOMER: "customer",
  POSTAL_CODE: "postal_code",
  CITY: "city",
  STREET: "street",
  STREET_NUMBER: "street_number",
  GPS_LATITUDE: "gps_latitude",
  GPS_LONGITUDE: "gps_longitude",
};
