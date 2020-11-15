import React from "react";
import { MapContainer, ImageOverlay, Marker } from 'react-leaflet';
import Pin from './Pin.js';
import PinDetails from './PinDetails.js';
import NewPin from './NewPin.js';
import { CRS, Icon } from "leaflet";

const well = new Icon({
    iconUrl: "/staticfiles/icons/well.png",
    iconSize: [25, 50],
    iconAnchor: [12.5, 50]
});

function World(props) {
    return (
        <MapContainer center={[0, 0]} zoom={-1} scrollWheelZoom={true} crs={CRS.Simple} minZoom={-3} >
            <NewPin world_id={props.world.id}/>
            <ImageOverlay url={props.world.image} bounds={[[-1000,-2000], [1000,2000]]} />
            {props.world.pins.map(pin => <Marker
                                            key={pin}
                                            icon={well}
                                            position={[pin.position_y, pin.position_x]}>
                                            <PinDetails offset={[0, -50]} pin={pin} />
                                        </Marker>)}
        </MapContainer>
    );
}

export default World;
