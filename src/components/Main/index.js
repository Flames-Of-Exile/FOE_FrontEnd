import { Route, Switch } from "react-router";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    passing: theme.spacing(3),
  },
}));

const Main = () => {
  const { user } = useContext(SessionContext);
  const classes = useStyles();

  var routes = [
    <Route exact path="/logout">
      <Logout />
    </Route>,
  ];
  if (user.id) {
    routes.push(
      <Route exact path="/profile">
        <Profile />
      </Route>
    );
    if (user.isAdmin) {
      routes.push(
        <Route path="/admin">
          <Admin />
        </Route>
      );
    }
    if (user.discord_confirmed) {
      routes.push(
        <Route exact path="/campaigns/new">
          <NewCampaign />
        </Route>
      );
      routes.push(
        <Route path="/campaigns/:campaign/:world">
          <CampaignSelector />
        </Route>
      );
      routes.push(
        <Route path="/campaigns/:campaign">
          <CampaignSelector />
        </Route>
      );
      routes.push(
        <Route path="/campaigns">
          <CampaignSelector />
        </Route>
      );
      routes.push(
        <Route exact path="/pin/new">
          <NewPin />
        </Route>
      );
      routes.push(
        <Route exact path="/pin/:id">
          <PinHistory />
        </Route>
      );
      routes.push(
        <Route path="/">
          <Home />
        </Route>
      );
    } else {
      routes.push(
        <Route path="/">
          <Unconfirmed />
        </Route>
      );
    }
  } else {
    routes.push(
      <Route exact path="/register">
        <Register />
      </Route>
    );
    routes.push(
      <Route path="/">
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
        xs="auto"
        spacing={3}
      >
        <Grid item>
          <Toolbar />
        </Grid>
        <Switch>{routes}</Switch>
      </Grid>
    </main>
  );
};

export default Main;
