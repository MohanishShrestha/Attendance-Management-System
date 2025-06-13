import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  registerRequest,
  registerSuccess,
  registerFailure,
} from "./userSlice";
import { url } from "../../constant";

function* handleLogin(action) {
  try {
    const response = yield call(() =>
      axios.post(`${url}/user/login`, action.payload)
    );

    const token = response.data.token;
    const user = response.data.data;
    yield put(loginSuccess({ token, user }));
    localStorage.setItem("token", token);
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

function* handleLogout() {
  try {
    localStorage.removeItem("token"); // Clear token
    yield put(logoutSuccess()); // Reset Redux state
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

function* handleRegister(action) {
  try {
    const response = yield call(axios.post, `${url}/user`, action.payload);
    yield put(registerSuccess(response.data));
  } catch (error) {
    yield put(
      registerFailure(error.response?.data?.message || "Registration failed")
    );
  }
}

export default function* userSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
  yield takeLatest(registerRequest.type, handleRegister);
}
