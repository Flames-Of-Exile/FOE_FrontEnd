import React from "react"

const axios = require("axios").default

class NewPin extends React.Component {
    constructor(props) {
        super()
        this.state = {
            Application: props.Application,
            position_x: 0,
            position_y: 0,
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
                <input type="text" name="symbol" onChange={this.handleChange}/>
                <input type="text" name="details" onChange={this.handleChange}/>
                <input type="number" name="world_id" onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

export default NewPin