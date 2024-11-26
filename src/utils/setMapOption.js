export const setMapOption = (point) => {
  return {
    id: point.id,
    title: `${point.country_short}-${point.postal_code} ${point.city}`,
    value: point.city,
    company: point.company_name,
    placeholder: "Виберіть точку на карті ...",
    label: `${point.country_short}-${point.postal_code} ${point.city}, ${point.street}, ${point.street_number} - ${point.company_name}`,
    gps_latitude: parseFloat(point.gps_latitude),
    gps_longitude: parseFloat(point.gps_longitude),
  };
};
