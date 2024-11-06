import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PointTableComponent.scss";
import PointSearchComponent from "../PointSearchComponent/PointSearchComponent";
import Modal from "../Modal/Modal";
import AddPointModalComponent from "../AddPoint/AddPointModalComponent/AddPointModalComponent";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import PointModalComponent from "../PointModalComponent";

const PointTableComponent = () => {
  const [points, setPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState({});
  const [search, setSearch] = useState("");
  const [showPointModal, setShowPointModal] = useState(false);
  const [showAddPointModal, setShowAddPointModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handlePointCreate = (pointData) => {
    setPoints((prevPoints) => [...prevPoints, pointData]);
  };

  const handlePointUpdate = (pointId, pointData) => {
    const updatedPoints = points.map((point) => {
      if (point.id === pointId) {
        return pointData;
      }
      return point;
    });
    setPoints(updatedPoints);
  };

  useEffect(() => {
    async function fetchPoints() {
      const { data } = await axios.get("/api/points/");
      setPoints(data);
    }
    fetchPoints();
  }, []);

  const handleRowDoubleClick = (e, point) => {
    console.log("Row double click:", point);
    e.stopPropagation();
    setShowPointModal(true);
    setSelectedPoint(point);
  };
  console.log("ShowPointModal:", showPointModal);

  const handleAddPointButtonClick = (e) => {
    e.stopPropagation();
    setShowAddPointModal(true);
  };

  const handleEditModeButton = (e, point) => {
    e.stopPropagation();
    setEditMode(true);
    setSelectedPoint(point);
    setShowAddPointModal(true);
  };

  const handleDeletePoint = async (e, pointId) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this point?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`/api/points/delete/${pointId}/`);

      setPoints((prevPoints) =>
        prevPoints.filter((point) => point.id !== pointId)
      );
      console.log(`Point with ID ${pointId} was deleted successfully.`);
    } catch (err) {
      console.log("Error deleting point:", err);
    }
  };

  return (
    <>
      {showPointModal && (
        <PointModalComponent
          showPointModal={showPointModal}
          setShowPointModal={setShowPointModal}
          selectedPoint={selectedPoint}
          setSelectedPoint={setSelectedPoint}
        />
      )}
      {showAddPointModal && (
        <AddPointModalComponent
          showAddPointModal={showAddPointModal}
          setShowAddPointModal={setShowAddPointModal}
          onPointCreate={handlePointCreate}
          editMode={editMode}
          selectedPoint={selectedPoint}
          setSelectedPoint={setSelectedPoint}
          onPointUpdate={handlePointUpdate}
        />
      )}
      <div className="points-container">
        <div className="points-header-block">
          <h2 className="table__name">Мої пункти завантаження/розвантаження</h2>
          <button
            className="points-header-block__add-point-btn"
            onClick={handleAddPointButtonClick}
          >
            Створити пункт
          </button>
        </div>
        <PointSearchComponent search={search} setSearch={setSearch} />
        <div className="table-container">
          <table className="points-table">
            <thead className="points-table__header">
              <tr className="points-table__head-row">
                <th className="points-table__head-th">ID</th>
                <th className="points-table__head-th">Customer</th>
                <th className="points-table__head-th">Company Name</th>
                <th className="points-table__head-th">Postal Code</th>
                <th className="points-table__head-th">Country</th>
                <th className="points-table__head-th">City</th>
                <th className="points-table__head-th">Street</th>
                <th className="points-table__head-th">Street Number</th>
                <th className="points-table__head-th">Actions</th>
              </tr>
            </thead>
            <tbody data-link="row" className="points-table__body">
              {points
                .filter((item) => {
                  const searchTerm = search.toLowerCase();
                  return (
                    searchTerm === "" ||
                    item.company_name.toLowerCase().includes(search) ||
                    item.city.toLowerCase().includes(search) ||
                    item.country.toLowerCase().includes(search) ||
                    item.customer.toLowerCase().includes(search)
                  );
                })
                .map((point) => (
                  <tr
                    key={point.id}
                    className="points-table__body-row"
                    onDoubleClick={(e) => handleRowDoubleClick(e, point)}
                  >
                    <td className="points-table__body-td">{point.id}</td>
                    <td className="points-table__body-td">{point.customer}</td>
                    <td className="points-table__body-td">
                      {point.company_name}
                    </td>
                    <td className="points-table__body-td">
                      {point.postal_code}
                    </td>
                    <td className="points-table__body-td">{point.country}</td>
                    <td className="points-table__body-td">{point.city}</td>
                    <td className="points-table__body-td">{point.street}</td>
                    <td className="points-table__body-td">
                      {point.street_number}
                    </td>

                    <td className="points-table__body-td">
                      <button
                        title="Edit point"
                        className="points-table__btn points-table__btn_edit"
                        onClick={(e) => handleEditModeButton(e, point)}
                      >
                        <FaPencilAlt />
                      </button>
                      <button
                        title="Delete point"
                        className="points-table__btn points-table__btn_delete"
                        onClick={(e) => handleDeletePoint(e, point.id)}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PointTableComponent;
