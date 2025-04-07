import React from "react";
import {Routes, Route, Navigate } from "react-router-dom";
import Login from "./UserAuthentication/login/Login";
import Register from "./UserAuthentication/registration/Register";
import Home from "./HomePage/src/HomeApp"
import { useAuthentication } from "./UserAuthentication/userauthentication"
import AboutUs from "./HomePage/pages/AboutUs";
import FAQOther from "./HomePage/pages/FAQOther";
import LandingLayout from "./UserAuthentication/LandingLayout";
import BackgroundWrapper from "./HomePage/pages/BackgroundWrapper";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthentication();
  
  if (loading) return <p> Loading...</p>
  return user ? children : <Navigate to="/about-us" replace />
};

function App(){
  const { user, loading } = useAuthentication();

  if (loading) return <p>Loading...</p>;
  
  return (
    <Routes>
      {/* Default Route: Redirect to login page if user is not authenticated */}
      <Route path="/" element={user ? <Navigate to="/home" replace /> : <Navigate to="/about-us" replace />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<LandingLayout />}>
        <Route path='/faqother' element={<FAQOther />} />
        <Route path='/about-us' element={<AboutUs />} />
      </Route>
      
      {/* Protected Route */}
      <Route path="/home/*" element={<PrivateRoute> <BackgroundWrapper> <Home /> </BackgroundWrapper> </PrivateRoute>} />

      {/* Catch-all: Redirect unknown routes to the login page */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;