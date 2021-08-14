import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
import useSessionContext from "SessionContext";
import useFormReducer from "./reducer";
import useSocketContext from "SocketContext";
import useAlertBarContext from "AlertBarContext";

const Login = () => {
  /* CONTEXT */
  const { setUser, refresh } = useSessionContext();
  const { setAlert } = useAlertBarContext();
  const { connect } = useSocketContext();

  /* FORM STATE */
  const { state: formState, setUsername, setPassword } = useFormReducer();
  const { username, password } = formState;
  const [loading, setLoading] = useState(false);

  /* FORM HANDLING */
  const handleChange = (e) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formState).find((key) => key.error)) {
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
      ] = `Bearer ${response.data.token}`;
      connect();
      setUser(response.data.user);
      setTimeout(refresh, 2700);
    } catch (error) {
      setAlert(error.response.data, "error");
    }
    setLoading(false);
  };

  /* COMPONENT PROPS */
  const usernameFieldProps = {
    label: "Username",
    name: "username",
    id: "username",
    required: true,
    autoFocus: true,
    onChange: handleChange,
    disabled: loading,
    inputProps: { form: "login-form" },
    ...username,
  };

  const passwordFieldProps = {
    label: "Password",
    name: "password",
    type: "password",
    id: "password",
    required: true,
    onChange: handleChange,
    disabled: loading,
    inputProps: { form: "login-form" },
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
        <form onSubmit={handleSubmit} id="login-form">
          <Button variant="contained" type="submit" disabled={loading}>
            Submit
            {loading && <CircularProgress size={25} />}
          </Button>
        </form>
      </Grid>
    </>
  );
};

export default Login;
