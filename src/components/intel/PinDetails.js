import React from "react";
import { Popup } from 'react-leaflet';
import swal from "sweetalert";

import capitalize from "../../helper_functions/Capitalize";

const axios = require('axios').default;

function PinDetails(props) {

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/pins/${props.pin.id}`);
            props.socket.send('campaign-update');
        } catch (error) {
            swal("Error", error.response.data, "error");
        }   
    };

    return (
        <Popup offset={[0, -50]}>
            {capitalize(props.pin.resource)}{props.pin.rank ? ` - Rank: ${props.pin.rank}` : ""}<br/>
            {props.pin.amount ? `Amount - ${props.pin.amount}` : ""}<br />
            {props.pin.x_cord ? `Location - ${props.pin.x_cord}${props.pin.y_cord}` : ""}<br />
            {props.pin.name} <br/>
            {props.pin.notes} <br/>
            {props.Application.state.currentUser.role === "admin" ? // if user is admin
                <a onClick={handleDelete}>Delete</a>
            : // else user is not admin
                ""
            /* end if user is admin */}
        </Popup>
    );
}

export default PinDetails;
