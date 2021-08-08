import { makeStyles } from "@material-ui/core";

const DRAWER_WIDTH = 200;

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

export default useStyles;
