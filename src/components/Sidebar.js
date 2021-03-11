import React, { forwardRef } from "react";

import { Link } from "react-router-dom";

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

const ListItemLink = (props) => {
  const { icon, primary, to } = props;

  const renderLink = useMemo(
    () =>
      forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

const Sidebar = () => {
  const classes = useStyles();
  const { user } = useContext(SessionContext);

  var links = [];
  if (user.id) {
    links.push(<ListItemLink to="/" primary="Home" />);
    links.push(<ListItemLink to="/profile" primary="Edit Profile" />);
    links.push(<ListItemLink to="/logout" primary="Logout" />);
    links.push(<ListItemLink to="/campaigns/new" primary="Add Campaign" />);
    if (user.role === "admin") {
      links.push(<Divider />);
      links.push(<ListItemLink to="/admin" primary="Admin" />);
    }
  } else {
    links.push(<ListItemLink to="/login" primary="Login" />);
    links.push(<ListItemLink to="/register" primary="Register" />);
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
