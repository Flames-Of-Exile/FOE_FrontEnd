import React from "react";
import { Popup } from 'react-leaflet';

function PinDetails(props) {

    return (
        <Popup offset={[0, -50]}>
            {props.pin.name} <br/>
            Resource: {props.pin.resource} Type: {props.pin.symbol} Amount: {props.pin.amount} <br/>
            Notes: {props.pin.notes} Rank: {props.pin.rank}<br/>
            {props.pin.x_cord ? 'X: ' + props.pin.x_cord :null} {props.pin.y_cord ? 'Y: '+ props.pin.y_cord : null}

        </Popup>
    );
}

export default PinDetails;
