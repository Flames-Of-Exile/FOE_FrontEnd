import React from "react"
import World from './World.js'

const axios = require("axios").default

// function Campaign(props) {
    
//     return (
//         <div>
//             <p>{props.campaign.name}</p>
//             <img src={props.campaign.image} />
//         </div>
//     )
// }

class Campaign extends React.Component {
    constructor(props) {
        super()
        this.state = {
            campaign: {}
        }
    }

    async componentDidMount() {
        const response = await axios.get(`/api/campaigns/${this.state.campaign.id}`)
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
                {this.state.campaign.worlds.map( w => (
                    <World key={w.id}
                           id={w.id}
                    ></World>
                ))}
            </div>
        )
    }
}

export default Campaign