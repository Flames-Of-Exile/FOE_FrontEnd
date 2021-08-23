import { InputBase, TextField, withStyles } from "@material-ui/core";

const style = {
  root: {
    borderRadius: 8,
    padding: "0 0 0 5px",
    width: "100%",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
    "& .Mui-error": {
      color: "#FF0000",
    },
    "& .MuiInput-underline.Mui-error:after": {
      borderColor: "#FF0000",
    },
  },
};

export const StyledTextField = withStyles(() => style)(TextField);
export const StyledInputBase = withStyles(() => style)(InputBase);
