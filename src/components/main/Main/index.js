import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { Route, Switch } from "react-router";
import Logout from "components/auth/Logout";
import Profile from "components/main/Profile";
import Admin from "components/admin/Home";
import NewCampaign from "components/intel/NewCampaign";
import Intel from "components/intel/Home";
import NewPin from "components/intel/NewPin";
import PinHistory from "components/intel/PinHistory";
import Home from "components/main/Home";
import Unconfirmed from "components/auth/Unconfirmed";
import Login from "components/auth/Login";
import Register from "components/auth/Register";
import useSessionContext from "SessionContext";

/* STYLING */
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    passing: theme.spacing(3),
    marginTop: 20,
  },
}));

const Main = () => {
  /* STYLING */
  const classes = useStyles();

  /* CONTEXT */
  const { user } = useSessionContext();

  /* COMPONENT ARRAY CONSTRUCTION */
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
    if (user.role === "admin") {
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
        <Route
          path="/campaigns/:campaign/:world"
          key="/campaigns/:campaign/:world"
        >
          <Intel />
        </Route>
      );
      routes.push(
        <Route path="/campaigns/:campaign" key="/campaigns/:campaign">
          <Intel />
        </Route>
      );
      routes.push(
        <Route path="/campaigns" key="/campaigns">
          <Intel />
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
        justifyContent="space-around"
        alignItems="center"
        spacing={3}
      >
        <Switch>{routes}</Switch>
      </Grid>
    </main>
  );
};

export default Main;
