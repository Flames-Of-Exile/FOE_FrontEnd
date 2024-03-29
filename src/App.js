import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, makeStyles } from "@material-ui/core";
import Sidebar from "components/main/Sidebar";
import Theme from "Theme";
import useSessionContext from "SessionContext";
import Main from "components/main/Main";
import useSocketContext from "SocketContext";
import { AlertBarContextProvider } from "AlertBarContext";

const axios = require("axios").default;
const url = process.env.REACT_APP_BACKEND || "http://localhost:5000/";
axios.defaults.baseURL = url;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";

const useStyles = makeStyles(() => ({
  app: {
    display: "flex",
  },
}));

const App = () => {
  const classes = useStyles();

  const { disconnect } = useSocketContext();
  const { refresh } = useSessionContext();

  useEffect(() => {
    refresh();
    return () => disconnect();
  }, [refresh]);

  window.onstorage = () => {
    refresh();
  };

  return (
    <AlertBarContextProvider>
      <Theme>
        <div className={classes.app}>
          <Router>
            <CssBaseline />
            <Sidebar />
            <Main />
          </Router>
        </div>
      </Theme>
    </AlertBarContextProvider>
  );
};

export default App;
