import {
  Button,
  CircularProgress,
  Grid,
  List,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import Guild from "components/admin/Guild";
import { useAdminContext } from "components/admin/Home";
import axios from "axios";
import useFormReducer from "./reducer";
import useAlertBarContext from "AlertBarContext";

const useStyles = makeStyles((theme) => ({
  paper: { width: 800, background: theme.palette.background.secondary },
}));

const GuildList = () => {
  const classes = useStyles();

  const { guilds, setGuilds } = useAdminContext();
  const { state: formState, setGuildName } = useFormReducer();
  const { guildName } = formState;
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlertBarContext();

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
    if (guildName === "") {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/guilds", {
        name: guildName.value,
      });
      setGuilds([...guilds, response.data]);
      setAlert(`${guildName.value} created!`, "success");
    } catch (error) {
      if (error.response.data.includes(`(${guildName.value}) already exists`)) {
        setAlert(
          `Guild with name '${guildName.value}' already exists.`,
          "error"
        );
      } else {
        setAlert(error.response.data, "error");
      }
    }

    setLoading(false);
  };

  const guildNameTextFieldProps = {
    name: "guildName",
    id: "guildName",
    label: "New Guild Name",
    onChange: handleChange,
    disabled: loading,
    ...guildName,
  };

  return (
    <>
      <Grid item>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            spacing={2}
          >
            <List>
              {guilds.map((guild) => (
                <Grid item key={guild}>
                  <Guild guild={guild} />
                </Grid>
              ))}
            </List>
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <TextField {...guildNameTextFieldProps} />
      </Grid>
      <Grid item>
        <Button onClick={handleSubmit} disabled={loading} variant="contained">
          Submit
          {loading && <CircularProgress size={25} />}
        </Button>
      </Grid>
    </>
  );
};

export default GuildList;
