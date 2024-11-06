import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./style.scss";

const SelectComponent = ({
  title,
  id,
  name,
  value,
  onChange,
  options,
  autoFocus,
  label,
  disabled = null,
}) => {
  return (
    <>
      {label && <label className="upload-documents__form-title">{label}</label>}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="form-field__select form-select-mb10"
        autoFocus={autoFocus}
      >
        <option value={""} disabled={disabled}>
          {title}
        </option>
        {options.map((item) => (
          <option key={item.label || item.id || uuidv4()} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectComponent;
