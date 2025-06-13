import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendances: [],
  loading: false,
  error: null,
  message: null,
  excelLoading: false,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    fetchUsersRequest: (state) => {
      state.loading = true;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.attendances = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest: (state) => {
      state.loading = true;
    },
    updateUserRequest: (state) => {
      state.loading = true;
    },
    fetchAttendanceRequest: (state) => {
      state.loading = true;
    },
    fetchAttendanceSuccess: (state, action) => {
      state.loading = false;
      state.attendances = action.payload;
    },
    fetchAttendanceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    exportExcelRequest: (state) => {
      state.excelLoading = true;
    },
    exportExcelSuccess: (state) => {
      state.excelLoading = false;
    },
    exportExcelFailure: (state, action) => {
      state.excelLoading = false;
      state.error = action.payload;
    },
    checkInRequest: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    checkInSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    checkInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "Check-in failed.";
    },
    checkOutRequest: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    checkOutSuccess: (state) => {
      state.loading = false;
      state.message = "Check-out successful.";
    },
    checkOutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "Check-out failed.";
    },
    leaveRequest: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    leaveSuccess: (state) => {
      state.loading = false;
      state.message = "Leave request submitted.";
    },
    leaveFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "Leave request failed.";
    },

    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
});

export const {
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
  checkInSuccess,
  checkInFailure,
  checkOutRequest,
  checkOutSuccess,
  checkOutFailure,
  leaveRequest,
  leaveSuccess,
  leaveFailure,
  clearMessage,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
