import React from "react";
import { FaRegWindowClose } from "react-icons/fa";
import "./DriverSearchComponent.scss";

const DriverSearchComponent = ({ search, setSearch }) => {
    return (
        <div className="driver-search-container">
            <div className="driver-search-title">Пошук водія</div>
            <input
                type="text"
                className="input-driver-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Введіть ім'я або прізвище водія"
            />
            <div
                className="driver-search-close-btn"
                onClick={() => setSearch("")}
            >
                ✖️
            </div>
        </div>
    );
};

export default DriverSearchComponent;
