import React from "react";

function PinDetails(props) {

    return (
        <div style={{visibility: props.visibility? props.visibility : 'hidden', zindex: 10, position:"absolute", bottom:(props.details.position_y + 5.5) + '%', left:(props.details.position_x + 1.7) + '%'}} className='pin-details'>
            {props.details.name} <br/>
            Resource: {props.details.resource} type: {props.details.symbol} Amount: {props.details.amount} <br/>
            Notes: {props.details.notes} Rank: {props.details.rank}<br/>
            {props.details.x_cord ? 'X: ' + props.details.x_cord :null} {props.details.y_cord ? 'Y: '+ props.details.y_cord : null}

        </div>
    );
}

export default PinDetails;
