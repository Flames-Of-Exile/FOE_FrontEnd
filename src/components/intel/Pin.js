import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Marker } from 'react-leaflet';
import { Icon } from "leaflet";

import Animal from './pins/Animal.js';
import AnimalBoss from './pins/AnimalBoss.js';
import Grave from './pins/Grave.js';
import MobBoss from './pins/MobBoss.js';
import Ore from './pins/Ore.js';
import OreMotherlode from './pins/OreMotherlode.js';
import Stone from './pins/Stone.js';
import StoneMotherlode from './pins/StoneMotherlode.js';
import Well from './pins/Well.js';
import Wood from './pins/Wood.js';

import PinDetails from './PinDetails.js';



function Pin(props){
    const [state, setState] = useState({
        svg: <svg/>,
    });

    function chooseSVG(iconStyle, borderStyle, cutoutStyle) {
        switch(props.pin.symbol) {
            case 'animal-boss':
                return <AnimalBoss
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />;
            case 'animal':
                return <Animal
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />;
            case 'grave':
                return <Grave
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />;
            case 'mob-boss':
                return <MobBoss
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />;
            case 'ore-motherlode':
                return <OreMotherlode
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />;
            case 'ore':
                return <Ore
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />;
            case 'stone-motherlode':
                return <StoneMotherlode
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />;
            case 'stone':
                return <Stone
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />;
            case 'well':
                return <Well
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />;
            case 'wood':
                return <Wood
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />;
            default:
                return<div>
                        <img
                            src={'/staticfiles/icons/' + this.state.symbol + '.png'}
                            alt=''
                        />
                    </div>;
        }
    }

    function colorSetter(resource) {
        if (['yew','copper','granite','spider','human'].includes(resource)) {
            return '#069e2f';
        } 
        if (['birch', 'tin', 'limestone', 'pig', 'elven'].includes(resource)) {
            return '#0cc4a6';
        }
        if (['ash', 'iron', 'travertine', 'cat', 'monster'].includes(resource)){
            return '#097b9e';
        } 
        if (['oak', 'silver', 'slate', 'auroch', 'stoneborn'].includes(resource)) {
            return '#143fcc';
        } 
        if (['spruce', 'aurelium', 'marble', 'elk', 'guinecian'].includes(resource)) {
            return '#6714cc';
        } 
        if (['wolf'].includes(resource)) {
            return '#f00a3b';
        } 
        return '#ffffff';
    }

    useEffect(() => {
        let resourceColor = colorSetter(props.pin.resource);
        let iconStyle = {stroke: resourceColor, fill: '#000000'};
        let borderStyle = {stroke: '#000000', fill: resourceColor};
        let cutoutStyle = {stroke: resourceColor, fill: resourceColor};
        let pickSVG = chooseSVG(iconStyle, borderStyle, cutoutStyle);
        setState({
            ...state,
            svg:pickSVG,
        });
    }, []);


    return(
        <Marker position={[props.pin.position_y, props.pin.position_x]} icon={new Icon({
            iconUrl: 'data:image/svg+xml,' + escape(ReactDOMServer.renderToStaticMarkup(state.svg)),
            iconSize: [35, 70],
            iconAnchor: [17.5, 70]
        })}>
            <PinDetails offset={[0, -80]} pin={props.pin} />
        </Marker>
    );

}

export default Pin;