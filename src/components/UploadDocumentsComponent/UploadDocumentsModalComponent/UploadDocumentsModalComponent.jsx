import React, { useEffect, useRef, useState } from "react";
import "./UploadDocumentsModalComponent.scss";
import UploadDocumentsComponent from "../UploadDocumentsComponent";
import axios from "axios";

const UploadDocumentsModalComponent = ({
    documents,
    showUploadDocumentsModal,
    setShowUploadDocumentsModal,
    order,
    selectedFileType,
    setSelectedFileType,
    onDocumentUpload,
}) => {
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowUploadDocumentsModal(false);
        }
    };
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setShowUploadDocumentsModal(false);
            }
        };

        // document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            // document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    });
    return (
        <>
            <div
                className="modal-overlay"
                style={{ display: showUploadDocumentsModal ? "block" : "none" }}
            >
                <div
                    ref={modalRef}
                    className={`upload-documents-modal${
                        showUploadDocumentsModal ? "" : " hidden"
                    }`}
                    style={{
                        display: showUploadDocumentsModal ? "block" : "none",
                    }}
                >
                    <UploadDocumentsComponent
                        documents={documents}
                        onDocumentUpload={onDocumentUpload}
                        setShowUploadDocumentsModal={
                            setShowUploadDocumentsModal
                        }
                        order={order}
                        selectedFileType={selectedFileType}
                        setSelectedFileType={setSelectedFileType}
                    />
                </div>
            </div>
        </>
    );
};

export default UploadDocumentsModalComponent;
