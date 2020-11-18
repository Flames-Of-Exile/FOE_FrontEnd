import React, { useEffect, useState } from "react";
import { MapContainer, ImageOverlay } from 'react-leaflet';
import { CRS } from "leaflet";

import swal from "sweetalert";

import Socket from "../../helper_functions/Socket";
import WorldLinkDrawer from "./WorldLinkDrawer";

const axios = require("axios").default;

const socket = new Socket();

function NewWorld(props) {
    const [state, setState] = useState({
        Application: props.Application,
        name: "",
        file: null,
        filename: "choose a file",
        centerLat: 0,
        centerLng: 0,
        radius: 0,
        height: 0,
        width: 0,
        loading: true
    });

    useEffect(() => {
        socket.connect();
        return () => {
            socket.disconnect();
        };
    },[]);

    useEffect(() => {
        if (props.campaign.image == undefined) {return;}
        const image = new Image();
        image.src = props.campaign.image;
        image.onload = () => setState({...state, width: image.naturalWidth, height: image.naturalHeight, loading: false});
    },[props.campaign]);

    const handleChange = (event) => setState({
        ...state,
        [event.target.name]: event.target.value,
    });

    const handleSelect = (event) => setState({
        ...state,
        [event.target.name]: event.target.files[0],
        filename: event.target.value.split('\\').pop()
    });

    const handleSubmit = async () => {
        if (state.name === "") {
            swal("Error", "Please enter the name of the world.", "error");
            return;
        }
        if (state.campaign_id < 1) {
            swal("Error", "Please enter the campaign id.", "error");
            return;
        }
        if (state.file === null) {
            swal("Error", "Please upload a file.", "error");
            return;
        }
        if (state.radius === 0) {
            swal("Error", "Please draw the click area on the map.", "error");
            return;
        }
        const formData = new FormData();
        formData.append("file", state.file, state.file.name);
        formData.append("name", state.name);
        formData.append("campaign_id", props.campaign.id);
        formData.append("center_lat", state.centerLat);
        formData.append("center_lng", state.centerLng);
        formData.append("radius", state.radius);
        try {
            let config = { headers: {
                "Content-Type": "multipart/form-data"
            } };
            swal("Sending...", "Attempting to post the world...", "info", {buttons: false});
            await axios.post("/api/worlds", formData, config);
            socket.send('campaign-update');
            swal("Success", "World created!", "success");
        } catch (error) {
            swal("Error", error.response.data, "error");
        }
    };

    if (state.loading) {return null;}
    return (
        <div>
            <br />
            <br />
            <p>Add world to {props.campaign.name}</p>
            <input type="text" name="name" placeholder='World Name' onChange={handleChange}/>
            <input type="file" name="file" id="file" onChange={handleSelect}/>
            <label htmlFor="file">{state.filename}</label>
            <button onClick={handleSubmit}>Submit</button>
            <br />
            Draw click area below
            <MapContainer center={[0, 0]}
                        keyboard={false}
                        zoom={-1}
                        scrollWheelZoom={false}
                        crs={CRS.Simple}
                        minZoom={-1}
                        maxZoom={-1}
                        dragging={false}
                        zoomControl={false}
            >
                <WorldLinkDrawer newWorldState={state} newWorldSetState={setState}/>
                <ImageOverlay url={props.campaign.image}
                              bounds={[[-1 * state.height, -1 * state.width], [state.height, state.width]]} />
            </MapContainer>
        </div>
    );
}

export default NewWorld;