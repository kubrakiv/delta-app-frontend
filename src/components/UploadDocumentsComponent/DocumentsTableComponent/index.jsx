import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listDocuments } from "../../../actions/documentActions";

const DocumentsTableComponent = () => {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.ordersInfo.order.data);
    const documents = useSelector(
        (state) => state.documentsInfo.documents.data.documents
    );
    const BASE_URL = "http://localhost:8000";

    useEffect(() => {
        dispatch(listDocuments(order.id));
    }, [order, dispatch]);

    const openDocument = async (documentId) => {
        try {
            const response = await axios.get(`/api/documents/${documentId}`);
            window.open(`${BASE_URL}${response.data.file}`);
        } catch (error) {
            console.error("Error opening document:", error);
        }
    };

    return (
        documents && (
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
                                        const uploadedAtDate = new Date(
                                            document.uploaded_at
                                        );

                                        // Extract date and time components
                                        const formattedDate = uploadedAtDate
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
                                                    {document.file_type}
                                                </td>

                                                <td className="documents-table__body-td documents-table__body-td-wrap">
                                                    {document.file_name}
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
        )
    );
};

export default DocumentsTableComponent;
