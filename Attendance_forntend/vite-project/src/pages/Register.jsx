import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError, registerRequest } from "../features/user/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { loading, error } = useSelector((state) => state.user);
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!form.name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(form.name)) {
      errors.name = "Name should only contain letters and spaces";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return; // Stop execution if validation fails
    }

    dispatch(registerRequest(form));
    setForm({ name: "", email: "", password: "" });
    toast.success("Register Successful");
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "#1976d2" }} gutterBottom>
          Register Users
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: 400,
            background: "#fff",
            padding: "32px 24px",
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            margin: "0 auto",
          }}
        >
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            error={!!fieldErrors.name}
            helperText={fieldErrors.name}
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            error={!!fieldErrors.password}
            helperText={fieldErrors.password}
            required
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
