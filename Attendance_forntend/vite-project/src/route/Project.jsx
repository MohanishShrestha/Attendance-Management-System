import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import Navbars from "../components/Navbars";
import Dashboard from "../pages/Dashboard";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/AdminDashboard";

//to find role
const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded.role; 
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const Project = () => {
  const userRole = getUserRole();
  return (
    <div>
      {
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Navbars />
                <Outlet></Outlet>
              </div>
            }
          ></Route>

          <Route index element={<Dashboard />}></Route>

          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>

          <Route path="/login" element={<Login />}></Route>

          <Route path="/register" element={<Register />}></Route>
        
          <Route
            path="admin"
            element={
              userRole === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      }
    </div>
  );
};

export default Project;
