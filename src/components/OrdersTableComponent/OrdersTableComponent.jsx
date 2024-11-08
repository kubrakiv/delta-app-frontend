import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  listOrderDetails,
  listOrders,
} from "../../actions/orderActions";
import "./OrdersTableComponent.scss";
import tableHead from "./tableHead.json";
import chroma from "chroma-js";
import PricePerKmComponent from "../../screens/OrderPage/PricePerKmComponent/PricePerKmComponent";
import { round } from "../../utils/round";
import { formattedTime } from "../../utils/formattedTime";
import { set } from "date-fns";

function OrdersTableComponent() {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.ordersInfo.orders);
  const { loading, data: ordersData, error } = orderList;

  const editModeOrder = useSelector((state) => state.ordersInfo.editMode);

  const [hoveredOrder, setHoveredOrder] = useState(null);
  const [orderId, setOrderId] = useState(null);

  let hoverTimer;

  const handleMouseEnter = (order) => {
    hoverTimer = setTimeout(() => {
      setHoveredOrder(order);
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer);
    setHoveredOrder(null);
  };

  const [hovered, setHovered] = useState(false);

  const [selectedOrders, setSelectedOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listOrders());
  }, []);

  const handleRowDoubleClick = (order) => {
    navigate(`/orders/${order.id}`);
  };

  // const handleAddOrderButtonClick = async (e) => {
  //     e.preventDefault();
  //     try {
  //         const response = await axios.post(
  //             `/api/orders/create/`,
  //             {},
  //             {
  //                 headers: {
  //                     "X-CSRFToken": csrfToken,
  //                 },
  //             }
  //         );

  //         console.log("Blank order created successfully:", response.data);
  //         setOrders([...orders, response.data]);
  //     } catch (error) {
  //         console.error("Error creating blank order:", error.message);
  //     }
  // };

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
    console.log("Delete selected orders", selectedOrders);

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
      console.log("Deleting selected orders", selectedOrders);
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

    // Extract country codes and remove duplicates
    const routeArray = data.tasks
      .map((task) => task?.point_details?.country_short)
      .filter((value, index, self) => self.indexOf(value) === index);

    const route = routeArray.join("-");
    return route;
  };

  // TODO create a statuses component in the table
  // Function to set loading and unloading statuses
  // const setStatus = (task) => {
  //     if (task.type === "Завантаження") {
  //         if (task.end_date && task.end_time) {
  //             setLoadingStatus(true);
  //         } else {
  //             setLoadingStatus(false);
  //         }
  //     } else if (task.type === "Розвантаження") {
  //         if (task.end_date && task.end_time) {
  //             setUnloadingStatus(true);
  //         } else {
  //             setUnloadingStatus(false);
  //         }
  //     }
  // };

  // Find loading and unloading tasks and set statuses
  // orders.forEach((order) => {
  //     order.tasks &&
  //         order.tasks.forEach((task) => {
  //             if (task.type === "Завантаження") {
  //                 setStatus(task); // Set loading status
  //                 if (task.end_date && task.end_time) {
  //                     setLoadingStartDate(task.end_date);
  //                     setLoadingStartTime(task.end_time);
  //                 }
  //             } else if (task.type === "Розвантаження") {
  //                 setStatus(task); // Set unloading status
  //                 if (task.end_date && task.end_time) {
  //                     setUnloadingStartDate(task.end_date);
  //                     setUnloadingStartTime(task.end_time);
  //                 }
  //             }
  //         });
  // });

  return (
    <>
      <div className="orders-table-container">
        <div className="orders-header-block">
          <h2 className="table__name">Реєстр маршрутів</h2>
          <div className="orders-header-block__buttons-container">
            <button
              type="button"
              className="orders-header-block__add-order-btn"
              // onClick={handleAddOrderButtonClick}
            >
              Додати пустий маршрут
            </button>
            <button
              type="button"
              className="orders-header-block__add-order-btn"
              style={buttonStyle}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={handleDeleteSelectedOrders}
            >
              Видалити маршрути
            </button>
          </div>
        </div>
        {loading ? (
          <h3>Loading</h3>
        ) : error ? (
          <h4>{error}</h4>
        ) : (
          <div className="table-container">
            <table className="orders-table">
              <thead className="orders-table__header">
                <tr className="orders-table__header-row">
                  {tableHead.map((col, index) => (
                    <th key={index} className="orders-table__header-th">
                      {Object.values(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="orders-table__body">
                {ordersData.map((order) => (
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

                    <td className="orders-table__body-td">
                      {extractRoute(order)}
                    </td>
                    <td className="orders-table__body-td">{order.number}</td>
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

                    <td className="orders-table__body-td">{order.driver}</td>
                    <td className="orders-table__body-td">{order.truck}</td>
                    <td className="orders-table__body-td">{"9AF1015"}</td>
                    <td className="orders-table__body-td">
                      {order.loading_end_date
                        ? order.loading_end_date
                        : order.loading_start_date}
                    </td>
                    <td className="orders-table__body-td">
                      {order.loading_end_time
                        ? formattedTime(order.loading_end_time)
                        : "No time"}
                      {/* {order.loading_end_time
                        ? formattedTime(order.loading_end_time)
                        : formattedTime(order.loading_start_time)} */}
                    </td>
                    <td className="orders-table__body-td">
                      {order.unloading_end_date
                        ? order.unloading_end_date
                        : order.unloading_start_date}
                    </td>
                    <td className="orders-table__body-td">
                      {order.unloading_end_time
                        ? formattedTime(order.unloading_end_time)
                        : "No time"}
                      {/* {order.unloading_end_time
                        ? formattedTime(order.unloading_end_time)
                        : formattedTime(order.unloading_start_time)} */}
                    </td>
                    <td className="orders-table__body-td">{order.distance}</td>
                    <td className="orders-table__body-td">{order.price}</td>
                    <td className="orders-table__body-td">
                      <PricePerKmComponent
                        type={"table"}
                        price={order.price}
                        distance={order.distance}
                      />
                    </td>
                    <td className="orders-table__body-td">
                      {order.market_price}
                    </td>
                    <td className="orders-table__body-td">{"STATUS"}</td>
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
