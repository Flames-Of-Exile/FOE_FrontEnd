import { Typography } from "@material-ui/core";
import React from "react";

const Edit = (props) => {
  /* PROPS */
  const { edit } = props;

  return (
    <>
      <Typography>{edit.details}</Typography>
      <Typography>{edit.date_time}</Typography>
      <Typography>{edit.user.username}</Typography>
    </>
  );
};

export default Edit;
