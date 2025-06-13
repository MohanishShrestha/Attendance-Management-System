import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../api/axios";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  deleteUserRequest,
  updateUserRequest,
  fetchAttendanceRequest,
  fetchAttendanceSuccess,
  fetchAttendanceFailure,
  exportExcelRequest,
  exportExcelSuccess,
  exportExcelFailure,
  checkInRequest,
  checkOutRequest,
  leaveRequest,
  leaveFailure,
  leaveSuccess,
  checkOutFailure,
  checkOutSuccess,
  checkInFailure,
  checkInSuccess,
} from "./attendanceSlice";
import { url } from "../../constant";

const token = localStorage.getItem("token");

function* fetchUsersSaga() {
  try {
    const response = yield call(axios.get, `${url}/user`);

    yield put(fetchUsersSuccess(response.data.result));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

// Delete user
function* deleteUserSaga(action) {
  console.log(action.payload);
  try {
    yield call(axios.delete, `${url}/user/${action.payload}`);
    yield put(fetchUsersRequest()); // Refetch users after delete
  } catch (error) {
    console.error("Delete failed:", error);
  }
}

// Update user
function* updateUserSaga(action) {
  try {
    yield call(
      axios.patch,
      `${url}/user/${action.payload.id}`,
      action.payload.data
    );
    yield put(fetchUsersRequest()); // Refetch users after update
  } catch (error) {
    console.error("Update failed:", error);
  }
}

function* fetchAttendanceSaga(action) {
  try {
    // console.log("Action received:", action);
    // console.log("Payload:", action.payload);
    const response = yield call(
      axios.get,
      `${url}/attendance/${action.payload}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    
    yield put(fetchAttendanceSuccess(response.data.records));
  } catch (error) {
    yield put(
      fetchAttendanceFailure(
        error.response?.data?.message || "Failed to fetch users."
      )
    );
  }
}


function* exportExcelSaga() {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(axios.get, `${url}/attendance/export/excel`, {
      responseType: "blob",
      headers: { Authorization: `Bearer ${token}` },
    });

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const urlBlob = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlBlob;
    a.download = "attendance.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(urlBlob);

    yield put(exportExcelSuccess());
  } catch (error) {
    yield put(
      exportExcelFailure(
        error.response?.data?.message || "Excel export failed."
      )
    );
  }
}

function* checkInSaga(action) {
  try {
    if (!token) {
      console.error("Token missing or expired.");
    }
    const response = yield call(
      axios.post,
      `${url}/attendance/checkin`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const message = response.data.message || "Check-in successful";
    yield put(checkInSuccess(message));
    console.log("Check-in response:", response);
    yield put(fetchAttendanceRequest(response.data.result.user)); 
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Check-in failed";
    yield put(checkInFailure(errorMessage));
  }
}

function* checkOutSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${url}/attendance/checkout`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const message = response.data.message || "Check-out successful";
    yield put(checkOutSuccess(message));
    yield put(fetchAttendanceRequest(response.data.result.user));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Check-out failed";
    yield put(checkOutFailure(errorMessage));
  }
}

function* handleLeaveSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${url}/attendance/leave`,
      { date: action.payload.date },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const message = response.data.message || "Leave request successful";
    yield put(leaveSuccess(message));
    yield put(fetchAttendanceRequest(response.data.result.user));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Leave request failed";
    yield put(leaveFailure(errorMessage));
  }
}


export default function* attendanceSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
  yield takeLatest(deleteUserRequest.type, deleteUserSaga);
  yield takeLatest(updateUserRequest.type, updateUserSaga);
  yield takeLatest(fetchAttendanceRequest, fetchAttendanceSaga);
  yield takeLatest(exportExcelRequest, exportExcelSaga);
  yield takeLatest(checkInRequest, checkInSaga);
  yield takeLatest(leaveRequest, handleLeaveSaga);
  yield takeLatest(checkOutRequest.type, checkOutSaga);
}
