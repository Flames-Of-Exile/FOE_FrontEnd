import React from "react";
import { Popup } from 'react-leaflet';
import swal from "sweetalert";

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
            {props.pin.name} <br/>
            Resource: {props.pin.resource} Type: {props.pin.symbol} Amount: {props.pin.amount} <br/>
            Notes: {props.pin.notes} Rank: {props.pin.rank}<br/>
            {props.pin.x_cord ? 'X: ' + props.pin.x_cord :null} {props.pin.y_cord ? 'Y: '+ props.pin.y_cord : null}
            <br />
            {props.Application.state.currentUser.role === "admin" ? // if user is admin
                <a onClick={handleDelete}>Delete</a>
            : // else user is not admin
                ""
            /* end if user is admin */}
        </Popup>
    );
}

export default PinDetails;
