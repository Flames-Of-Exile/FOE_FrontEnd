import React from "react"

import Edit from './Edit'

const axios = require("axios").default

class PinHistory extends React.Component {
    constructor(props) {
        super()
        this.state = {
            Application: props.Application,
            id: props.match.params.id,
            pin: {edits: []},
        }
    }

    async componentDidMount() {
        const response = await axios.get(`/api/pins/${this.state.id}`)
        this.setState({
            ...this.state,
            pin: response.data,
        })
    }
    
    render() {
        return(
            <div>
                <p>{this.state.pin.position_x} / {this.state.pin.position_y}</p>
                <p>{this.state.pin.symbol}</p>
                {this.state.pin.edits.map(edit => <Edit edit={edit} />)}
            </div>
        )
    }
}

export default PinHistory