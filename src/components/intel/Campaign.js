import React, { useEffect, useState } from "react";
import { CircleMarker, MapContainer, ImageOverlay } from 'react-leaflet';
import { CRS } from "leaflet";
import { Link } from "react-router-dom";


function Campaign(props) {
    const [state, setState] = useState({
        width: 0,
        height: 0,
        loading: true
    });

    useEffect(() => {
        if (props.campaign.image == undefined) {return;}
        const image = new Image();
        image.src = props.campaign.image;
        image.onload = () => setState({width: image.naturalWidth, height: image.naturalHeight, loading: false});
    },[props.campaign]);

    if (state.loading) {return null;}
    return(
        <div>
            <p className='banner'>{props.campaign.name}</p>
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
                <ImageOverlay url={props.campaign.image}
                              bounds={[[-1 * state.height, -1 * state.width], [state.height, state.width]]} />
                {props.campaign.worlds.map(world => 
                        <div key={world}>
                            <CircleMarker
                            center={[world.center_lat, world.center_lng]}
                            radius={world.radius}
                            opacity={0}
                            fillColor={"yellow"}
                            eventHandlers={{click: () => 
                                props.history.push(`/campaigns/${props.campaign.name}/${world.name}`)
                            }} />
                        </div>
                )}
            </MapContainer>
            <br />
            {props.Application.state.currentUser.role === "admin" ? // if user is admin
                <Link to={`/campaigns/${props.campaign.name}/addworld`}>Add World</Link>
            : // else
                "" /* end if user is admin */}
        </div>
    );
}

export default Campaign;
