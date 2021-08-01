import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAdminContext } from "components/admin/Home";
import { useParams } from "react-router-dom";
import useFormReducer from "./reducer";
import useAlertBarContext from "AlertBarContext";

const UpdateUser = () => {
  /* ROUTING */
  const params = useParams();

  /* CONTEXT */
  const { setAlert } = useAlertBarContext();
  const { guilds, setGuilds } = useAdminContext();

  /* FORM STATE */
  const {
    state: formState,
    setUsername,
    setRole,
    setIsActive,
    setGuild,
    setPassword,
  } = useFormReducer();
  const { username, password, isActive, role, guild } = formState;
  const [loading, setLoading] = useState(false);

  /* FORM HANDLING */
  useEffect(async () => {
    try {
      const response = await axios.get(`/api/users/${params.id}`);
      setUsername(response.data.username);
      setRole(response.data.role);
      setIsActive(response.data.is_active);
      setGuild(response.data.guild.id);
    } catch (error) {
      setAlert(error.response.data, "error");
    }
  }, [params]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "password":
        setPassword(e.target.value);
        break;
      case "role":
        setRole(e.target.value);
        break;
      case "isActive":
        setIsActive(e.target.checked);
        break;
      case "guild":
        setGuild(e.target.value);
        break;
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.put(`/api/users/${params.id}`, {
        role: role.value,
        is_active: isActive.value,
        guild_id: guild.value,
      });
      const response = await axios.get("/api/guilds");
      setGuilds(response.data);
      setAlert(`${username.value} updated!`, "success");
    } catch (error) {
      setAlert(error.response.data, "error");
    }
    setLoading(false);
  };

  const handleChangePassword = async () => {
    if (password.value === "" || password.error) {
      return;
    }
    try {
      setLoading(true);
      await axios.put(`/api/users/${params.id}`, {
        password: password.value,
        role: role.value,
        is_active: isActive.value,
        guild_id: guild.value,
      });
      setAlert("Password Updated.", "success");
    } catch (error) {
      setAlert(error.response.data, "error");
    }
    setLoading(false);
  };

  /* COMPONENT PROPS */
  const passwordTextFieldProps = {
    type: "password",
    name: "password",
    id: "password",
    label: "Password",
    onChange: handleChange,
    disabled: loading,
    ...password,
  };

  const roleSelectProps = {
    name: "role",
    id: "role",
    label: "Role",
    onChange: handleChange,
    disabled: loading,
    ...role,
  };

  const guildSelectProps = {
    name: "guild",
    id: "guild",
    label: "Guild",
    onChange: handleChange,
    disabled: loading,
    ...guild,
  };

  return (
    <>
      <Grid item>
        <Typography>{username.value}</Typography>
      </Grid>
      <Grid item>
        <TextField {...passwordTextFieldProps} />
      </Grid>
      <Grid item>
        <Button
          onClick={handleChangePassword}
          disabled={loading}
          variant="contained"
        >
          Change Password
          {loading && <CircularProgress size={25} />}
        </Button>
      </Grid>
      <Grid item>
        <FormControlLabel
          control={
            <Checkbox
              checked={isActive.value}
              onChange={handleChange}
              disabled={loading}
              name="isActive"
            />
          }
          label="Is Active"
        />
      </Grid>
      <Grid item>
        <Select {...roleSelectProps}>
          <MenuItem value="guest">Guest</MenuItem>
          <MenuItem value="verified">Verified</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </Grid>
      <Grid item>
        <Select {...guildSelectProps}>
          {guilds.map((guild) => (
            <MenuItem value={guild.id} key={guild.id}>
              {guild.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          Update User
          {loading && <CircularProgress size={25} />}
        </Button>
      </Grid>
    </>
  );
};

export default UpdateUser;
