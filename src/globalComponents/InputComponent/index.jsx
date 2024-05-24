import React from "react";
import "./style.scss";

const InputComponent = (
    key,
    id,
    name,
    value,
    placeholder,
    onChange,
    autoFocus,
    label,
    multiple,
    type
) => {
    return (
        <>
            {label && (
                <label className="upload-documents__form-title">{label}</label>
            )}
            <input
                multiple={multiple}
                key={key}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder} // FIXME: I don't understand why placeholder is not rendering
                className="form-field__input form-select-mb5"
                value={value}
                onChange={onChange}
                autoFocus={autoFocus}
            />
        </>
    );
};

export default InputComponent;
