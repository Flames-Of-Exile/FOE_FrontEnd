import React from 'react'
import Campaign from './Campaign.js'

const axios = require('axios').default

class CampaignSelector extends React.Component {
    constructor(props) {
        super()
        this.state = {
            Application: props.Application,
            campaigns: [],
            activeCampaign: ''
        }
    }

    async componentDidMount() {
        const response = await axios.get(`/api/campaigns`)
        this.setState({
            ...this.state,
            campaigns:response.data,
        })
    }

    handleChange(value) {
        this.setState({
            ...this.state,
            activeCampaign:value,
        })
    }

    render() {
        return(
            <div>
                <input type='select' name='campaigns' onChange={this.handleChange(value)}>
                    {this.state.campaigns.map( campaign => (
                        <option value={campaign}>{campaign.match.params.name}</option>
                    ))}
                </input>
                {this.state.activeCampaign ? <Campaign match = {this.state.activeCampaign}/>:<div/>}
            </div>
        )
    }
}

export default CampaignSelector