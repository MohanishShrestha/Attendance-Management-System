import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkInRequest, checkOutRequest, clearMessage, fetchAttendanceRequest, leaveRequest } from "../features/attendance/attendanceSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.attendance?.attendances);
  const userName = useSelector((state) => state.attendance?.attendances[0]?.user?.name);
  const loading = useSelector((state) => state.attendance?.loading);
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveError, setLeaveError] = useState(null);
  const message = useSelector((state) => state.attendance?.message);
  const error = useSelector((state) => state.attendance?.error);


  let token = localStorage.getItem("token");
  function parseJwt(token) {
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }
  const decoded = parseJwt(token);
  const userId = decoded ? decoded.id : null;

  const handleCheckIn = () => {
    if (loading) return;
    dispatch(checkInRequest());
  };

 
  const handleCheckOut = () => {
    dispatch(checkOutRequest());
  };


  const handleLeave = async () => {
    if (!leaveDate) {
      setLeaveError("Please select a leave date.");
      return;
    }
    setLeaveError(null);
    dispatch(leaveRequest({ date: leaveDate }));
    setLeaveDate("");
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchAttendanceRequest(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  return (
    <Container>
      <Box mt={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Welcome to Dashboard {userName}
        </Typography>

        <Box mt={3} display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            color="success"
            onClick={handleCheckIn}
            disabled={loading}
          >
            Check In
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleCheckOut}
            disabled={loading}
          >
            Check Out
          </Button>
        </Box>

        <Box
          mt={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <TextField
            type="date"
            label="Leave Date"
            InputLabelProps={{ shrink: true }}
            value={leaveDate}
            onChange={(e) => setLeaveDate(e.target.value)}
            error={Boolean(leaveError)}
            helperText={leaveError}
          />
          <Button variant="contained" onClick={handleLeave} disabled={loading}>
            Apply Leave
          </Button>
        </Box>

        {message && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {loading && (
          <Box mt={4} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Attendance Records
          </Typography>
          {records.length === 0 ? (
            <Typography>No attendance records found.</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Check-In</TableCell>
                  <TableCell>Check-Out</TableCell>
                  <TableCell>Leave</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      {new Date(record.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {record.checkIn ? record.checkIn : "-"}
                    </TableCell>
                    <TableCell>
                      {record.checkOut ? record.checkOut : "-"}
                    </TableCell>
                    <TableCell>{record.status ? record.status : "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
