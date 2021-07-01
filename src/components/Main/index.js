import React, { useContext } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { Route, Switch } from "react-router";
import SessionContext from "SessionContext";
import Logout from "components/auth/Logout";
import Profile from "components/Profile";
import Admin from "components/admin/Home";
import NewCampaign from "components/intel/NewCampaign";
import CampaignSelector from "components/intel/CampaignSelector";
import NewPin from "components/intel/NewPin";
import PinHistory from "components/intel/PinHistory";
import Home from "components/Home";
import Unconfirmed from "components/auth/Unconfirmed";
import Login from "components/auth/Login";
import Register from "components/auth/Register";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    passing: theme.spacing(3),
    marginTop: 20,
  },
}));

const Main = () => {
  const { user } = useContext(SessionContext);
  const classes = useStyles();

  var routes = [
    <Route exact path="/logout" key="/logout">
      <Logout />
    </Route>,
  ];
  if (user.id) {
    routes.push(
      <Route exact path="/profile" key="/profile">
        <Profile />
      </Route>
    );
    if (user.isAdmin) {
      routes.push(
        <Route path="/admin" key="/admin">
          <Admin />
        </Route>
      );
    }
    if (user.discord_confirmed) {
      routes.push(
        <Route exact path="/campaigns/new" key="/campaigns/new">
          <NewCampaign />
        </Route>
      );
      routes.push(
        <Route path="/campaigns/:campaign/:world" key="/campaigns/:campaign/:world">
          <CampaignSelector />
        </Route>
      );
      routes.push(
        <Route path="/campaigns/:campaign" key="/campaigns/:campaign">
          <CampaignSelector />
        </Route>
      );
      routes.push(
        <Route path="/campaigns" key="/campaigns">
          <CampaignSelector />
        </Route>
      );
      routes.push(
        <Route exact path="/pin/new" key="/pin/new">
          <NewPin />
        </Route>
      );
      routes.push(
        <Route exact path="/pin/:id" key="/pin/:id">
          <PinHistory />
        </Route>
      );
      routes.push(
        <Route path="/" key="/">
          <Home />
        </Route>
      );
    } else {
      routes.push(
        <Route path="/" key="/">
          <Unconfirmed />
        </Route>
      );
    }
  } else {
    routes.push(
      <Route exact path="/register" key="/register">
        <Register />
      </Route>
    );
    routes.push(
      <Route path="/" key="/">
        <Login />
      </Route>
    );
  }

  return (
    <main className={classes.content}>
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        // xs="auto"
        spacing={3}
      >
        <Switch>{routes}</Switch>
      </Grid>
    </main>
  );
};

export default Main;
