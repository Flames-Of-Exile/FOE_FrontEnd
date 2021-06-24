import {
  Divider,
  Drawer,
  List,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import SessionContext from "SessionContext";
import InnerLink from "components/InnerLink";

const drawerWidth = 200;

const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const { user } = useContext(SessionContext);

  var links = [];
  if (user.id) {
    links.push(<InnerLink to="/" primary="Home" variant="list" />);
    links.push(
      <InnerLink to="/profile" primary="Edit Profile" variant="list" />
    );
    links.push(<InnerLink to="/logout" primary="Logout" variant="list" />);
    links.push(
      <InnerLink to="/campaigns/new" primary="Add Campaign" variant="list" />
    );
    if (user.role === "admin") {
      links.push(<Divider />);
      links.push(<InnerLink to="/admin" primary="Admin" variant="list" />);
    }
  } else {
    links.push(<InnerLink to="/login" primary="Login" variant="list" />);
    links.push(<InnerLink to="/register" primary="Register" variant="list" />);
  }

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <Typography>Welcome to the Flames of Exile</Typography>
        <List>{links}</List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
