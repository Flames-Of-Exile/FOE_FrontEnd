import React, { useEffect, useState } from "react";
import { MapContainer, ImageOverlay } from 'react-leaflet';
import { CRS } from "leaflet";

import FilterBox from './FilterBox';
import Pin from './Pin.js';
import NewPin from './NewPin.js';
import Socket from "../../helper_functions/Socket";

const queryString = require('query-string');

const socket = new Socket();

function World(props) {
    const [state, setState] = useState({
        width: 0,
        height: 0,
        loading: true,
        filterOptions: queryString.parse(props.location.search),
        pins: []
    });

    useEffect(() => {
        socket.connect();
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (props.world == undefined) {return;}
        const image = new Image();
        image.src = props.world.image;
        image.onload = () => setState({
            ...state,
            width: image.naturalWidth,
            height: image.naturalHeight,
            loading: false,
            pins: filterPins(queryString.parse(props.location.search))
    });
    },[props.world]);

    useEffect(() => {
        setState({
            ...state,
            pins: filterPins(queryString.parse(props.location.search))
        });
    }, [props.location.search, state.loading]);

    const filterPins = (filterOptions) => {
        if (filterOptions) {
            return props.world.pins.filter(pin => {
                if (filterOptions.type) {
                    if (!filterOptions.type.split(',').includes(pin.symbol)) {
                        return false;
                    }
                }
                if (filterOptions.resource) {
                    if (!filterOptions.resource.split(',').includes(pin.resource) && pin.resource !== 'na') {
                        return false;
                    }
                }
                if (filterOptions.rank) {
                    if (pin.rank && !filterOptions.rank.includes(pin.rank)) {
                        return false;
                    }
                }
                if (filterOptions.amount) {
                    if (pin.amount && !filterOptions.amount >= (pin.amount)) {
                        return false;
                    }
                }
                return true;
            });
        }
        return props.world.pins;
    };
    
    if (state.loading) {return null;}
    return (
        <div>
            <MapContainer center={[0, 0]} zoom={-1} scrollWheelZoom={true} crs={CRS.Simple} minZoom={-3} >
                <NewPin world_id={props.world.id} socket={socket}/>
                <ImageOverlay url={props.world.image}
                              bounds={[[-1 * state.height, -1 * state.width], [state.height, state.width]]} />
                {state.pins.map(pin => <Pin key={pin} pin={pin} socket={socket} Application={props.Application}/>)}
            </MapContainer>
            <FilterBox history={props.history} location={props.location} query={queryString.parse(props.location.search)}/>
        </div>
    );
}

export default World;
