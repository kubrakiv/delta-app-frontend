import React, { useState } from "react";
import { FaRegUser, FaAngleDown, FaAngleUp } from "react-icons/fa";

const CarrierManagerComponent = ({ user }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <>
            <div className="order-details__content-row-block">
                <div
                    className="order-details__content-row-block-title"
                    onClick={toggleDetails}
                    style={{ cursor: "pointer" }}
                >
                    Відповідальний
                    {showDetails ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                <div className="order-details__content-row-block-value">
                    <FaRegUser /> {user.last_name} {user.first_name}
                </div>
                {showDetails && (
                    <div className="order-details__content-row-block-value">
                        {user.phone_number && (
                            <span>
                                &#9990; {user.phone_number} <br />
                            </span>
                        )}
                        {user.email && <span>&#128386; {user.email}</span>}
                    </div>
                )}
            </div>
        </>
    );
};

export default CarrierManagerComponent;
