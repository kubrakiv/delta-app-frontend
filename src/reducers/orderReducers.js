import { add } from "date-fns";
import {
  SET_EDIT_MODE_ORDER,
  SET_ORDER_LIST_DATA,
  SET_ORDER_DETAILS_DATA,
  SET_EDIT_MODE_TASK,
  SET_ADD_TASK_MODE,
  SET_ADD_TASK_NO_ORDER_MODE,
  SET_DELETE_ORDER,
  SET_TASK_LIST_NO_ORDER,
  SET_CLEAR_TASK_LIST_NO_ORDER,
} from "../actions/orderActions";

const initialState = {
  orders: {
    data: [],
    loading: false,
    error: null,
  },
  order: {
    data: {},
    loading: false,
    error: null,
  },
  editMode: false,
  addTaskMode: false,
  addTaskNoOrderMode: false,
  task: {
    data: {},
    editMode: false,
  },
  taskListNoOrder: {
    data: [],
  },
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_LIST_DATA:
      return {
        ...state,
        orders: {
          ...state.orders,
          ...action.data,
          loading: action.data.loading,
          error: action.data.error,
        },
      };

    case SET_ORDER_DETAILS_DATA:
      return {
        ...state,
        order: {
          ...state.order,
          ...action.data,
          loading: action.data.loading,
          error: action.data.error,
        },
      };

    case SET_DELETE_ORDER:
      return {
        ...state,
        orders: {
          ...state.orders,
          data: state.orders.data.filter((order) => order.id !== action.data),
        },
      };

    case SET_EDIT_MODE_ORDER:
      return { ...state, editMode: action.payload };

    case SET_ADD_TASK_MODE:
      return { ...state, addTaskMode: action.payload };

    case SET_ADD_TASK_NO_ORDER_MODE:
      return { ...state, addTaskNoOrderMode: action.payload };

    case SET_EDIT_MODE_TASK:
      return {
        ...state,
        task: {
          ...state.task,
          data: action.data,
          editModeTask: action.payload,
        },
      };

    case SET_TASK_LIST_NO_ORDER:
      return {
        ...state,
        taskListNoOrder: {
          ...state.taskListNoOrder,
          data: [...state.taskListNoOrder.data, action.data], // Append the new task,
        },
      };

    case SET_CLEAR_TASK_LIST_NO_ORDER:
      return {
        ...state,
        taskListNoOrder: {
          ...state.taskListNoOrder,
          data: [], // Clear the task list by setting it to an empty array
        },
      };

    default:
      return state;
  }
};
