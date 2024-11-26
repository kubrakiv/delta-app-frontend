import "./style.scss";

const InputComponent = ({
  id,
  name,
  value,
  placeholder,
  onChange,
  autoFocus,
  label,
  multiple,
  type,
  required,
  style = null,
}) => {
  return (
    <>
      {label && <label className="input-component__form-title">{label}</label>}
      <input
        multiple={multiple}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={style ? style : "form-field__input form-select-mb5"}
        value={value || ""}
        onChange={onChange}
        autoFocus={autoFocus}
      />
    </>
  );
};

export default InputComponent;
