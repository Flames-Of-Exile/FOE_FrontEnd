import React, { useEffect, useRef, useState } from "react";
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
        centerLat: 0,
        centerLng: 0,
        radius: 0,
        height: 0,
        width: 0,
        loading: true
    });

    const overlayRef = useRef(null);

    useEffect(() => {
        socket.connect();
        return () => {
            socket.disconnect();
        };
    },[]);

    useEffect(() => {
        if (props.campaign.image === undefined) {return;}
        const image = new Image();
        image.src = props.campaign.image;
        image.onload = () => setState({...state, width: image.naturalWidth, height: image.naturalHeight, loading: false});
    },[props.campaign]);

    const handleChange = (event) => setState({
        ...state,
        [event.target.name]: event.target.value,
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
        if (state.radius === 0) {
            swal("Error", "Please draw the click area on the map.", "error");
            return;
        }
        try {
            swal("Sending...", "Attempting to update world...", "info", {buttons: false});
            await axios.patch(`/api/worlds/${props.world.id}`, JSON.stringify({
                name: state.name,
                center_lat: state.centerLat,
                center_lng: state.centerLng,
                radius: state.radius,
            }));
            socket.send('campaign-update');
            props.history.push(`/campaigns/${props.campaign.name}`);
            swal("Success", "World updated!", "success");
        } catch (error) {
            swal("Error", error.response.data, "error");
        }
    };

    const handleLoad = () => {
        if (overlayRef.current) {
            let ratio = state.height / state.width;
            overlayRef.current.setBounds([[-400, -400/ratio], [400, 400/ratio]]);
        }
    };

    useEffect(() => {
        if (overlayRef.current) {
            let ratio = state.height / state.width;
            overlayRef.current.setBounds([[-400, -400/ratio], [400, 400/ratio]]);
        }
    },[state.height, state.width]);

    if (state.loading) {return null;}
    return (
        <div>
            <br />
            <br />
            <p>Update {props.world.name} of {props.campaign.name}</p>
            <input type="text" name="name" placeholder='World Name' onChange={handleChange} value={state.name}/>
            <button onClick={handleSubmit}>Submit</button>
            <br />
            Draw click area below
            <MapContainer center={[0, 0]}
                          keyboard={false}
                          scrollWheelZoom={false}
                          zoom={0}
                          crs={CRS.Simple}
                          minZoom={-5}
                          maxZoom={5}
            >
                <WorldLinkDrawer newWorldState={state} newWorldSetState={setState} />
                <ImageOverlay url={props.campaign.image}
                              ref={overlayRef}
                              bounds={[[0,0],[0,0]]}
                              eventHandlers={{load: handleLoad}}
                />
            </MapContainer>
        </div>
    );
}

export default NewWorld;