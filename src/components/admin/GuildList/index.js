import {
  Button,
  CircularProgress,
  Grid,
  List,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import Guild from "components/admin/Guild";
import { AdminContext } from "components/admin/Home";
import axios from "axios";
import useFormReducer, { setGuildName } from "./reducer";
import { AlertBarContext } from "components/AlertBar";

const useStyles = makeStyles(() => ({
  paper: { width: 800 },
}));

const GuildList = () => {
  const classes = useStyles();

  const { guilds, setGuilds } = useContext(AdminContext);
  const [formState, dispatch] = useFormReducer();
  const { guildName } = formState;
  const [loading, setLoading] = useState(false);
  const { setOpen, setAlertText, setSeverity } = useContext(AlertBarContext);

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
    if (guildName === "") {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/guilds", {
        name: guildName.value,
      });
      setGuilds([...guilds, response.data]);
      setAlertText(`${guildName.value} created!`);
      setSeverity("success");
    } catch (error) {
      if (error.response.data.includes(`(${guildName.value}) already exists`)) {
        setAlertText(`Guild with name '${guildName.value}' already exists.`);
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
