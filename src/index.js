import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { GlobalContextProvider } from "./context/globalContext";
import { CanadaContextProvider } from "./context/canadaContext";
import { UserProvider } from "./context/userContext";
ReactDOM.render(
  <Auth0Provider
    domain="dev-q1yz-ouh.us.auth0.com"
    clientId="f0ttBuAYqY8KkjeIoEfWp5xB2b9nHLvS"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <UserProvider>
      <GlobalContextProvider>
        <CanadaContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </CanadaContextProvider>
      </GlobalContextProvider>
    </UserProvider>
  </Auth0Provider>
  ,
  document.getElementById("root")
);
