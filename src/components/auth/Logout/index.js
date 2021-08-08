import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import useSessionContext from "SessionContext";
import {
  Backdrop,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import useStyles from "./style";

const Logout = () => {
  /* STYLING */
  const classes = useStyles();

  /* LOAD STATE */
  const [loading, setLoading] = useState(true);

  /* CONTEXT */
  const { syncLogout } = useSessionContext();

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
