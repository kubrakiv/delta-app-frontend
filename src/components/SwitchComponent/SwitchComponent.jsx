import React from "react";
import "./SwitchComponent.scss";

const SwitchComponent = ({ isToggled, onToggle }) => {
    return (
        <label className="switch">
            <input
                className="switch__input"
                type="checkbox"
                checked={isToggled}
                onChange={() => onToggle()}
            />
            <span className="slider" title="Показати водія"></span>
        </label>
    );
};

export default SwitchComponent;
