import React from "react";

function PinDetails(props) {

    const bottom = (props.details.position_y + 5.5) + '%';
    const left = (props.details.position_x + 1.75) + '%';
    
    var visability = props.details.id in props.Application.state ? props.Application.state[props.details.id] :
        'hidden';

    return (
        <div style={{bottom: bottom, left: left, visibility: visability}} className='pin-details'>
            {props.details.name} <br/>
            Resource: {props.details.resource} type: {props.details.symbol} Amount: {props.details.amount} <br/>
            Notes: {props.details.notes} Rank: {props.details.rank}<br/>
            {props.details.x_cord ? 'X: ' + props.details.x_cord :null} {props.details.y_cord ?
                 'Y: '+ props.details.y_cord : null}

        </div>
    );
}

export default PinDetails;
