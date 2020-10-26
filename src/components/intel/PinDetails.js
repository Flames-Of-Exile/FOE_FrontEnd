import React from "react";

function PinDetails(props) {
    return (
        <div style={{visibility: props.visibility}} className='pin-details'>
            {props.details.name} <br/>
            Amount: {props.details.amount} Rank: {props.details.rank} Respawn: {props.details.respawn}<br/>
            Notes: {props.details.notes} id: {props.details.id} <br/>
            {props.details.x_cord ? 'X: ' + props.details.x_cord :null} {props.details.y_cord ? 'Y: '+ props.details.y_cord : null}
        </div>
    );
}

export default PinDetails;
