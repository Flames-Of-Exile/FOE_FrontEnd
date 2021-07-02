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
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AlertBarContext } from "components/AlertBar";
import { AdminContext } from "components/admin/Home";
import { useParams } from "react-router-dom";
import useFormReducer, {
  setUsername,
  setPassword,
  setIsActive,
  setRole,
  setGuild,
} from "./reducer";

const UpdateUser = () => {
  const params = useParams();
  const { setAlertText, setSeverity, setOpen } = useContext(AlertBarContext);
  const { guilds, setGuilds } = useContext(AdminContext);
  const [formState, dispatch] = useFormReducer();
  const { username, password, isActive, role, guild } = formState;
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    try {
      const response = await axios.get(`/api/users/${params.id}`);
      dispatch(setUsername(response.data.username));
      dispatch(setRole(response.data.role));
      dispatch(setIsActive(response.data.is_active));
      dispatch(setGuild(response.data.guild.id));
    } catch (error) {
      setAlertText(error.response.data);
      setSeverity("error");
      setOpen(true);
    }
  }, [params]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "password":
        dispatch(setPassword(e.target.value));
        break;
      case "role":
        dispatch(setRole(e.target.value));
        break;
      case "isActive":
        dispatch(setIsActive(e.target.checked));
        break;
      case "guild":
        dispatch(setGuild(e.target.value));
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
      setAlertText(`${username.value} updated!`);
      setSeverity("success");
    } catch (error) {
      setAlertText(error.response.data);
      setSeverity("error");
    }
    setOpen(true);
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
      setAlertText("Password Updated.");
      setSeverity("success");
    } catch (error) {
      setAlertText(error.response.data);
      setSeverity("error");
    }
    setOpen(true);
    setLoading(false);
  };

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
