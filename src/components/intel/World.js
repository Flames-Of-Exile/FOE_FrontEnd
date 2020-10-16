import React from "react";
import Pin from './Pin.js';
import NewPin from './NewPin.js';

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
    

    render() {
        return (
            <div>
                <p>{this.state.world.name}</p>
                <div className='world' onClick={this.addNewPin}>
                    <img src={this.state.world.image} alt='World Failed to load you should refresh the application' />
                    {this.state.world.pins.map(point => (
                        <Pin key={point.id.toString()}
                            x = {point.position_x}
                            y = {point.position_y}
                            symbol = {point.symbol}
                            details = {point.notes}
                        />
                    ))}
                </div>
                {this.state.newPin ? // if a new pin is being made
                    <NewPin position_x={this.state.newPinPosition[0]} 
                            position_y={this.state.newPinPosition[1]}
                            world_id={this.state.world.id}
                    />
                : null// else
                /*end if new pin is being made*/}
            </div>
        );
    }
}

export default World;
