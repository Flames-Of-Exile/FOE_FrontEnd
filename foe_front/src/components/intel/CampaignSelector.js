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

    handleChange() {
        this.setState({
            ...this.state,
            activeCampaign:document.getElementById('selector').value,
        })
    }


    render() {
        return(
            <div>
                {this.state.activeCampaign ?
                 <div>
                    <input type='select' name='campaigns' id='selector' onChange={this.handleChange()}>
                        {this.state.campaigns.map( campaign => (
                            <option value={campaign}>{campaign.match.params.name}</option>
                        ))}
                    </input>
                    {this.state.activeCampaign ? <Campaign match = {this.state.activeCampaign}/>:<div/>}
                </div> : <div/>
                }
            </div>
        )
    }
}

export default CampaignSelector