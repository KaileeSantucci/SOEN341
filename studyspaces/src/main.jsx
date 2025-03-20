import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from 'react';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
console.log("main.jsx is being rendered!")
console.log("Current Path: ", window.location.pathname);
