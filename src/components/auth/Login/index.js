import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import axios from "axios";
import SessionContext from "SessionContext";
import { AlertBarContext } from "components/AlertBar";
import useFormReducer, { setUsername, setPassword } from "./reducer";

const Login = () => {
  const { setUser, refresh } = useContext(SessionContext);
  const { setOpen, setAlertText, setSeverity } = useContext(AlertBarContext);

  const [formState, dispatch] = useFormReducer();
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
        dispatch(setUsername(e.target.value));
        break;
      case "password":
        dispatch(setPassword(e.target.value));
    }
  };

  const handleSubmit = async () => {
    dispatch(setUsername(username.value));
    dispatch(setPassword(password.value));
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
      setUser(response.data.user);
      setTimeout(refresh, 2700);
    } catch (error) {
      setAlertText(error.response.data);
      setSeverity("error");
      setOpen(true);
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
