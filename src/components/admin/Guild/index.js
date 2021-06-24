import React from "react";
import InnerLink from "components/InnerLink";

function Guild(props) {
  return (
    <InnerLink
      to={`/admin/guild/${props.guild.name}`}
      primary={props.guild.name}
      variant="list"
    />
  );
}

export default Guild;
