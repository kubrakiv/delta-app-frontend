import React from "react";

const PlatformComponent = ({ selectedPlatform }) => {
    return (
        <>
            {selectedPlatform && (
                <div className="order-details__platform">
                    <span className="order-details__platform_text">
                        {selectedPlatform}
                    </span>
                </div>
            )}
        </>
    );
};

export default PlatformComponent;
