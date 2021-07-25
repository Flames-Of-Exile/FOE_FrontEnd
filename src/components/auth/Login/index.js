import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
import useSessionContext from "SessionContext";
import useFormReducer from "./reducer";
import useSocketContext from "SocketContext";
import useAlertBarContext from "AlertBarContext";

const Login = () => {
  const { setUser, refresh } = useSessionContext();
  const { setAlert } = useAlertBarContext();
  const { connect } = useSocketContext();

  const { state: formState, setUsername, setPassword } = useFormReducer();
  const { username, password } = formState;
  const [loading, setLoading] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
    }
  };

  const handleSubmit = async () => {
    setUsername(username.value);
    setPassword(password.value);
    if (username.error || password.error) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/users/login", {
        username: username.value,
        password: password.value,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer${response.data.token}`;
      connect();
      setUser(response.data.user);
      setTimeout(refresh, 2700);
    } catch (error) {
      setAlert(error.response.data, "error");
    }
    setLoading(false);
  };

  const usernameFieldProps = {
    label: "Username",
    name: "username",
    id: "username",
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    disabled: loading,
    ...username,
  };

  const passwordFieldProps = {
    label: "Password",
    name: "password",
    type: "password",
    id: "password",
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    disabled: loading,
    ...password,
  };

  return (
    <>
      <Grid item>
        <TextField {...usernameFieldProps} />
      </Grid>
      <Grid item>
        <TextField {...passwordFieldProps} />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          Submit
          {loading && <CircularProgress size={25} />}
        </Button>
      </Grid>
    </>
  );
};

export default Login;
