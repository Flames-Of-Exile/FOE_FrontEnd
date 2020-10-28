import React from 'react';

import PinDetails from './PinDetails.js';
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



class Pin extends React.Component{
    constructor(props) {
        super();
        this.state = {
            Application: props.Application,
            symbol: props.pin.symbol,
            containerStyle:{
                bottom: props.pin.position_y + '%',
                left: props.pin.position_x + '%',
            },
            visibility: 'hidden',
            id: props.pin.id,
            details: props.pin,
            resource: props.pin.resource,
            boarderStyle: {
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
        };
    };

    setVis = () => this.setState({
        ...this.state,
        Application: {
            ...this.state.Application,
            // TODO: add visibility to application 
        }
    });

    setInvis = () => this.setState({
        ...this.state,
        visibility: 'hidden',
    });

    choseSVG() {
        switch(this.state.symbol) {
            case 'animal-boss':
                return <AnimalBoss iconStyle={this.state.iconStyle} boarderStyle={this.state.boarderStyle} cutoutStyle={this.state.cutoutStyle} visibility={this.state.visibility} details={this.state.details}/>;
            case 'animal':
                return <Animal iconStyle={this.state.iconStyle} boarderStyle={this.state.boarderStyle} cutoutStyle={this.state.cutoutStyle} visibility={this.state.visibility} details={this.state.details} />;
            case 'grave':
                return <Grave iconStyle={this.state.iconStyle} boarderStyle={this.state.boarderStyle} cutoutStyle={this.state.cutoutStyle} visibility={this.state.visibility} details={this.state.details}/>;
            case 'mob-boss':
                return <MobBoss iconStyle={this.state.iconStyle} boarderStyle={this.state.boarderStyle} cutoutStyle={this.state.cutoutStyle} visibility={this.state.visibility} details={this.state.details}/>;
            case 'ore-motherlode':
                return <OreMotherlode iconStyle={this.state.iconStyle} boarderStyle={this.state.boarderStyle} cutoutStyle={this.state.cutoutStyle} visibility={this.state.visibility} details={this.state.details}/>;
            case 'ore':
                return <Ore iconStyle={this.state.iconStyle} boarderStyle={this.state.boarderStyle} cutoutStyle={this.state.cutoutStyle} visibility={this.state.visibility} details={this.state.details}/>;
            case 'stone-motherlode':
                return <StoneMotherlode iconStyle={this.state.iconStyle} boarderStyle={this.state.boarderStyle} cutoutStyle={this.state.cutoutStyle} visibility={this.state.visibility} details={this.state.details}/>;
            case 'stone':
                return <Stone iconStyle={this.state.iconStyle} boarderStyle={this.state.boarderStyle} cutoutStyle={this.state.cutoutStyle} visibility={this.state.visibility} details={this.state.details}/>;
            case 'well':
                return <Well iconStyle={this.state.iconStyle} boarderStyle={this.state.boarderStyle} cutoutStyle={this.state.cutoutStyle} visibility={this.state.visibility} details={this.state.details}/>;
            case 'wood':
                return <Wood iconStyle={this.state.iconStyle} boarderStyle={this.state.boarderStyle} cutoutStyle={this.state.cutoutStyle} visibility={this.state.visibility} details={this.state.details}/>;
            default:
                return<div className='pin' style={this.state.containerStyle}>
                        <img src={'/staticfiles/icons/' + this.state.symbol + '.png'} alt='' onMouseEnter={this.setVis} onMouseLeave={this.setInvis}>
                        </img>
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
        var pickSVG = this.choseSVG();
        var resourceColor = this.colorSetter();
        var iconColor = '#000000';
        await this.setState({
            ...this.state,
            svg:pickSVG,
            iconStyle:{
                stroke: resourceColor,
                fill: iconColor
            },
            boarderStyle:{
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
            <div className='pin' style={this.state.containerStyle} onMouseOver={this.setVis} onMouseOut={this.setInvis}>
                {this.choseSVG()}
            </div>
        );
    }
}

export default Pin;