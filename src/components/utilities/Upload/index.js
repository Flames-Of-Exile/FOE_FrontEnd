import { Button, Input, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  input: {
    display: "none",
  },
});

const Upload = (props) => {
  const classes = useStyles();
  const { inputProps, buttonProps } = props;
  const id = inputProps.id || "contained-button-file";
  const text = buttonProps.text || "Upload";

  return (
    <>
      <label htmlFor={id}>
        <Input type="file" className={classes.input} id={id} {...inputProps} />
        <Button variant="contained" component="span" {...buttonProps}>
          {text}
        </Button>
      </label>
    </>
  );
};

export default Upload;
