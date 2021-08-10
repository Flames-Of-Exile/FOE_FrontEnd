import {
  Button,
  CircularProgress,
  Grid,
  List,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import Guild from "components/admin/Guild";
import { useAdminContext } from "components/admin/Home";
import axios from "axios";
import useFormReducer from "./reducer";
import useAlertBarContext from "AlertBarContext";
import useStyles from "./style";

const GuildList = () => {
  /* STYLING */
  const classes = useStyles();

  /* CONTEXT */
  const { guilds, setGuilds } = useAdminContext();
  const { setAlert } = useAlertBarContext();

  /* FORM STATE */
  const { state: formState, setGuildName } = useFormReducer();
  const { guildName } = formState;
  const [loading, setLoading] = useState(false);

  /* FORM HANDLING */
  const handleChange = (e) => {
    switch (e.target.name) {
      case "guildName":
        setGuildName(e.target.value);
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formState).find((key) => key.error)) {
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

  /* COMPONENT PROPS */
  const guildNameTextFieldProps = {
    name: "guildName",
    id: "guildName",
    label: "New Guild Name",
    required: true,
    autoFocus: true,
    onChange: handleChange,
    disabled: loading,
    inputProps: { form: "new-guild-form" },
    ...guildName,
  };

  return (
    <>
      <Grid item>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="column"
            justifyContent="space-around"
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
        <form onSubmit={handleSubmit} id="new-guild-form">
          <Button type="submit" disabled={loading} variant="contained">
            Submit
            {loading && <CircularProgress size={25} />}
          </Button>
        </form>
      </Grid>
    </>
  );
};

export default GuildList;
