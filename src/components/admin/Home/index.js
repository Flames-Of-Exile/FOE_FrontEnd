import React from "react";
import { Switch, Route } from "react-router-dom";
import GuildList from "components/admin/GuildList";
import UpdateGuild from "components/admin/UpdateGuild";
import UpdateUser from "components/admin/UpdateUser";
import contextHook, { AdminContextProvider } from "./context";

const Home = () => {
  return (
    <>
      <AdminContextProvider>
        <Switch>
          <Route exact path="/admin/guild/:name">
            <UpdateGuild />
          </Route>
          <Route exact path="/admin/guild/user/:id">
            <UpdateUser />
          </Route>
          <Route path="/admin">
            <GuildList />
          </Route>
        </Switch>
      </AdminContextProvider>
    </>
  );
};

export const useAdminContext = contextHook;
export default Home;
