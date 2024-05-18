import React from "react";

const TruckFormComponent = ({ truck }) => {
    return <>{truck && truck.plates}</>;
};

export default TruckFormComponent;
