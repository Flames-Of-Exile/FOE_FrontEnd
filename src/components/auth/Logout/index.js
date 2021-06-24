import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import SessionContext from "SessionContext";
import {
  Backdrop,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

/* CONSTANTS */
const sidebarWidth = 200;

/* STYLING */
const useStyles = makeStyles(() => ({
  backdrop: {
    left: sidebarWidth,
  },
}));

const Logout = () => {
  /* STYLING */
  const classes = useStyles();

  /* LOAD STATE */
  const [loading, setLoading] = useState(true);

  /* CONTEXT */
  const { syncLogout } = useContext(SessionContext);

  /* LOGOUT */
  const logout = useCallback(async () => {
    await axios.get("/api/users/logout");
    setLoading(false);
    localStorage.setItem("logout", Date.now());
    syncLogout();
  }, [syncLogout]);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress />
      </Backdrop>
      <Grid item>
        <Typography>
          {loading ? "Logging out..." : "Successfully logged out!"}
        </Typography>
      </Grid>
    </>
  );
};

export default Logout;
