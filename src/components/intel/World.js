import React from "react";
import Pin from './Pin.js';
import NewPin from './NewPin.js';

const axios = require('axios').default;

class World extends React.Component {
    constructor() {
        super();
        this.cancelPin = this.cancelPin.bind(this);
        this.state = {
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

    cancelPin() {
        this.setState({
            ...this.state,
            newPin:false
        });
    }

    render() {
        if (this.props.world) {
            return (
                <div>
                    <p className='banner'>{this.props.world.name}</p>
                    <div className='world' >
                        <img
                            src={this.props.world.image}
                            onClick={this.addNewPin}
                            alt='World Failed to load you should refresh the application'
                        />
                        {this.props.world.pins.map(point => (
                            <Pin key={point.id.toString()}
                                pin={point}
                            />
                        ))}
                    </div>
                    {this.state.newPin ? // if a new pin is being made
                        <NewPin position_x={this.state.newPinPosition[0]} 
                                position_y={this.state.newPinPosition[1]}
                                world_id={this.props.world.id}
                                onSubmit={this.cancelPin}
                                onCancel={this.cancelPin}
                        />
                    : null// else
                    /*end if new pin is being made*/}
                </div>
            );
        } else {
            return (<div></div>)
        }
    }
}

export default World;
