import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./UserAuthentication/login/Login";
import Register from "./UserAuthentication/registration/register";
import Home from "./HomePage/src/HomeApp"
import { useAuthentication } from "./UserAuthentication/userauthentication"

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthentication();
  
  if (loading) return <p> Loading...</p>
  return user ? children : <Navigate to="/login" replace />
};

function App(){
  const { user, loading } = useAuthentication();

  if (loading) return <p>Loading...</p>;
  
  return (
    <Routes>
      {/* Default Route: Redirect to login page if user is not authenticated */}
      <Route path="/" element={user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Route */}
      <Route path="/home/*" element={<PrivateRoute><Home /></PrivateRoute>} />

      {/* Catch-all: Redirect unknown routes to the login page */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;