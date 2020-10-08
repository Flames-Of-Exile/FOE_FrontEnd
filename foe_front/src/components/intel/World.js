import React from "react"
import Pin from './Pin.js'
import NewPin from './NewPin.js'

const axios = require("axios").default

class World extends React.Component {
    constructor(props) {
        super()
        this.state = {
            world: props.world,
            id: props.id,
            newPin: false,
            newPinPosition: [0,0],
            loaded: false,
            uniqueID: 'world' + props.id
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
                id:this.props.id,
                loaded: true,
                uniqueID: 'world' + this.props.id
            })
        }

    }

    getWorldLoc() {
        let world = document.getElementById(this.state.uniqueID)
        return world.getBoundingClientRect()
    }

    addNewPin = (e) => {

        this.setState({
            ...this.state,
            newPin: true,
            newPinPosition: [e.clientX - this.getWorldLoc().left, e.clientY - this.getWorldLoc().top]
        })
    }
    
    content() {
        return(
            <div id={this.state.uniqueID} onClick={this.addNewPin}>
                <p>{this.state.world.name}</p>
                <div>
                <img id={this.state.uniqueID} src={this.state.world.image} alt='World Failed to load you should refresh the application' />
                {this.state.world.pins.map(point => (
                    <Pin key={point.id.toString()}
                        id = {point.id}
                        x = {point.position_x}
                        y = {point.position_y}
                        symbol = {point.symbol}
                        details = {point.details}
                        worldName = {this.state.uniqueID}

                    />
                ))}</div>
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