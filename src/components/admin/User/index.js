import React from "react";
import InnerLink from "components/InnerLink";

function User(props) {
  return (
    <InnerLink
      to={`/admin/guild/user${props.user.id}`}
      primary={props.user.username}
      variant="list"
    />
  );
}

export default User;
