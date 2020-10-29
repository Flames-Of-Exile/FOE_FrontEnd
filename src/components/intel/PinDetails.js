import React from "react";

function PinDetails(props) {
    return (
        <div style={{visibility: props.visibility}} className='pin-details'>
            {props.details.name} <br/>
<<<<<<< HEAD
            Resource: {props.details.resource} type: {props.details.symbol} Amount: {props.details.amount} <br/>
            Notes: {props.details.notes} Rank: {props.details.rank}<br/>
            {props.details.x_cord ? 'X: ' + props.details.x_cord :null} {props.details.y_cord ? 'Y: '+ props.details.y_cord : null}
=======
            Amount: {props.details.amount} Rank: {props.details.rank} Respawn: {props.details.respawn}<br/>
            Notes: {props.details.notes} id: {props.details.id} <br/>
            {props.details.x_cord ? 'X: ' + props.details.x_cord :null}
            {props.details.y_cord ? 'Y: '+ props.details.y_cord : null}
>>>>>>> 87e35b680fcb7208a8578417638f75e8cf51f332
        </div>
    );
}

export default PinDetails;
