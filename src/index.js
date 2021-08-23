import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SocketContextProvider } from "SocketContext";
import { SessionContextProvider } from "SessionContext";

ReactDOM.render(
  <React.StrictMode>
    <SocketContextProvider>
      <SessionContextProvider>
        <App />
      </SessionContextProvider>
    </SocketContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
