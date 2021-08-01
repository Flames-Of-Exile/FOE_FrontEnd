import {
  Divider,
  Drawer,
  List,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import useSessionContext from "SessionContext";
import InnerLink from "components/utilities/InnerLink";

/* CONSTANTS */
const DRAWER_WIDTH = 200;

/* STYLING */
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    background: theme.palette.background.secondary,
  },
  drawerContainer: {
    overflow: "auto",
    margin: 10,
    marginTop: 20,
  },
  title: {
    color: theme.palette.text.title,
    marginBottom: 5,
  },
}));

const Sidebar = () => {
  /* STYLING */
  const classes = useStyles();
  /* CONTEXT */
  const { user } = useSessionContext();

  /* COMPONENT ARRAY CONSTRUCTION */
  var links = [];
  if (user.id) {
    links.push(<InnerLink to="/" primary="Home" variant="list" key="/" />);
    links.push(
      <InnerLink
        to="/profile"
        primary="Edit Profile"
        variant="list"
        key="/profile"
      />
    );
    links.push(
      <InnerLink to="/logout" primary="Logout" variant="list" key="/logout" />
    );
    links.push(
      <InnerLink
        to="/campaigns/new"
        primary="Add Campaign"
        variant="list"
        key="/campaigns/new"
      />
    );
    if (user.role === "admin") {
      links.push(<Divider key="admin-divider" />);
      links.push(
        <InnerLink to="/admin" primary="Admin" variant="list" key="/admin" />
      );
    }
  } else {
    links.push(
      <InnerLink to="/login" primary="Login" variant="list" key="/login" />
    );
    links.push(
      <InnerLink
        to="/register"
        primary="Register"
        variant="list"
        key="/register"
      />
    );
  }

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerContainer}>
        <Typography align="center" variant="h5" className={classes.title}>
          Welcome to the Flames of Exile
        </Typography>
        {user.username ? (
          <Typography className={classes.title} align="center" variant="h6">
            {user.username}
          </Typography>
        ) : null}
        <List>{links}</List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
