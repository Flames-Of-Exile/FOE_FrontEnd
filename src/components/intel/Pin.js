import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";

import Animal from './pins/Animal.js';
import AnimalBoss from './pins/AnimalBoss.js';
import Grave from './pins/Grave.js';
import Mob from './pins/Mob.js';
import MobBoss from './pins/MobBoss.js';
import Ore from './pins/Ore.js';
import OreMotherlode from './pins/OreMotherlode.js';
import Stone from './pins/Stone.js';
import StoneMotherlode from './pins/StoneMotherlode.js';
import Well from './pins/Well.js';
import Wood from './pins/Wood.js';

import tactical_fire from '../../staticfiles/icons/tactical-fire.png';
import tactical_fish from '../../staticfiles/icons/tactical-fish.png';
import tactical_house from '../../staticfiles/icons/tactical-house.png';

import PinDetails from './PinDetails';
import PinUpdate from './PinUpdate';



function Pin(props){
    const [state, setState] = useState({
        url: "http://",
        isEditing: false,
    });

    function chooseSVG(iconStyle, borderStyle, cutoutStyle) {
        switch(props.pin.symbol) {
            case 'animal-boss':
                return 'data:image/svg+xml,' + escape(ReactDOMServer.renderToStaticMarkup(<AnimalBoss
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />));
            case 'animal':
                return 'data:image/svg+xml,' + escape(ReactDOMServer.renderToStaticMarkup(<Animal
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />));
            case 'grave':
                return 'data:image/svg+xml,' + escape(ReactDOMServer.renderToStaticMarkup(<Grave
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />));
            case 'mob':
                return 'data:image/svg+xml,' + escape(ReactDOMServer.renderToStaticMarkup(<Mob
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />));
            case 'mob-boss':
                return 'data:image/svg+xml,' + escape(ReactDOMServer.renderToStaticMarkup(<MobBoss
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />));
            case 'ore-motherlode':
                return 'data:image/svg+xml,' + escape(ReactDOMServer.renderToStaticMarkup(<OreMotherlode
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />));
            case 'ore':
                return 'data:image/svg+xml,' + escape(ReactDOMServer.renderToStaticMarkup(<Ore
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />));
            case 'stone-motherlode':
                return 'data:image/svg+xml,' + escape(ReactDOMServer.renderToStaticMarkup(<StoneMotherlode
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />));
            case 'stone':
                return 'data:image/svg+xml,' + escape(ReactDOMServer.renderToStaticMarkup(<Stone
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />));
            case 'well':
                return 'data:image/svg+xml,' + escape(ReactDOMServer.renderToStaticMarkup(<Well
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />));
            case 'wood':
                return 'data:image/svg+xml,' + escape(ReactDOMServer.renderToStaticMarkup(<Wood
                            iconStyle={iconStyle}
                            borderStyle={borderStyle}
                            cutoutStyle={cutoutStyle}
                        />));
            case 'tactical-fire':
                return tactical_fire;
            case 'tactical-fish':
                return tactical_fish;
            case 'tactical-house':
                return tactical_house;
            default:
                return '/staticfiles/icons/' + props.pin.symbol + '.png';
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
        let iconStyle = {stroke: resourceColor, fill: '#000000', strokeWidth: .1};
        let borderStyle = {stroke: '#000000', fill: resourceColor, strokeWidth: .1};
        let cutoutStyle = {stroke: resourceColor, fill: resourceColor, strokeWidth: .1};
        let url = chooseSVG(iconStyle, borderStyle, cutoutStyle);
        setState({
            ...state,
            url: url,
        });
    }, [props.pin]);

    const handleEdit = () => {
        setState({
            ...state,
            isEditing: true,
        });
    };

    const handleCancel = () => {
        setState({
            ...state,
            isEditing: false,
        });
    };


    return(
        <Marker position={[props.pin.position_y, props.pin.position_x]} icon={new Icon({
            iconUrl: state.url,
            iconSize: [35, 70],
            iconAnchor: [17.5, 70]
        })}>
            <Popup offset={[0, -50]} >
                {state.isEditing ? // if editing
                    <PinUpdate pin={props.pin} socket={props.socket} handleCancel={handleCancel} />
                : // else not editing
                    <PinDetails pin={props.pin}
                                socket={props.socket}
                                Application={props.Application}
                                handleEdit={handleEdit}
                    />
                /* end if editing */}
            </Popup>
        </Marker>
    );

}

export default Pin;