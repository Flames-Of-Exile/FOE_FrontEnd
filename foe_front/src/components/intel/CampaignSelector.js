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
        console.log(event.target)
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        })
    }


    render() {
        return(
            <div>
                <select name='activeCampaign' id='selector'placeholder='Please Choose a Campaign' onChange={this.handleChange}>
                    <option value='none'>Please Choose a Campaign</option>
                    {this.state.campaigns.map( campaign => ( 
                        <option key={campaign.id} value={campaign.id-1}>{campaign.name}</option>
                    ))}
                    {console.log(this.state.activeCampagn)}
                    {console.log(this.state.campaigns)}
                </select>
                {this.state.campaigns[this.state.activeCampaign] ? <Campaign campaign = {this.state.campaigns[this.state.activeCampaign]}/>:<div/>}
            </div>
        )
    }
}

export default CampaignSelector