import React from "react"

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
            </div>
        )
    }
}

export default World