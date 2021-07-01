import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import Sidebar from "components/Sidebar";
import Theme from "Theme";
import AlertBar, { AlertBarContext } from "components/AlertBar";
import SessionContext from "SessionContext";
import Main from "components/Main";
import SocketContext, { Socket } from "SocketContext";

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
  const [socket] = useState(new Socket());

  const [user, setUser] = useState({
    id: 0,
    isAdmin: false,
    discordConfirmed: false,
  });

  const [open, setOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [severity, setSeverity] = useState("");

  const syncLogout = useCallback(() => {
    delete axios.defaults.headers.common["Authorization"];
    setUser({
      id: 0,
      isAdmin: false,
    });
  }, []);

  const refresh = useCallback(async () => {
    try {
      const response = await axios.get("/api/users/refresh");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      socket.connect();
      setUser(response.data.user);
      // token is good for 5 minutes - refresh every 4 minutes, 30 seconds
      setTimeout(refresh, 270000);
    } catch (error) {
      syncLogout();
    }

    return () => {
      socket.disconnect();
    };
  }, [syncLogout]);

  useEffect(() => {
    refresh();
    return () => socket.disconnect();
  }, [refresh]);

  window.onstorage = () => {
    refresh();
  };

  return (
    <SessionContext.Provider value={{ user, setUser, refresh, syncLogout }}>
      <AlertBarContext.Provider value={{ setOpen, setAlertText, setSeverity }}>
        <SocketContext.Provider value={{ socket }}>
          <ThemeProvider theme={Theme}>
            <div className={classes.app}>
              <Router>
                <CssBaseline />
                <Sidebar />
                <Main />
                <AlertBar
                  open={open}
                  onClose={() => setOpen(false)}
                  alertText={alertText}
                  severity={severity}
                />
              </Router>
            </div>
          </ThemeProvider>
        </SocketContext.Provider>
      </AlertBarContext.Provider>
    </SessionContext.Provider>
  );
};

export default App;
