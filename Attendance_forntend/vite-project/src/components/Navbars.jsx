import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutRequest } from "../features/user/userSlice";

const Navbars = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutRequest());
    navigate("/login");
  };
  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
          <Typography variant="h6" color="primary">
            Attendance App
          </Typography>
        </Link>

        <Box>
          <Button
            component={NavLink}
            to="/"
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
            to="/contact"
            sx={{
              color: "primary.main",
              mx: 1,
              "&.active": { fontWeight: "bold", borderBottom: "2px solid" },
            }}
          >
            Contact
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

export default Navbars;
