import React, { useState } from "react";
import { FaRegUser, FaAngleDown, FaAngleUp } from "react-icons/fa";
import FormWrapper from "../../../components/FormWrapper";

const CarrierManagerComponent = ({ user }) => {
    return (
        <>
            <FormWrapper
                disableEditMode
                title="Відповідальний"
                hiddenContent={
                    <div className="order-details__content-row-block-value">
                        {user.phone_number && (
                            <span>
                                &#9990; {user.phone_number} <br />
                            </span>
                        )}
                        {user.email && <span>&#128386; {user.email}</span>}
                    </div>
                }
                content={
                    <div className="order-details__content-row-block-value">
                        <FaRegUser /> {user.last_name} {user.first_name}
                    </div>
                }
            />
        </>
    );
};

export default CarrierManagerComponent;
