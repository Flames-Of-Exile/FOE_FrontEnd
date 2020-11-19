import React, { useEffect, useState } from "react";
import swal from "sweetalert";

import capitalize from "../../helper_functions/Capitalize";

const axios = require('axios').default;

function PinDetails(props) {
    const [state, setState] = useState({
        details: [],
    });

    useEffect(() => {
        setState({
            ...state,
            details: createDetailArray(props.pin)
        });
    },[props.pin]);

    const createDetailArray = (pin) => {
        let details = [];
        if (pin.resource !== 'na') {
            details.push(<span>{capitalize(pin.resource)}</span>);
        }
        if (pin.rank) {
            details.push(<span>{` Rank: ${pin.rank}`}</span>);
        }
        if (details.length > 0) {
            details.push(<br/>);
        }
        if (pin.amount) {
            details.push(<span>{`Amount: ${pin.amount}`}<br /></span>);
        }
        if (pin.x_cord && pin.y_cord) {
            details.push(<span>{`Location: ${pin.x_cord}${pin.y_cord}`}<br /></span>);
        }
        if (pin.name) {
            details.push(<span>{`${pin.name}`}<br /></span>);
        }
        if (pin.notes) {
            details.push(<span>{`${pin.notes}`}<br /></span>);
        }
        return details;
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/pins/${props.pin.id}`);
            props.socket.send('campaign-update');
        } catch (error) {
            swal("Error", error.response.data, "error");
        }   
    };

    return (
        <div className="popup">
            {state.details}
            <a onClick={props.handleEdit}>Edit</a>
            {props.Application.state.currentUser.role === "admin" ? // if user is admin
                <a onClick={handleDelete}>Delete</a>
            : // else user is not admin
                ""
            /* end if user is admin */}
        </div>
    );
}

export default PinDetails;
