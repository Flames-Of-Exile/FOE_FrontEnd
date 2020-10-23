import React from "react";
import Pin from './Pin.js';
import NewPin from './NewPin.js';
import Axios from "axios";

const axios = require('axios').default;

class World extends React.Component {
    constructor(props) {
        super();
        this.state = {
            world: props.world,
            newPin: false,
            newPinPosition: [0,0]
        };
    }

    addNewPin = (e) => {
        var worldLoc = e.target.getBoundingClientRect();
        var leftOffsetAbs = e.clientX - worldLoc.left;
        var bottomOffsetAbs = worldLoc.bottom - e.clientY;
        const leftPercent = (leftOffsetAbs)/(worldLoc.right - worldLoc.left)*100-1.3;
        const bottomPercent = (bottomOffsetAbs)/(worldLoc.bottom - worldLoc.top)*100;
        const placePin = [leftPercent, bottomPercent];
        this.setState({
            ...this.state,
            newPin: true,
            newPinPosition: placePin
        });
    }

    async reloadPins() {
        try {
            let refreshedWorld = await axios.get('api/worlds/' + this.state.world.id)
            console.log(refreshedWorld)
            this.setState({
                ...this.state,
                world:refreshedWorld
            })
        }
        catch (error) {
            console.log('Failed to refresh world - ', error)
        }
    }
    

    render() {
        return (
            <div>
                <p className='banner'>{this.state.world.name}</p>
                <div className='world' >
                    <img src={this.state.world.image} onClick={this.addNewPin} alt='World Failed to load you should refresh the application' />
                    {this.state.world.pins.map(point => (
                        <Pin key={point.id.toString()}
                            pin={point}
                        />
                    ))}
                </div>
                {this.state.newPin ? // if a new pin is being made
                    <NewPin position_x={this.state.newPinPosition[0]} 
                            position_y={this.state.newPinPosition[1]}
                            world_id={this.state.world.id}
                            onSubmit={this.reloadPins.bind(this)}
                    />
                : null// else
                /*end if new pin is being made*/}
            </div>
        );
    }
}

export default World;
