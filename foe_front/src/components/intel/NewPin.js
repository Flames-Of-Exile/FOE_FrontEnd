import React from "react"
import Pin from './Pin.js'

const axios = require("axios").default

class NewPin extends React.Component {
    constructor(props) {
        super()
        this.state = {
            Application: props.Application,
            position_x: props.position_x,
            position_y: props.position_y,
            symbol: "",
            details: "",
            world_id: 0,
        }
    }

    handleChange = (event) => this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
    })

    handleSubmit = async () => {
        try {
            const response = await axios.post("/api/pins", JSON.stringify({
                position_x: this.state.position_x,
                position_y: this.state.position_y,
                symbol: this.state.symbol,
                details: this.state.details,
                world_id: this.state.world_id,
            }))
            console.log(response)
        } catch (error) {
            console.log("Failed to create pin -", error.message)
        }
    }

    
    render() {
        return (
            <div>
                <input type="number" name="position_x" onChange={this.handleChange}/>
                <input type="number" name="position_y" onChange={this.handleChange}/>
                <input type="select" name="symbol" onChange={this.handleChange}>
                    <option value='stone'>Stone</option>
                    <option value='stoneML'>Stone Motherload</option>
                    <option value='ore'>Ore</option>
                    <option value='oreML'>Ore Motherload</option>
                    <option value='wood'>Wood</option>
                    <option value='animal'>Animal</option>
                    <option value='animalBoss'>Animal Boss</option>
                    <option value='camp'>Camp</option>
                    <option value='Boss'>Boss</option>
                    <option value='well'>Well</option>
                    <option value='grave'>Grave</option>
                    <option value='tacFire'>Tachtical Fire</option>
                    <option value='tacFish'>Tachtical Fish</option>
                    <option value='tacHouse'>Tachtical House</option>
                </input>
                <input type="text" name="details" onChange={this.handleChange}/>
                <input type="number" name="world_id" onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

export default NewPin
