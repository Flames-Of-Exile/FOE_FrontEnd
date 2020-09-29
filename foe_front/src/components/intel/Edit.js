import React from 'react'

function Edit(props) {

    return (
        <div>
            <p>{props.edit.details}</p>
            <p>{props.edit.date_time}</p>
            <p>{props.edit.user.username}</p>
        </div>
    )
}

export default Edit