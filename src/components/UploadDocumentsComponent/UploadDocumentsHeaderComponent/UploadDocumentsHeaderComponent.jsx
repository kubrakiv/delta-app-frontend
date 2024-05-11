import React from "react";

const UploadDocumentsHeaderComponent = ({ order }) => {
    return (
        <>
            <div className="upload-documents__header">
                <div className="upload-documents__header-block">
                    Документи до маршруту {order.number}
                </div>
            </div>
        </>
    );
};

export default UploadDocumentsHeaderComponent;
