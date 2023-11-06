import React, { useState, useRef, useEffect } from "react";
import "./Dashboard.scss";

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);

    const toggleModal = (e) => {
        e.stopPropagation();
        setShowModal(!showModal);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27) {
                setShowModal(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    });

    return (
        <>
            <button className="button" onClick={toggleModal}>
                Click to show modal
            </button>
            <div
                className="modal-overlay"
                style={{ display: showModal ? "block" : "none" }}
            >
                <div
                    ref={modalRef}
                    className={`modal-test${showModal ? "" : " hidden"}`}
                    style={{ display: showModal ? "block" : "none" }}
                >
                    <div className="modal-test__close" onClick={toggleModal}>
                        &times;
                    </div>
                    <div className="modal-test__header">Це модальне вікно</div>
                    <div className="modal-test__body">Тут має бути форма</div>
                    <button
                        className="modal-test__modal-button button"
                        onClick={toggleModal}
                    >
                        Close Modal
                    </button>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
