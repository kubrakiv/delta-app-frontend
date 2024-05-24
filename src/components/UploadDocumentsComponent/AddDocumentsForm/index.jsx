import React, { useEffect, useState } from "react";
import UploadDocumentsFooterComponent from "../UploadDocumentsFooterComponent/UploadDocumentsFooterComponent";
import axios from "axios";
import { getCsrfToken } from "../../../utils/getCsrfToken";
import { useSelector } from "react-redux";
import SelectComponent from "../../../globalComponents/SelectComponent";

const AddDocumentsForm = () => {
    const order = useSelector((state) => state.ordersInfo.order.data);
    const [files, setFiles] = useState([]);
    const [fileTypes, setFileTypes] = useState([]);

    const [selectedFileType, setSelectedFileType] = useState("");

    const handleFiles = (e) => {
        const files = Array.from(e.target.files);
        setFiles(files);

        console.log("Uploaded files:", files);
    };

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/api/file-types/");
            setFileTypes(data);
        })();
    }, []);

    useEffect(() => {
        getCsrfToken();
    }, []);

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
            // onDocumentUpload(response.data);
            console.log(response.data, "this is uploaded files");
            // handleCloseDocumentModal();
        } catch (error) {
            console.log("Error", error);
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="upload-documents-form">
            <div className="upload-documents__content">
                <div className="upload-documents__content-block">
                    <div className="upload-documents__row">
                        <div className="upload-documents__content-row-block">
                            <div
                                controlId="date"
                                className="upload-documents__row-block"
                            >
                                <SelectComponent
                                    label="Вибрати тип документу"
                                    title="Тип документу"
                                    id="file types"
                                    name="file types"
                                    value={selectedFileType}
                                    onChange={(e) =>
                                        setSelectedFileType(e.target.value)
                                    }
                                    options={fileTypes.map((fileType) => (
                                        <option
                                            key={fileType.id}
                                            value={fileType.name}
                                        >
                                            {fileType.name}
                                        </option>
                                    ))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="upload-documents__content-block">
                    <div className="upload-documents__row">
                        <div className="upload-documents__content-row-block">
                            <div
                                controlId="formFileMultiple"
                                className="upload-documents__row-block"
                            >
                                <label className="upload-documents__form-title">
                                    Завантажити файли
                                </label>
                                <input
                                    // label="Завантажити файли"
                                    type="file"
                                    name="files"
                                    id="formFileMultiple"
                                    multiple
                                    onChange={handleFiles}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UploadDocumentsFooterComponent />
        </form>
    );
};

export default AddDocumentsForm;
