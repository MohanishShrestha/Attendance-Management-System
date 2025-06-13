import { Box, Button, Container, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exportExcelRequest } from "../features/attendance/attendanceSlice";
import UserList from "./List";
import Register from "./Register";

export default function AdminDashboard() {
  const [view, setView] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const dispatch = useDispatch();
  const excelLoading = useSelector((state) => state.attendance.excelLoading);

  const handleExcelDownload = () => {
    dispatch(exportExcelRequest());
    setSnackbarMsg("Excel export started...");
    setSnackbarOpen(true);
  };

  const handleViewList = () => {
    setView("list");
    setSnackbarMsg("Displaying user list.");
    setSnackbarOpen(true);
  };

  const handleRegisterUser = () => {
    setView("register");
    setSnackbarMsg("User registration form opened.");
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          pt: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Box display="flex" gap={2}>
          <Button variant="contained" onClick={handleViewList}>
            List Users
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={handleExcelDownload}
            disabled={excelLoading}
          >
            {excelLoading ? "Downloading..." : "Excel Download"}
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleRegisterUser}
          >
            Register User
          </Button>
        </Box>

        {/* User List */}
        {view === "list" && <UserList />}
        {/* Register User Form */}
        {view === "register" && <Register />}

        {/* Snackbar for feedback */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMsg}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </Container>
  );
}
