import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React, { createContext, useContext, useState } from "react";

const AlertBarContext = createContext();
const AUTO_HIDE_MS = 6000;
const ELEVATION_LEVEL = 6;

const AlertBar = (props) => {
  const { open, onClose, alertText, severity } = props;

  return (
    <Snackbar open={open} onClose={onClose} autoHideDuration={AUTO_HIDE_MS}>
      <MuiAlert
        variant="filled"
        elevation={ELEVATION_LEVEL}
        severity={severity}
      >
        {alertText}
      </MuiAlert>
    </Snackbar>
  );
};

export const AlertBarContextProvider = (props) => {
  const [open, setOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [severity, setSeverity] = useState("");

  const setAlert = (alertText, severity) => {
    setAlertText(alertText);
    setSeverity(severity);
    setOpen(true);
  };

  return (
    <AlertBarContext.Provider value={{ setAlert }} {...props}>
      <AlertBar
        open={open}
        severity={severity}
        alertText={alertText}
        onClose={() => setOpen(false)}
      />
      {props.children}
    </AlertBarContext.Provider>
  );
};

export default function useAlertBarContext() {
  const { setAlert } = useContext(AlertBarContext);
  return { setAlert };
}
