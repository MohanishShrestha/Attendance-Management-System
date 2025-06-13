import { all } from "redux-saga/effects";
import attendanceSaga from "../features/attendance/attendanceSaga";
import userSaga from "../features/user/userSaga";

export default function* rootSaga() {
  yield all([
    attendanceSaga(),
    userSaga(),
    
  ]);
}



