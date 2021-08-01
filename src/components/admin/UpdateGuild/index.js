import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import UserList from "components/admin/UserList";
import axios from "axios";
import { useAdminContext } from "components/admin/Home";
import { useParams } from "react-router-dom";
import useFormReducer from "./reducer";
import useAlertBarContext from "AlertBarContext";

/* STYLING */
const useStyles = makeStyles((theme) => ({
  paper: { width: 800, background: theme.palette.background.secondary },
}));

const UpdateGuild = () => {
  /* STYLING */
  const classes = useStyles();

  /* CONTEXT */
  const { guilds, setGuilds } = useAdminContext();
  const { setAlert } = useAlertBarContext();

  /* ROUTING */
  const params = useParams();
  
  /* FORM STATE */
  const [loading, setLoading] = useState(false);
  const thisGuild = guilds.filter((guild) => guild.name === params.name)[0];
  const { state: formState, setGuildName } = useFormReducer(thisGuild.name);
  const { guildName } = formState;

  /* FORM HANDLING */
  const handleToggle = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/guilds/${thisGuild.id}`, {
        name: thisGuild.name,
        is_active: !thisGuild.is_active,
      });
      const response = await axios.get("/api/guilds");
      setGuilds(response.data);
      setAlert(`Access for ${thisGuild.name} updated.`, "success");
    } catch (error) {
      setAlert(error.response.data, "error");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "guildName":
        setGuildName(e.target.value);
        break;
    }
  };

  const handleSubmit = async () => {
    setGuildName(guildName.value);
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
      setAlert(`${guildName.value} updated!`, "success");
    } catch (error) {
      if (error.response.data.includes(`(${guildName.value}) already exists`)) {
        setAlert(
          `Guild with name '${guildName.value}' already exists`,
          "error"
        );
      } else {
        setAlert(error.response.data, "error");
      }
    }
    setLoading(false);
  };

  /* COMPONENT PROPS */
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
