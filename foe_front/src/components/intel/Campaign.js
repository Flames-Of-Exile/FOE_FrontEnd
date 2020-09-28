import React from "react"

const axios = require("axios").default

class Campaign extends React.Component {
    constructor(props) {
        super()
        this.state = {
            Application: props.Application,
            id: props.match.params.id,
            campaign: {}
        }
    }

    async componentDidMount() {
        const response = await axios.get(`/api/campaigns/${this.state.id}`)
        this.setState({
            ...this.state,
            campaign: response.data,
        })
    }
    
    render() {
        return(
            <div>
                <p>{this.state.campaign.name}</p>
                <img src={this.state.campaign.image} />
            </div>
        )
    }
}

export default Campaign