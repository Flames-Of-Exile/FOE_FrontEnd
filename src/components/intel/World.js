import React from "react";
import { MapContainer, ImageOverlay } from 'react-leaflet';
import { CRS } from "leaflet";

import Pin from './Pin.js';
import NewPin from './NewPin.js';

function World(props) {
    if (props.world == undefined) {return null;}
    return (
        <MapContainer center={[0, 0]} zoom={-1} scrollWheelZoom={true} crs={CRS.Simple} minZoom={-3} >
            <NewPin world_id={props.world.id}/>
            <ImageOverlay url={props.world.image} bounds={[[-1000,-2000], [1000,2000]]} />
            {props.world.pins.map(pin => <Pin key={pin} pin={pin} />)}
        </MapContainer>
    );
}

export default World;
