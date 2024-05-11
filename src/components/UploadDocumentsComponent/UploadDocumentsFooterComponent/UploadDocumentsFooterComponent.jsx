import React from "react";
import "./UploadDocumentsFooterComponent.scss";

const UploadDocumentsFooterComponent = ({ setShowUploadDocumentsModal }) => {
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
                    onClick={(e) => {
                        e.preventDefault();
                        setShowUploadDocumentsModal(false);
                    }}
                >
                    Закрити
                </button>
            </div>
        </>
    );
};

export default UploadDocumentsFooterComponent;
