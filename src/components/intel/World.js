import React, { useEffect, useState } from "react";
import { MapContainer, ImageOverlay } from 'react-leaflet';
import { CRS } from "leaflet";

import Pin from './Pin.js';
import NewPin from './NewPin.js';

function World(props) {
    const [state, setState] = useState({
        width: 0,
        height: 0,
        loading: true
    });

    useEffect(() => {
        if (props.world == undefined) {return;}
        const image = new Image();
        image.src = props.world.image;
        image.onload = () => setState({width: image.naturalWidth, height: image.naturalHeight, loading: false});
    },[props.world]);
    
    if (state.loading) {return null;}
    return (
        <div>
            <MapContainer center={[0, 0]} zoom={-1} scrollWheelZoom={true} crs={CRS.Simple} minZoom={-3} >
                <NewPin world_id={props.world.id}/>
                <ImageOverlay url={props.world.image}
                              bounds={[[-1 * state.height, -1 * state.width], [state.height, state.width]]} />
                {props.world.pins.map(pin => <Pin key={pin} pin={pin} />)}
            </MapContainer>
        </div>
    );
}

export default World;
