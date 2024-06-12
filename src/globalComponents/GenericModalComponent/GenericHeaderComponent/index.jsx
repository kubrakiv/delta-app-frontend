import React from "react";

const GenericHeaderComponent = ({ data }) => {
    const wordToLowerCase = (word) => {
        return word?.toLowerCase();
    };

    return (
        <>
            <div className="start-time__header">
                <div className="start-time__header-block">
                    Початок {data && wordToLowerCase(data?.type)}
                </div>
            </div>
        </>
    );
};

export default GenericHeaderComponent;
