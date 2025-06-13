import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../features/user/userSlice";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutRequest()); 
    navigate("/login"); 
  };

  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/admin" style={{ textDecoration: "none", cursor: "pointer" }}>
          <Typography variant="h6" color="primary">
            Attendance App Admin
          </Typography>
        </Link>

        <Box>
          <Button
            component={NavLink}
            to="/admin"
            sx={{
              color: "primary.main",
              mx: 1,
              "&.active": { fontWeight: "bold", borderBottom: "1px solid" },
            }}
          >
            Home
          </Button>

          <Button
            component={NavLink}
            to="/login"
            onClick={handleLogout}
            sx={{
              color: "primary.main",
              mx: 1,
              "&.active": { fontWeight: "bold", borderBottom: "2px solid" },
            }}
          >
            LogOut
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
