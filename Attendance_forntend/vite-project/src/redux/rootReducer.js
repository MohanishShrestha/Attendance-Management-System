import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import attendanceReducer from "../features/attendance/attendanceSlice";
import userReducer from "../features/user/userSlice";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};
const rootReducer = combineReducers({
  attendance: attendanceReducer,

  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
