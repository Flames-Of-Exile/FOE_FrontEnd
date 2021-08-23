import { Grid, List } from "@material-ui/core";
import React from "react";
import User from "components/admin/User";

function UserList(props) {
  return (
    <>
      <List>
        {props.users.map((user) => (
          <Grid item key={user}>
            <User user={user} />
          </Grid>
        ))}
      </List>
    </>
  );
}

export default UserList;
