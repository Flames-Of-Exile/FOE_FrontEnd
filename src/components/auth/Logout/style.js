import { makeStyles } from "@material-ui/core";

const SIDEBAR_WIDTH = 200;

const useStyles = makeStyles(() => ({
  backdrop: {
    left: SIDEBAR_WIDTH,
  },
}));

export default useStyles;
