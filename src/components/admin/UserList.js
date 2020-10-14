import React from "react";

import User from "./User";

function UserList(props) {
    
    return(
        <div className="user-list">
            {props.users.map(user => <User user={user} Application={props.Application}/>)}
        </div>
    );
}

export default UserList;
