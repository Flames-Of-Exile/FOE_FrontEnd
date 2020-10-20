import React from "react";
import { Link } from "react-router-dom";

function Guild(props) {

    return(
        <Link to={`/admin/guild/${props.guild.name}`}>
            <li className="user-entry">
                <span>{props.guild.name}</span>
            </li>
        </Link>
    );
}

export default Guild;
