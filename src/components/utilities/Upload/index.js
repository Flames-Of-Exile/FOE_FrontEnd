import { Button, Input } from "@material-ui/core";
import React from "react";
import useStyles from "./style";

const Upload = (props) => {
  /* STYLING */
  const classes = useStyles();

  /* PROPS */
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
