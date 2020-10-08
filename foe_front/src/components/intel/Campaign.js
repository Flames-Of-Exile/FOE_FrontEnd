import React from "react"
import World from './World.js'

class Campaign extends React.Component {
    constructor(props) {
        super()
        this.state = {
            campaign: props.campaign,
            loaded: false
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.campaign !== prevProps.campaign) {
            this.setState({
                ...this.state,
                campaign:this.props.campaign,
                loaded:true,
            })
        }
    }

    render() {
        return(
            <div>
                <p>{this.state.campaign.name}</p>
                <img src={this.state.campaign.image} />
                {console.log(this.state.campaign.worlds)}
                <div id='placeWorldsGo'></div>
                {this.state.loaded ? this.state.campaign.worlds.map( (world) => (
                <World key={world.id}
                        id={world.id}/>
                )): null}
            </div>
        )
    }
}

export default Campaign