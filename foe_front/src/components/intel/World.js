import React from "react"
import Pin from './Pin.js'

const axios = require("axios").default

class World extends React.Component {
    constructor(props) {
        super()
        this.state = {
            Application: props.Application,
            id: props.match.params.id,
            world: {}
        }
    }

    async componentDidMount() {
        const response = await axios.get(`/api/worlds/${this.state.id}`)
        this.setState({
            ...this.state,
            world: response.data,
        })
    }
    
    render() {
        return(
            <div>
                <p>{this.state.world.name}</p>
                <img src={this.state.world.image} />
                {response.data.pins.map(point => (
                    <Pin key={point.id}
                         x = {point.position_x}
                         y = {point.position_y}
                         type = {point.symbol}
                         details = {point.details}
                    />
                ))}
            </div>
        )
    }
}

export default World