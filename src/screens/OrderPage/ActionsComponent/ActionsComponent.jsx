import React from "react";

const ActionsComponent = ({
    handleAddTaskButtonClick,
    handleUploadDocumentsButtonClick,
}) => {
    return (
        <>
            <div className="order-details__actions">
                <button
                    className="order-details__action-add-task-btn"
                    onClick={handleAddTaskButtonClick}
                >
                    Додати завдання
                </button>
                <button
                    className="order-details__action-add-documents-btn"
                    onClick={handleUploadDocumentsButtonClick}
                >
                    Документи
                </button>
            </div>
        </>
    );
};

export default ActionsComponent;
