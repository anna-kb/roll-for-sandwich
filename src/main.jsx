import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { SandwichProvider } from "./SandwichContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SandwichProvider>
      <App />
    </SandwichProvider>
  </React.StrictMode>
);
