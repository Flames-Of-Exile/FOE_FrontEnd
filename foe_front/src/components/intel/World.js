import React from "react"
import Pin from './Pin.js'
import NewPin from './NewPin.js'

const axios = require("axios").default

class World extends React.Component {
    constructor(props) {
        super()
        this.state = {
            Application: props.Application,
            id: props.match.params.id,
            world: {pins: []},
            newPin: false,
            newPinPosition: [0,0]
        }
    }

    async componentDidMount() {
        const response = await axios.get(`/api/worlds/${this.state.id}`)
        this.setState({
            ...this.state,
            world: response.data,
        })
    }

    addNewPin = (e) => {
        let world = document.getElementById('worldImg')
        let worldLoc = world.getBoundingClientRect()
        this.setState({
            ...this.state,
            newPin: true,
            newPinPosition: [e.clientX - worldLoc.left, e.clientY - worldLoc.top]
        })
    }
    
    render() {
        return(
            <div id = 'worldImg' onClick={this.addNewPin}>
                <p>{this.state.world.name}</p>
                <img src={this.state.world.image} />
                {this.state.world.pins.map(point => (
                    <Pin key={point.id}
                         x = {point.position_x}
                         y = {point.position_y}
                         type = {point.symbol}
                         details = {point.details}
                    />
                ))}
                {this.state.newPin ? // if a new pin is being made
                    <NewPin position_x={this.state.newPinPosition[0]} 
                            position_y={this.state.newPinPosition[1]}
                            world_id={this.state.id}
                    />
                : // else
                    ""
                /*end if new pin is being made*/}
            </div>
        )
    }
}

export default World