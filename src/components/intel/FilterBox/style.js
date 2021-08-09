import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: theme.palette.background.filterBox,
    position: "absolute",
    top: 60,
    height: 300,
    right: 10,
    width: 300,
    zIndex: 1000,
    padding: 10,
  },
  select: { minWidth: 200 },
}));

export const updateStyle = (value, selectedValues) => {
  return {
    backgroundColor: selectedValues.includes(value) ? "#C7C7C7" : "white",
  };
};

export default useStyles;
