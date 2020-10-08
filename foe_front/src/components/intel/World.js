import React from "react"
import Pin from './Pin.js'
import NewPin from './NewPin.js'

const axios = require("axios").default

class World extends React.Component {
    constructor(props) {
        super()
        this.state = {
            world: [],
            id: props.id,
            newPin: false,
            newPinPosition: [0,0],
            loaded: false
        }
    }

    async componentDidMount() {
        const response = await axios.get(`/api/worlds/${this.state.id}`)
        this.setState({
            ...this.state,
            world: response.data,
            loaded: true,
        })
    }

    async componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.setState({
                ...this.state,
                id:this.props.id
            })
            const response = await axios.get(`/api/worlds/${this.state.id}`)
            this.setState({
                ...this.state,
                world: response.data,
            })
        }

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
    
    content() {
        return(
            <div id = 'worldImg' onClick={this.addNewPin}>
                <p>{this.state.world.name}</p>
                <img src={this.state.world.image} />
                {console.log(this.state.world.pins)}
                {this.state.world.pins.map(point => (
                    <Pin key={point.id}
                        id = {point.id}
                        x = {point.position_x}
                        y = {point.position_y}
                        symbol = {point.symbol}
                        details = {point.details}
                    />
                ))}
                {this.state.newPin ? // if a new pin is being made
                    <NewPin position_x={this.state.newPinPosition[0]} 
                            position_y={this.state.newPinPosition[1]}
                            world_id={this.state.id}
                    />
                : null// else
                /*end if new pin is being made*/}
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.loaded ? this.content() : null}
            </div>
        )
    }
}

export default World