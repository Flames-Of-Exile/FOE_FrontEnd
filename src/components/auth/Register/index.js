import {
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSessionContext from "SessionContext";
import useFormReducer from "./reducer";
import useSocketContext from "SocketContext";
import useAlertBarContext from "AlertBarContext";

const Register = () => {
  /* CONTEXT */
  const { setUser, refresh } = useSessionContext();
  const { setAlert } = useAlertBarContext();
  const { connect } = useSocketContext();

  /* FORM STATE */
  const {
    state: formState,
    setUsername,
    setPassword1,
    setPassword2,
    setGuildId,
    setGuildList,
  } = useFormReducer();
  const { username, password1, password2, guildId, guildList } = formState;
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const response = await axios.get("/api/guilds");
    setGuildList(response.data);
    setGuildId(response.data[0].id);
  }, []);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password1":
        setPassword1(e.target.value);
        break;
      case "password2":
        setPassword2(e.target.value);
        break;
      case "guild":
        setGuildId(e.target.value);
        break;
    }
  };

  const handleSubmit = async () => {
    if (
      username.value === "" ||
      password1.value === "" ||
      password2.value === ""
    ) {
      setUsername(username.value);
      setPassword1(password1.value);
      setPassword2(password2.value);
      return;
    }
    if (username.error || password1.error || password2.error) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/users", {
        username: username.value,
        password: password1.value,
        guild_id: guildId.value,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.accessToken}`;

      connect();
      setUser(response.data.user);
      setTimeout(refresh, 27000);
    } catch (error) {
      if (error.response.data.includes(`(${username.value}) already exists`)) {
        setAlert("Username already taken, please try another.", "error");
      } else {
        setAlert(error.response.data, "error");
      }
    }
    setLoading(false);
  };

  /* COMPONENT PROPS */
  const baseProps = {
    onChange: handleChange,
    disabled: loading,
  };

  const usernameFieldProps = {
    label: "Username",
    name: "username",
    id: "password",
    ...baseProps,
    ...username,
  };

  const password1FieldProps = {
    label: "Password",
    name: "password1",
    type: "password",
    id: "password1",
    ...baseProps,
    ...password1,
  };

  const password2FieldProps = {
    label: "Verify Password",
    name: "password2",
    type: "password",
    id: "password2",
    ...baseProps,
    ...password2,
  };

  const guildSelectProps = {
    name: "guild",
    ...baseProps,
    ...guildId,
  };

  return (
    <>
      <Grid item>
        <TextField {...usernameFieldProps} />
      </Grid>
      <Grid item>
        <TextField {...password1FieldProps} />
      </Grid>
      <Grid item>
        <TextField {...password2FieldProps} />
      </Grid>
      <Select {...guildSelectProps}>
        {guildList.map((guild) => (
          <MenuItem key={guild.id} value={guild.id}>
            {guild.name}
          </MenuItem>
        ))}
      </Select>
      <Grid item>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          Submit
          {loading && <CircularProgress size={25} />}
        </Button>
      </Grid>
    </>
  );
};

export default Register;
