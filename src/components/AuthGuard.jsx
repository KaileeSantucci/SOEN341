import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      console.log("✅ User is authenticated.");
      setIsAuthenticated(true);
    } else {
      console.log("❌ No token found. Redirecting to login...");
      window.location.href = "/login-registration/index.html";  // ✅ Redirect to login
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // ✅ Prevents an infinite redirect loop
  }

  return children;
};

export default AuthGuard;
