import React from "react";
import Pin from './Pin.js';
import NewPin from './NewPin.js';

class World extends React.Component {
    constructor(props) {
        super();
        this.reloadPins = this.reloadPins.bind(this);
        this.cancelPin = this.cancelPin.bind(this);
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

    reloadPins(newPin) {
        let newWorld = this.state.world;
        newWorld.pins.push(newPin);
        this.setState({
            ...this.state,
            world:newWorld,
            newPin: false
        });
    }

    cancelPin() {
        this.setState({
            ...this.state,
            newPin:false
        });
    }

    render() {
        return (
            <div>
                <p className='banner'>{this.state.world.name}</p>
                <div className='world' >
                    <img
                        src={this.state.world.image}
                        onClick={this.addNewPin}
                        alt='World Failed to load you should refresh the application'
                    />
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
                            onSubmit={this.reloadPins}
                            onCancel={this.cancelPin}
                    />
                : null// else
                /*end if new pin is being made*/}
            </div>
        );
    }
}

export default World;
