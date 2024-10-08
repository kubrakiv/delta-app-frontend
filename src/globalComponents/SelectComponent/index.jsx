import React from "react";
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
        <option value={""} disabled>
          {title}
        </option>
        {options.map((item) => (
          <option key={item.label} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectComponent;
