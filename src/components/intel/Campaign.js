import React, { useEffect, useRef, useState } from "react";
import { CircleMarker, MapContainer, ImageOverlay } from 'react-leaflet';
import { CRS } from "leaflet";
import { Link } from "react-router-dom";


function Campaign(props) {
    const [state, setState] = useState({
        width: 0,
        height: 0,
        loading: true,
    });
    const overlayRef = useRef(null);

    useEffect(() => {
        if (props.campaign.image == undefined) {return;}
        const image = new Image();
        image.src = props.campaign.image;
        image.onload = () => {
            setState({...state, width: image.naturalWidth, height: image.naturalHeight, loading: false});
        };
    },[props.campaign]);

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
    return(
        <div>
            <p className='banner'>{props.campaign.name}</p>
            <MapContainer center={[0, 0]}
                          zoom={0}
                          keyboard={false}
                          scrollWheelZoom={false}
                          crs={CRS.Simple}
                          dragging={false}
                          zoomControl={false}
            >
                <ImageOverlay url={props.campaign.image}
                              ref={overlayRef}
                              bounds={[[0,0],[0,0]]}
                              eventHandlers={{load: handleLoad}}
                />
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
            <Link to={`/campaigns/${props.campaign.name}/addworld`}>Add World</Link>
                <br />
            {props.Application.state.currentUser.role === "admin" ? // if user is admin
                <Link to={`/campaigns/${props.campaign.name}/update`}>Edit Campaign</Link>
            : // else
                "" /* end if user is admin */}
        </div>
    );
}

export default Campaign;
