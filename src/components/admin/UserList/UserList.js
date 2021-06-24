import { Grid } from "@material-ui/core";
import React from "react";
import User from "components/admin/User";

function UserList(props) {
  return (
    <>
      {props.users.map((user) => (
        <Grid item key={user}>
          <User user={user} />
        </Grid>
      ))}
    </>
  );
}

export default UserList;
