import axios from "axios";

export const SET_EDIT_MODE_ORDER = "SET_EDIT_MODE_ORDER";
export const SET_ADD_TASK_MODE = "SET_ADD_TASK_MODE";
export const SET_ADD_TASK_NO_ORDER_MODE = "SET_ADD_TASK_NO_ORDER_MODE";
export const SET_ORDER_LIST_DATA = "SET_ORDER_LIST_DATA";
export const SET_ORDER_DETAILS_DATA = "SET_ORDER_DETAILS_DATA";
export const SET_EDIT_MODE_TASK = "SET_EDIT_MODE_TASK";
export const SET_DELETE_ORDER = "SET_DELETE_ORDER";
export const SET_TASK_LIST_NO_ORDER = "SET_TASK_LIST_NO_ORDER";
export const SET_CLEAR_TASK_LIST_NO_ORDER = "SET_CLEAR_TASK_LIST_NO_ORDER";
export const SET_SELECTED_DRIVER = "SET_SELECTED_DRIVER";
export const SET_SELECTED_TRUCK = "SET_SELECTED_TRUCK";
export const SET_SHOW_TASK_MODAL = "SET_SHOW_TASK_MODAL";

export const listOrders = () => async (dispatch) => {
  try {
    dispatch(setOrderListData({ loading: true, error: null }));

    const { data } = await axios.get("/api/orders/");
    dispatch(setOrderListData({ data, loading: false }));
  } catch (error) {
    dispatch(setOrderListData({ error: error.message, loading: false }));
  }
};

export const listOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(setOrderDetailsData({ loading: true, error: null }));

    const { data } = await axios.get(`/api/orders/${id}/`);

    dispatch(setOrderDetailsData({ data, loading: false }));
  } catch (error) {
    dispatch(setOrderDetailsData({ error: error.message, loading: false }));
  }
};

export const updateOrder =
  (dataToUpdate, orderId) => async (dispatch, getState) => {
    try {
      dispatch(setOrderDetailsData({ loading: true }));

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/edit/${orderId}/`,
        dataToUpdate,
        config
      );

      dispatch(setOrderDetailsData({ data }));
    } catch (error) {
      dispatch(setOrderDetailsData({ error: error.message }));
    } finally {
      dispatch(setOrderDetailsData({ loading: false }));
    }
  };

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/orders/delete/${orderId}/`,
      config
    );
    dispatch(setDeleteOrder(data.id));
    // Re-fetch updated order list after deletion
    dispatch(listOrders());
  } catch (error) {
    console.error(error);
  }
};

export const setDeleteOrder = (id) => ({
  type: SET_DELETE_ORDER,
  data: id,
});

export const setOrderListData = (data) => ({
  type: SET_ORDER_LIST_DATA,
  data,
});

export const setOrderDetailsData = (data) => ({
  type: SET_ORDER_DETAILS_DATA,
  data,
});

export const setEditModeOrder = (editModeOrder) => ({
  type: SET_EDIT_MODE_ORDER,
  payload: editModeOrder,
});

export const setAddTaskMode = (addTaskMode) => ({
  type: SET_ADD_TASK_MODE,
  payload: addTaskMode,
});

export const setAddTaskNoOrderMode = (addTaskNoOrderMode) => ({
  type: SET_ADD_TASK_NO_ORDER_MODE,
  payload: addTaskNoOrderMode,
});

export const setEditModeTask = (task, editModeTask) => ({
  type: SET_EDIT_MODE_TASK,
  data: task,
  payload: editModeTask,
});

export const setTaskListNoOrder = (taskListNoOrder) => ({
  type: SET_TASK_LIST_NO_ORDER,
  data: taskListNoOrder,
});

export const clearTaskListNoOrder = () => ({
  type: SET_CLEAR_TASK_LIST_NO_ORDER,
});

export const setSelectedDriver = (driver) => ({
  type: SET_SELECTED_DRIVER,
  data: driver,
});

export const setSelectedTruck = (truck) => ({
  type: SET_SELECTED_TRUCK,
  data: truck,
});

export const setShowTaskModal = (showTaskModal) => ({
  type: SET_SHOW_TASK_MODAL,
  payload: showTaskModal,
});
