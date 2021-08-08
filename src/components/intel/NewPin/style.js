import {
  InputBase,
  makeStyles,
  TextField,
  withStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  popupPaper: {
    overflow: "hidden",
    width: 400,
    padding: 10,
    borderRadius: 8,
  },
}));

const style = {
  root: {
    borderRadius: 8,
    padding: "0 0 0 5px",
    width: "100%",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
  },
};

export const StyledTextField = withStyles(() => style)(TextField);
export const StyledInputBase = withStyles(() => style)(InputBase);

export default useStyles;
