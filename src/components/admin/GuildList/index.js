import { Button, CircularProgress, List, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import Guild from "components/admin/Guild";
import { AdminContext } from "components/admin/Home";
import axios from "axios";
import useFormReducer, { setGuildName } from "./reducer";
import { AlertBarContext } from "components/AlertBar";

const GuildList = () => {
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
    onChange: handleChange,
    disabled: loading,
    ...guildName,
  };

  return (
    <>
      <List>
        {guilds.map((guild) => (
          <Guild guild={guild} key={guild} />
        ))}
      </List>
      <TextField {...guildNameTextFieldProps} />
      <Button onClick={handleSubmit} disabled={loading} variant="contained">
        Submit
        {loading && <CircularProgress size={25} />}
      </Button>
    </>
  );
};

export default GuildList;
