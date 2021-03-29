import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { GlobalContextProvider } from "./context/globalContext";
import { CanadaContextProvider } from "./context/canadaContext";
ReactDOM.render(
  <GlobalContextProvider>
    <CanadaContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CanadaContextProvider>
  </GlobalContextProvider>,
  document.getElementById("root")
);
