import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UploadDocumentsFooterComponent.scss";
import { setEditModeDocument } from "../../../reducers/documentReducers";

const UploadDocumentsFooterComponent = () => {
    const dispatch = useDispatch();
    const editModeDocument = useSelector(
        (state) => state.documentsInfo.editMode
    );

    const handleCloseDocumentModal = (e) => {
        e.preventDefault();

        dispatch(setEditModeDocument(!editModeDocument));
    };

    return (
        <>
            <div className="upload-documents__footer">
                <button
                    title="Upload documents"
                    className="upload-documents__footer-btn upload-documents__footer-btn_save"
                    type="submit"
                >
                    Додати
                </button>
                <button
                    title="Close Window"
                    className="upload-documents__footer-btn upload-documents__footer-btn_close"
                    onClick={(e) => handleCloseDocumentModal(e)}
                >
                    Закрити
                </button>
            </div>
        </>
    );
};

export default UploadDocumentsFooterComponent;
