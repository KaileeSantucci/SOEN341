import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated (if authToken exists)
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/login"); // Redirect to login page if not authenticated
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className='container'>
      <List />
      <Chat />
      <Detail />
    </div>
  );
};

export default App;
