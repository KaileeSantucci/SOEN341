import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthGuard from "./components/AuthGuard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthGuard>
      <App />
    </AuthGuard>
  </BrowserRouter>
);
