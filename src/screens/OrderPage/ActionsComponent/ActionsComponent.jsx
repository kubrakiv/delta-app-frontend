import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEditModeDocument } from "../../../reducers/documentReducers";

const ActionsComponent = () => {
    const dispatch = useDispatch();
    const editModeDocument = useSelector(
        (state) => state.documentsInfo.editMode
    );
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    const handleAddTaskButtonClick = (e) => {
        e.stopPropagation();
        setShowAddTaskModal(true);
    };

    const handleDocumentModalOpen = () => {
        dispatch(setEditModeDocument(!editModeDocument));
    };

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
                    onClick={handleDocumentModalOpen}
                >
                    Документи
                </button>
            </div>
        </>
    );
};

export default ActionsComponent;
