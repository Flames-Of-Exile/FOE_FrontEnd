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
    content() {
        return(
            <div>
            <p className='banner'>{this.state.campaign.name}</p>
            <p>The campaign ID is {this.state.campaign.id}</p>
            <img src={this.state.campaign.image} alt='Faled to Load Campaign'/>
            {this.state.loaded ? this.state.campaign.worlds.map( (world) => (
            <World key={world.id}
                    id={world.id}
                    world={world}/>
            )): null}
        </div>
        )
    }

    render() {
        return(
            <div>
            {this.state.campaign ? this.content(): null}
            </div>
        )
    }
}

export default Campaign