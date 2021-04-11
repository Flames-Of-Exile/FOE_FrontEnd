import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { context } from "./context";
import React from "react";

const autoHideMilliSecs = 6000;
const alertElevationLevel = 6;

const AlertBar = (props) => {
  const { open, onClose, alertText, severity } = props;
  return (
    <>
      <Snackbar
        open={open}
        onClose={onClose}
        autoHideDuration={autoHideMilliSecs}
      >
        <MuiAlert
          varian="filled"
          elevation={alertElevationLevel}
          severity={severity}
        >
          {alertText}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export const AlertBarContext = context;
export default AlertBar;
