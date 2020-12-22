import React, { useEffect, useState } from "react";
import swal from "sweetalert";

import Socket from "../../helper_functions/Socket";

const socket = new Socket();

const axios = require("axios").default;

function CampaignUpdate(props) {
    const [state, setState] = useState({
        name: props.campaign.name,
        is_default: props.campaign.is_default,
        is_archived: props.campaign.is_archived,
    });

    useEffect(() => {
        socket.connect();
        return () => {
            socket.disconnect();
        };
    },[]);

    const handleCheckChange = (event) => setState({
        ...state,
        [event.target.name]: event.target.checked
    });

    const handleChange = (event) => setState({
        ...state,
        [event.target.name]: event.target.value
    });

    const handleSubmit = async () => {
        try {
            swal("Sending...", "Attempting to update the campaign...", "info", {buttons: false});
            await axios.patch(`/api/campaigns/${props.campaign.id}`, JSON.stringify({
                name: state.name,
                is_default: state.is_default,
                is_archived: state.is_archived,
            }));
            socket.send('campaign-update');
            props.history.push(`/`);
            swal("Success", "Campaign updated!", "success");
        } catch (error) {
            swal("Error", error.response.data, "error");
        }
    };

    return(
        <div>
            <div className="grid-2">
                <p>Name:</p>
                <input type="text" name="name" value={state.name} onChange={handleChange} />
                <p>Is Archived:</p>
                <input type="checkbox" name="is_archived" checked={state.is_archived} onChange={handleCheckChange }/>
                <p>Is Default:</p>
                <input type="checkbox" name="is_default" checked={state.is_default} onChange={handleCheckChange} />
            </div>
            <button onClick={handleSubmit}>Submit</button>
            <br />
            <img src={props.campaign.image} alt='The Campain world'/>
        </div>
    );
}

export default CampaignUpdate;
