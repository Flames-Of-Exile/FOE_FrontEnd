import React from "react"
import World from './World.js'

//const axios = require("axios").default

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
            campaign: props.campaign
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.campaign !== prevProps.campaign) {
            this.setState({
                ...this.state,
                campaign:this.props.campaign
            })
        }
    }
    // async componentDidMount() {
    //     const response = await axios.get(`/api/worlds/campaign/${this.state.campaign.id}`)
    //     this.setState({
    //         ...this.state,
    //         campaign: response.data,
    //     })
    // }

    renderWorlds() {
        if(this.state.campaign.worlds) {
            return this.state.campaign.worlds.map( w => (
                <World key={w.id}
                        id={w.id}/>
            ))
        }
    }
    
    render() {
        return(
            <div>
                <p>{this.state.campaign.name}</p>
                <img src={this.state.campaign.image} />
                {console.log(this.state.campaign)}
                {this.renderWorlds}
            </div>
        )
    }
}

export default Campaign