// services/DistanceCalculationService.js

export const calculateRouteDistance = async (origin, destination) => {
  try {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    return results.routes[0].legs[0].distance.value; // distance in meters
  } catch (error) {
    console.error("Error calculating route: ", error);
    return 0;
  }
};

export const calculateTotalDistance = async (tasks) => {
  if (tasks.length < 2) return 0;

  let totalDistance = 0;

  for (let i = 0; i < tasks.length - 1; i++) {
    const origin = {
      lat: parseFloat(tasks[i].point_details.gps_latitude),
      lng: parseFloat(tasks[i].point_details.gps_longitude),
    };

    const destination = {
      lat: parseFloat(tasks[i + 1].point_details.gps_latitude),
      lng: parseFloat(tasks[i + 1].point_details.gps_longitude),
    };

    const distanceBetweenPoints = await calculateRouteDistance(
      origin,
      destination
    );
    totalDistance += distanceBetweenPoints;
  }

  return (totalDistance / 1000).toFixed(); // Convert to kilometers and round to the nearest integer
};
