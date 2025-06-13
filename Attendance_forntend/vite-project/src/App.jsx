import { createContext, useEffect, useState } from "react";
import Navbars from "./components/Navbars";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import AdminNavbar from "./components/AdminNavbar";
import Project from "./route/Project";

export const GlobalVariableContext = createContext();

function App() {
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user?.user);
  const isLoading = useSelector((state) => state.user.loading);

  

  if (isLoading) return <div>Loading...</div>;
  

  const renderContent = () => {
    if (!token || !user) return <Login />;
    return user.role === "admin" ? (
      <GlobalVariableContext.Provider value={{ token, user }}>
        <AdminNavbar />
        <AdminDashboard />
      </GlobalVariableContext.Provider>
    ) : (
      <GlobalVariableContext.Provider value={{ token, user }}>
        <Navbars />
        <Project />
      </GlobalVariableContext.Provider>
    );
  };

  return <>{renderContent()}</>;
}

export default App;
