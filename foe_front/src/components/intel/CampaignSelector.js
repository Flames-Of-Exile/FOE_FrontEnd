import React from 'react'
import Campaign from './Campaign.js'

const axios = require('axios').default

class CampaignSelector extends React.Component {
    constructor(props) {
        super()
        this.state = {
            Application: props.Application,
            campaigns: [],
            activeCampaign: {}
        }
    }

    async componentDidMount() {
        const response = await axios.get(`/api/campaigns`)
        this.setState({
            ...this.state,
            campaigns: response.data,
            activeCampaign: response.data[0]
        })
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        })
    }


    render() {
        return(
            <div>
                <select name='activeCampaign' id='selector' value={this.state.activeCampaign} onChange={this.handleChange}>
                    {this.state.campaigns.map( campaign => (
                        <option value={campaign}>{campaign.name}</option>
                    ))}
                </select>
                {this.state.activeCampaign ? <Campaign campaign = {this.state.activeCampaign}/>:<div/>}
            </div>
        )
    }
}

export default CampaignSelector