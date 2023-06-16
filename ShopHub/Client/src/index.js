import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ContextCart from "./context/ContextCart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextCart>
      <App />
    </ContextCart>
  </React.StrictMode>
);
