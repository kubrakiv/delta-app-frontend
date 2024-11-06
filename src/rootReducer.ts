import { combineReducers } from "@reduxjs/toolkit";

import { orderReducer } from "./reducers/orderReducers";
import { driverReducer } from "./reducers/driverReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import { mapDefaultCenter } from "./reducers/mapReducers";
import { paymentTypeReducer } from "./reducers/paymentTypeReducers";
import { platformReducer } from "./reducers/platformReducers";
import { documentReducer } from "./reducers/documentReducers";
import { pointReducer } from "./reducers/pointReducers";
import { taskTypeReducer } from "./reducers/taskTypeReducers";
import taskReducer from "./features/tasks/tasksSlice";
import truckReducer from "./features/trucks/trucksSlice";
import trailerReducer from "./features/trailers/trailersSlice";
import plannerReducers from "./features/planner/plannerSlice";
import roleReducer from "./features/roles/roleSlice";
import customerReducer from "./features/customers/customersSlice";
import customerManagerReducer from "./features/customerManagers/customerManagersSlice";

const rootReducer = combineReducers({
  ordersInfo: orderReducer,
  pointsInfo: pointReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  map: mapDefaultCenter,
  trucksInfo: truckReducer,
  trailersInfo: trailerReducer,
  driversInfo: driverReducer,
  paymentTypesInfo: paymentTypeReducer,
  platformsInfo: platformReducer,
  documentsInfo: documentReducer,
  taskTypesInfo: taskTypeReducer,
  tasksInfo: taskReducer,
  plannerInfo: plannerReducers,
  rolesInfo: roleReducer,
  customersInfo: customerReducer,
  customerManagersInfo: customerManagerReducer,
});

export default rootReducer;
