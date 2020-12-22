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
        if (['yew','copper','granite','spider','human', 'urgu'].includes(resource)) {
            return '#ff0000';
        } 
        if (['birch', 'tin', 'limestone', 'pig', 'elven', 'elementals'].includes(resource)) {
            return '#ff8800';
        }
        if (['ash', 'iron', 'travertine', 'cat', 'monster', 'satyr'].includes(resource)){
            return '#ffff00';
        } 
        if (['oak', 'silver', 'slate', 'auroch', 'stoneborn', 'aracoix'].includes(resource)) {
            return '#00ff00';
        } 
        if (['spruce', 'aurelium', 'marble', 'elk', 'guinecian', 'underhill'].includes(resource)) {
            return '#00ffff';
        } 
        if (['wolf', 'enbarri'].includes(resource)) {
            return '#0000ff';
        }
        if (['gryphon', 'thralls'].includes(resource)) {
            return '#8800ff';
        }
        if (['bear'].includes(resource)) {
            return '#ff0088';
        }
        return '#ffffff';
    }

    function rankSelector(rank) {
        switch(rank) {
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                return ['#1d014d',.3]
            default:
                return ['#000000',.1]
        }
    }

    useEffect(() => {
        let resourceColor = colorSetter(props.pin.resource);
        let strokeAtribs = rankSelector(props.pin.rank);
        let iconStyle = {stroke: resourceColor, fill: '#000000', strokeWidth: .1};
        let borderStyle = {stroke: strokeAtribs[0], fill: resourceColor, strokeWidth: strokeAtribs[1]};
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