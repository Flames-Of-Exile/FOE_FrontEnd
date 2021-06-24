import { Backdrop } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import GuildList from "./GuildList";
import UpdateGuild from "./UpdateGuild";
import UpdateUser from "./UpdateUser";
import { AlertBarContext } from "components/AlertBar";
import axios from "axios";
import { context } from "./context";

const Home = () => {
  const [guilds, setGuilds] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setOpen, setAlertText, setSeverity } = useContext(AlertBarContext);

  useEffect(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/guilds");
      setGuilds(response.data);
      setLoading(false);
    } catch (error) {
      setAlertText(error.response.data);
      setSeverity("error");
      setOpen(true);
    }
  });

  return (
    <>
      {loading && <Backdrop />}
      <Switch>
        <context.Provider value={{ guilds, setGuilds }}>
          <Route exact path="/admin/guild/:name">
            <UpdateGuild guilds={guilds} />
          </Route>
          <Route exact path="/admin/guild/user/:id">
            <UpdateUser guilds={guilds} />
          </Route>
          <Route path="/admin">
            <GuildList guilds={guilds} />
          </Route>
        </context.Provider>
      </Switch>
    </>
  );
};

export const AdminContext = context;
export default Home;
