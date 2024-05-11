import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./UploadDocumentsComponent.scss";
import UploadDocumentsFooterComponent from "./UploadDocumentsFooterComponent/UploadDocumentsFooterComponent";
import UploadDocumentsHeaderComponent from "./UploadDocumentsHeaderComponent/UploadDocumentsHeaderComponent";
import axios from "axios";
import { getCsrfToken } from "../../utils/getCsrfToken";

const UploadDocumentsComponent = ({
    documents,
    setShowUploadDocumentsModal,
    order,
    selectedFileType,
    setSelectedFileType,
    onDocumentUpload,
}) => {
    const [files, setFiles] = useState([]);
    const [fileTypes, setFileTypes] = useState([]);

    // Define the base URL of your backend server
    const BASE_URL = "http://localhost:8000";

    const openDocument = async (documentId) => {
        console.log("Opening document with ID:", documentId);
        try {
            // Fetch the document from the backend based on its ID
            const response = await axios.get(`/api/documents/${documentId}`);
            // Handle how to open the document, e.g., display it in a new window or download it
            console.log("Document data:", response.data);
            // Example: open the document in a new window
            window.open(`${BASE_URL}${response.data.file}`); // Assuming the backend provides a URL for the document
        } catch (error) {
            console.error("Error opening document:", error);
        }
    };

    useEffect(() => {
        getCsrfToken();
    }, []);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/api/file-types/");
            setFileTypes(data);
        })();
    }, []);

    const handleFiles = (e) => {
        const files = Array.from(e.target.files);
        setFiles(files);

        console.log("Uploaded files:", files);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("order_id", order.id);
        formData.append("file_type", selectedFileType);

        console.log("Order number", order.order_number);
        console.log("File type", selectedFileType);

        files.forEach((file) => {
            formData.append(`files`, file);
        });

        try {
            const response = await axios.post(
                "/api/documents/upload/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            onDocumentUpload(response.data);
            console.log(response.data, "this is uploaded files");
            // setShowUploadDocumentsModal(false);
        } catch (error) {
            console.log("Error", error);
        }
    };

    return (
        <>
            <div className="upload-documents-container">
                <div className="upload-documents">
                    <UploadDocumentsHeaderComponent order={order} />
                    {documents.length > 0 && (
                        <div className="upload-documents__content-block">
                            <div className="upload-documents__row">
                                <div className="upload-documents__content-row-block">
                                    <div className="documents-container">
                                        <table className="documents-table">
                                            <thead className="documents-table__header">
                                                <tr className="documents-table__head-row">
                                                    <th className="documents-table__head-th">
                                                        ID
                                                    </th>
                                                    <th className="documents-table__head-th">
                                                        Тип документу
                                                    </th>
                                                    <th className="documents-table__head-th">
                                                        Файл
                                                    </th>
                                                    <th className="documents-table__head-th">
                                                        Дата
                                                    </th>
                                                    <th className="documents-table__head-th">
                                                        Дії
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="documents-table__body">
                                                {documents.map((document) => {
                                                    // Parse uploaded_at string into a Date object
                                                    const uploadedAtDate =
                                                        new Date(
                                                            document.uploaded_at
                                                        );

                                                    // Extract date and time components
                                                    const formattedDate =
                                                        uploadedAtDate
                                                            .toISOString()
                                                            .slice(0, 10);
                                                    const formattedTime =
                                                        uploadedAtDate.toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }
                                                        );
                                                    return (
                                                        <tr
                                                            key={document.id}
                                                            className="documents-table__body-row"
                                                        >
                                                            <td className="documents-table__body-td">
                                                                {document.id}
                                                            </td>
                                                            <td className="documents-table__body-td">
                                                                {
                                                                    document.file_type
                                                                }
                                                            </td>

                                                            <td className="documents-table__body-td documents-table__body-td-wrap">
                                                                {
                                                                    document.file_name
                                                                }
                                                            </td>
                                                            <td className="documents-table__body-td">
                                                                {formattedDate}{" "}
                                                                {formattedTime}
                                                            </td>
                                                            <td className="documents-table__body-td">
                                                                <button
                                                                    className="button button-small"
                                                                    onClick={() =>
                                                                        openDocument(
                                                                            document.id
                                                                        )
                                                                    }
                                                                >
                                                                    Open
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <Form
                        onSubmit={handleFormSubmit}
                        className="upload-documents-form"
                    >
                        <div className="upload-documents__content">
                            <div className="upload-documents__content-block">
                                <div className="upload-documents__row">
                                    <div className="upload-documents__content-row-block">
                                        <Form.Group
                                            controlId="date"
                                            className="upload-documents__row-block"
                                        >
                                            <Form.Label className="upload-documents__form-title">
                                                Тип документу
                                            </Form.Label>
                                            <Form.Select
                                                id="file types"
                                                name="file types"
                                                className="form-select-mb10"
                                                value={selectedFileType}
                                                onChange={(e) =>
                                                    setSelectedFileType(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option
                                                    value={null}
                                                    disabled
                                                    selected
                                                >
                                                    Select file type
                                                </option>
                                                {fileTypes.map((fileType) => (
                                                    <option
                                                        key={fileType.id}
                                                        value={fileType.name}
                                                        selected={
                                                            selectedFileType ===
                                                            fileType.name
                                                        }
                                                    >
                                                        {fileType.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>
                            {/* Add file input field for uploading multiple files */}
                            <div className="upload-documents__content-block">
                                <div className="upload-documents__row">
                                    <div className="upload-documents__content-row-block">
                                        <Form.Group
                                            controlId="formFileMultiple"
                                            className="upload-documents__row-block"
                                        >
                                            <Form.Label className="upload-documents__form-title">
                                                Завантажити файли
                                            </Form.Label>
                                            <Form.Control
                                                type="file"
                                                multiple
                                                className="add-task-form__input"
                                                onChange={handleFiles}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <UploadDocumentsFooterComponent
                            setShowUploadDocumentsModal={
                                setShowUploadDocumentsModal
                            }
                        />
                    </Form>
                </div>
            </div>
        </>
    );
};

export default UploadDocumentsComponent;
