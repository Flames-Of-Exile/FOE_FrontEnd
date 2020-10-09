import React from 'react'
import Campaign from './Campaign.js'

const axios = require('axios').default

class CampaignSelector extends React.Component {
    constructor(props) {
        super()
        this.campaignElement = React.createRef()
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
            [event.target.name]: this.state.campaigns[event.target.value],
        })
    }

    render() {
        return(
            <div>
                <select name='activeCampaign' id='selector'placeholder='Please Choose a Campaign' onChange={this.handleChange}>
                    <option value='none'>Please Choose a Campaign</option>
                    {this.state.campaigns.map( (campaign, index) => ( 
                        <option key={index} value={index}>{campaign.name}</option>
                    ))}
                </select>
                <Campaign campaign = {this.state.activeCampaign}/>
            </div>
        )
    }
}

export default CampaignSelector