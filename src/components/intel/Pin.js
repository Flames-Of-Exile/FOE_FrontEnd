import React from 'react';
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



class Pin extends React.Component{
    constructor(props) {
        super();
        this.state = {
            Application: props.Application,
            symbol: props.pin.symbol,
            details: props.pin,
            resource: props.pin.resource,
            borderStyle: {
                stroke:'#000000',
                fill:'#ffffff'
            },
            iconStyle: {
                stroke:'#ffffff',
                fill:'#000000'
            },
            cutoutStyle: {
                stroke:'#ffffff',
                fill:'#ffffff'
            },
            svg: <svg/>
        };
    }

    chooseSVG() {
        switch(this.state.symbol) {
            case 'animal-boss':
                return <AnimalBoss
                            iconStyle={this.state.iconStyle}
                            borderStyle={this.state.borderStyle}
                            cutoutStyle={this.state.cutoutStyle}
                        />;
            case 'animal':
                return <Animal
                            iconStyle={this.state.iconStyle}
                            borderStyle={this.state.borderStyle}
                            cutoutStyle={this.state.cutoutStyle}
                        />;
            case 'grave':
                return <Grave
                            iconStyle={this.state.iconStyle}
                            borderStyle={this.state.borderStyle}
                            cutoutStyle={this.state.cutoutStyle}
                        />;
            case 'mob-boss':
                return <MobBoss
                            iconStyle={this.state.iconStyle}
                            borderStyle={this.state.borderStyle}
                            cutoutStyle={this.state.cutoutStyle}
                        />;
            case 'ore-motherlode':
                return <OreMotherlode
                            iconStyle={this.state.iconStyle}
                            borderStyle={this.state.borderStyle}
                            cutoutStyle={this.state.cutoutStyle}
                        />;
            case 'ore':
                return <Ore
                            iconStyle={this.state.iconStyle}
                            borderStyle={this.state.borderStyle}
                            cutoutStyle={this.state.cutoutStyle}
                        />;
            case 'stone-motherlode':
                return <StoneMotherlode
                            iconStyle={this.state.iconStyle}
                            borderStyle={this.state.borderStyle}
                            cutoutStyle={this.state.cutoutStyle}
                        />;
            case 'stone':
                return <Stone
                            iconStyle={this.state.iconStyle}
                            borderStyle={this.state.borderStyle}
                            cutoutStyle={this.state.cutoutStyle}
                        />;
            case 'well':
                return <Well
                            iconStyle={this.state.iconStyle}
                            borderStyle={this.state.borderStyle}
                            cutoutStyle={this.state.cutoutStyle}
                        />;
            case 'wood':
                return <Wood
                            iconStyle={this.state.iconStyle}
                            borderStyle={this.state.borderStyle}
                            cutoutStyle={this.state.cutoutStyle}
                        />;
            default:
                return<div style={this.state.containerStyle}>
                        <img
                            src={'/staticfiles/icons/' + this.state.symbol + '.png'}
                            alt=''
                        />
                    </div>;
        }
    }

    colorSetter() {
        let resource = this.state.resource;
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

    async componentDidMount() {
        var pickSVG = this.chooseSVG();
        var resourceColor = this.colorSetter();
        var iconColor = '#000000';
        this.setState({
            ...this.state,
            svg:pickSVG,
            iconStyle:{
                stroke: resourceColor,
                fill: iconColor
            },
            borderStyle:{
                stroke:'#000000',
                fill: resourceColor
            },
            cutoutStyle:{
                stroke: resourceColor,
                fill: resourceColor
            },
        });
    }

    render() {
        return(
            <Marker position={[this.props.pin.position_y, this.props.pin.position_x]} icon={new Icon({
                iconUrl: 'data:image/svg+xml,' + escape(ReactDOMServer.renderToStaticMarkup((this.state.svg))),
                iconSize: [25, 50],
                iconAnchor: [12.5, 50]
            })}>
                <PinDetails offset={[0, -50]} pin={this.props.pin} />
            </Marker>
        );
    }
}

export default Pin;