import React from "react";
import { Link } from "react-router-dom";

function Guild(props) {

    return(
        <Link to={`/admin/guild/${props.guild.name}`}>
            <li className="user-entry">
                {console.log(props.guild)}
                <span>{props.guild.name}
                {(['', null].indexOf(props.guild.nickname) === -1 ) ? <> - {props.guild.nickname}</>: ''}</span>
            </li>
        </Link>
    );
}

export default Guild;
