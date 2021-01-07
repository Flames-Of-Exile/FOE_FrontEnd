import React, {useState} from 'react';

function AuditPin(props) {
    const [state] = useState({
        edit: props.edit
    });

    return(
        <>
            <br/>
            {state.edit.user.username} {state.edit.user.guild.name}<br/>
            {state.edit.date_time}<br/>
            {state.edit.details}<br/><br/>
        </>
    );
}

export default AuditPin;