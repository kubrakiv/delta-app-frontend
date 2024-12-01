import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import chroma from "chroma-js";

import { deleteOrder, listOrders } from "../../actions/orderActions";
import { formattedTime } from "../../utils/formattedTime";
import { listTrucks } from "../../features/trucks/trucksOperations";
import { listDrivers } from "../../actions/driverActions";
import { transformDate } from "../../utils/formatDate";
import { findTrailer } from "../../utils/getTrailer";

import tableHead from "./tableHead.json";

import PricePerKmComponent from "../../screens/OrderPage/PricePerKmComponent/PricePerKmComponent";
import OrderActionsComponent from "./OrderActionsComponent";
import InvoiceStatusComponent from "./InvoiceStatusComponent";
import OrderStatusComponent from "./OrderStatusComponent";

import { FaCheck } from "react-icons/fa";
import SwitchComponent from "../SwitchComponent/SwitchComponent";

import "./OrdersTableComponent.scss";

function OrdersTableComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.ordersInfo.orders);
  const { loading, data: ordersData, error } = orderList;

  const trucks = useSelector((state) => state.trucksInfo.trucks.data);

  const selectedDriver = useSelector(
    (state) => state.ordersInfo.selectedDriver
  );
  const selectedTruck = useSelector((state) => state.ordersInfo.selectedTruck);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [hoveredOrder, setHoveredOrder] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const [hovered, setHovered] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const [showAddresses, setShowAddresses] = useState(true); // New state to show/hide address fields
  const [showTruckData, setShowTruckData] = useState(true); // New state to show/hide truck data
  const [showDateTime, setShowDateTime] = useState(true); // New state to show/hide date and time fields

  let hoverTimer;

  useEffect(() => {
    dispatch(listTrucks());
    dispatch(listDrivers());
  }, []);

  const handleMouseEnter = (order) => {
    hoverTimer = setTimeout(() => {
      setHoveredOrder(order);
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer);
    setHoveredOrder(null);
  };

  useEffect(() => {
    dispatch(listOrders());
  }, []);

  const handleRowDoubleClick = (order) => {
    navigate(`/orders/${order.id}`);
  };

  const buttonStyle = {
    backgroundColor: hovered ? "red" : chroma("red").darken(0.6).hex(),
  };

  const handleCheckboxChange = (orderID) => {
    setSelectedOrders((prevSelectedOrders) => {
      if (prevSelectedOrders.includes(orderID)) {
        return prevSelectedOrders.filter((id) => id !== orderID);
      } else {
        return [...prevSelectedOrders, orderID];
      }
    });
  };

  const handleDeleteSelectedOrders = () => {
    if (selectedOrders.length === 0) {
      window.alert("Виберіть замовлення для видалення"); // Alert if no orders are selected
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete the selected orders?"
    );
    if (!confirmDelete) {
      return; // Exit if the user cancels the deletion
    }

    if (confirmDelete) {
      try {
        for (let orderId of selectedOrders) {
          dispatch(deleteOrder(orderId)); // Dispatch delete action for each order
        }
        setSelectedOrders([]); // Clear selected orders after deletion
      } catch (error) {
        console.error("Error deleting orders:", error.message); // Handle any errors during deletion
      }
    }
  };

  const extractRoute = (data) => {
    if (!data.tasks || data.tasks.length === 0) {
      return "No tasks";
    }

    // Extract country codes and ensure they are unique
    const routeArray = data.tasks
      .map((task) => task?.point_details?.country_short)
      .filter((value, index, self) => self.indexOf(value) === index);

    // If all tasks are in the same country, return 'COUNTRY-CODE-COUNTRY-CODE'
    if (routeArray.length === 1) {
      return `${routeArray[0]}-${routeArray[0]}`;
    }

    // Otherwise, join the unique country codes with a dash
    const route = routeArray.join("-");
    return route;
  };

  const filteredOrders = ordersData
    .filter((order) => {
      const driverSearch = selectedDriver?.toLowerCase();
      return (
        driverSearch === "" || order.driver.toLowerCase().includes(driverSearch)
      );
    })
    .filter((order) => {
      const truckSearch = selectedTruck?.toLowerCase();
      return (
        truckSearch === "" || order.truck.toLowerCase().includes(truckSearch)
      );
    })
    .filter((order) => {
      // Date Filtering
      const loadingStartDate = new Date(order.loading_start_date);
      if (startDate && loadingStartDate <= startDate) return false;
      if (endDate && loadingStartDate >= endDate) return false;
      return true;
    });

  // Function to parse order number and return the components
  const parseOrderNumber = (orderNumber) => {
    const [incremental, month, year] = orderNumber
      .split("-")
      .map((value, index) => (index === 0 ? Number(value) : Number(value)));
    // Assume the year is in the format '24', representing 2024
    const fullYear = year < 50 ? 2000 + year : 1900 + year; // Adjust year parsing logic as needed
    return { incremental, month, fullYear };
  };

  // Sort the filteredOrders array based on the parsed components
  const sortedOrders = filteredOrders.sort((a, b) => {
    const {
      incremental: incA,
      month: monthA,
      fullYear: yearA,
    } = parseOrderNumber(a.number);
    const {
      incremental: incB,
      month: monthB,
      fullYear: yearB,
    } = parseOrderNumber(b.number);

    if (yearA !== yearB) {
      return yearA - yearB;
    }
    if (monthA !== monthB) {
      return monthA - monthB;
    }
    return incA - incB; // Sort by incremental number if year and month are the same
  });

  return (
    <>
      <div className="orders-table-container">
        <div className="orders-header-block">
          <h2 className="table__name">Реєстр маршрутів</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <SwitchComponent
              type="orders-table"
              isToggled={showTruckData}
              onToggle={() => setShowTruckData(!showTruckData)}
              title="Truck"
            />
            <SwitchComponent
              type="orders-table"
              isToggled={showDateTime}
              onToggle={() => setShowDateTime(!showDateTime)}
              title="Date"
            />
            <SwitchComponent
              type="orders-table"
              isToggled={showAddresses}
              onToggle={() => setShowAddresses(!showAddresses)}
              title="Route"
            />
          </div>
        </div>
        <OrderActionsComponent
          onDelete={handleDeleteSelectedOrders}
          selectedDriver={selectedDriver}
          selectedTruck={selectedTruck}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(date) => setStartDate(date)}
          onEndDateChange={(date) => setEndDate(date)}
        />
        {loading ? (
          <h3>Loading</h3>
        ) : error ? (
          <h4>{error}</h4>
        ) : (
          <div className="table-container">
            <table className="orders-table">
              <thead className="orders-table__header">
                <tr className="orders-table__header-row">
                  {tableHead
                    .filter((col) => {
                      if (!showAddresses) {
                        // Hide specific columns based on toggle state
                        return (
                          col["Loading Address"] !== "Loading Address" &&
                          col["Unloading Address"] !== "Unloading Address"
                        );
                      }
                      return true;
                    })
                    .filter((col) => {
                      if (!showDateTime) {
                        // Hide specific columns based on toggle state
                        return (
                          col["Loading Date"] !== "Loading Date" &&
                          col["Loading Time"] !== "Loading Time" &&
                          col["Unloading Date"] !== "Unloading Date" &&
                          col["Unloading Time"] !== "Unloading Time"
                        );
                      }
                      return true;
                    })
                    .filter((col) => {
                      if (!showTruckData) {
                        // Hide specific columns based on toggle state
                        return (
                          col["Truck"] !== "Truck" &&
                          col["Driver"] !== "Driver" &&
                          col["Trailer"] !== "Trailer"
                        );
                      }
                      return true;
                    })
                    .map((col, index) => (
                      <th key={index} className="orders-table__header-th">
                        {Object.values(col)}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="orders-table__body">
                {sortedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="orders-table__body-row"
                    onDoubleClick={() => handleRowDoubleClick(order)}
                  >
                    <td className="orders-table__body-td">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleCheckboxChange(order.id)}
                      />
                    </td>
                    {/* Order status */}
                    <td className="orders-table__body-td">
                      <OrderStatusComponent order={order} />
                    </td>
                    {/* Invoice status */}
                    <td className="orders-table__body-td">
                      <InvoiceStatusComponent order={order} />
                    </td>
                    {/* Documents status */}
                    <td className="orders-table__body-td">
                      <FaCheck style={{ color: "red" }} />
                    </td>

                    <td className="orders-table__body-td">
                      {extractRoute(order)}
                    </td>
                    <td className="orders-table__body-td">{order.number}</td>
                    {showAddresses && (
                      <td className="orders-table__body-td">
                        {order.tasks &&
                          order.tasks
                            .filter((task) => task.type === "Loading")
                            .map((task) => (
                              <div key={task.id}>
                                {task.point_details?.country_short}-
                                {task.point_details?.postal_code}{" "}
                                {task.point_details?.city}
                              </div>
                            ))}
                      </td>
                    )}
                    {showAddresses && (
                      <td className="orders-table__body-td">
                        {order.tasks &&
                          order.tasks
                            .filter((task) => task.type === "Unloading")
                            .map((task) => (
                              <div key={task.id}>
                                {task.point_details?.country_short}-
                                {task.point_details?.postal_code}{" "}
                                {task.point_details?.city}
                              </div>
                            ))}
                      </td>
                    )}
                    <td
                      className="orders-table__body-td"
                      onMouseEnter={() => handleMouseEnter(order)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {hoveredOrder && hoveredOrder.id === order.id
                        ? order.customer_manager
                        : order.customer}
                    </td>
                    <td className="orders-table__body-td">
                      {order.order_number}
                    </td>
                    <td className="orders-table__body-td">
                      {order.payment_period}
                    </td>
                    <td className="orders-table__body-td">
                      {order.user && order.user.full_name}
                    </td>
                    <td className="orders-table__body-td">{order.platform}</td>

                    {showTruckData && (
                      <td className="orders-table__body-td">{order.driver}</td>
                    )}
                    {showTruckData && (
                      <td className="orders-table__body-td">{order.truck}</td>
                    )}
                    {showTruckData && (
                      <td className="orders-table__body-td">
                        {findTrailer(order.truck, trucks)}
                      </td>
                    )}
                    {showDateTime && (
                      <td className="orders-table__body-td">
                        {order.loading_end_date
                          ? transformDate(order.loading_end_date)
                          : transformDate(order.loading_start_date)}
                      </td>
                    )}
                    {showDateTime && (
                      <td className="orders-table__body-td">
                        {order.loading_end_time ? (
                          formattedTime(order.loading_end_time)
                        ) : (
                          <FaCheck style={{ color: "red" }} />
                        )}
                      </td>
                    )}
                    {showDateTime && (
                      <td className="orders-table__body-td">
                        {order.unloading_end_date
                          ? transformDate(order.unloading_end_date)
                          : transformDate(order.unloading_start_date)}
                      </td>
                    )}
                    {showDateTime && (
                      <td className="orders-table__body-td">
                        {order.unloading_end_time ? (
                          formattedTime(order.unloading_end_time)
                        ) : (
                          <FaCheck style={{ color: "red" }} />
                        )}
                      </td>
                    )}
                    <td className="orders-table__body-td">{order.distance}</td>
                    <td className="orders-table__body-td">{order.price}</td>
                    <td className="orders-table__body-td">{order.currency}</td>
                    <td className="orders-table__body-td">
                      <PricePerKmComponent
                        type={"table"}
                        price={order.price}
                        distance={order.distance}
                        currency={order.currency}
                      />
                    </td>
                    <td className="orders-table__body-td">
                      {order.market_price}
                    </td>
                    <td className="orders-table__body-td">
                      {order.invoice && order.invoice.number}
                    </td>
                    <td className="orders-table__body-td">
                      {order.invoice &&
                        transformDate(order.invoice.invoicing_date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default OrdersTableComponent;
