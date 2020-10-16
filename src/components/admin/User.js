import React from "react";
import { Link } from "react-router-dom";

function User(props) {

    return(
        <Link to={`/admin/user/${props.user.id}`}>
            <li className="user-entry">
                <span>{props.user.username}</span>
            </li>
        </Link>
    );
}

export default User;
