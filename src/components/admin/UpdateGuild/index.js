import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import UserList from "components/admin/UserList";
import axios from "axios";
import { AdminContext } from "components/admin/Home";
import { useParams } from "react-router-dom";
import { AlertBarContext } from "components/AlertBar";
import useFormReducer, { setGuildName } from "./reducer";

const useStyles = makeStyles(() => ({
  paper: { width: 800 },
}));

const UpdateGuild = () => {
  const classes = useStyles();

  const { guilds, setGuilds } = useContext(AdminContext);
  const { setAlertText, setSeverity, setOpen } = useContext(AlertBarContext);

  const [loading, setLoading] = useState(false);

  const params = useParams();
  console.log(guilds);
  const thisGuild = guilds.filter((guild) => guild.name === params.name)[0];
  const [formState, dispatch] = useFormReducer(thisGuild.name);
  const { guildName } = formState;

  const handleToggle = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/guilds/${thisGuild.id}`, {
        name: thisGuild.name,
        is_active: !thisGuild.is_active,
      });
      const response = await axios.get("/api/guilds");
      setGuilds(response.data);
      setAlertText(`Access for ${thisGuild.name} updated.`);
      setSeverity("success");
    } catch (error) {
      setAlertText(error.response.data);
      setSeverity("error");
    }
    setOpen(true);
    setLoading(false);
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "guildName":
        dispatch(setGuildName(e.target.value));
        break;
    }
  };

  const handleSubmit = async () => {
    dispatch(setGuildName(guildName.value));
    if (guildName.error) {
      return;
    }
    setLoading(true);
    try {
      await axios.patch(`/api/guilds/${thisGuild.name}`, {
        name: guildName.value,
        is_active: thisGuild.is_active,
      });
      const response = await axios.get("/api/guilds");
      setGuilds(response.data);
      setAlertText(`${guildName.value} updated!`);
      setSeverity("success");
    } catch (error) {
      if (error.response.data.includes(`(${guildName.value}) already exists`)) {
        setAlertText(`Guild with name '${guildName.value}' already exists`);
      } else {
        setAlertText(error.response.data);
      }
      setSeverity("error");
    }
    setOpen(true);
    setLoading(false);
  };

  const guildNameTextFieldProps = {
    name: "guildName",
    id: "guildName",
    label: "Guild Name",
    onChange: handleChange,
    disabled: loading,
    ...guildName,
  };

  return (
    <>
      <Grid item>
        <Typography>{thisGuild.name}</Typography>
      </Grid>
      <Grid item>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            spacing={2}
          >
            <UserList users={thisGuild ? thisGuild.users : []} />
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <Button onClick={handleToggle} variant="contained" disabled={loading}>
          {thisGuild.is_active ? "Disable Access" : "Enable Access"}
          {loading && <CircularProgress size={25} />}
        </Button>
      </Grid>
      <Grid item>
        <TextField {...guildNameTextFieldProps} />
      </Grid>
      <Grid item>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          Change Name
          {loading && <CircularProgress size={25} />}
        </Button>
      </Grid>
    </>
  );
};

export default UpdateGuild;
