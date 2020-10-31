import React from 'react';

import {
    Switch,
    Route,
  } from "react-router-dom";

import Campaign from './Campaign.js';
import World from "./World";
import NewWorld from "./NewWorld";

const axios = require('axios').default;

class CampaignSelector extends React.Component {
    constructor(props) {
        super();
        this.campaignElement = React.createRef();
        this.state = {
            Application: props.Application,
            campaigns: [],
            activeCampaign: { worlds: [], name: "" },
            selectedIndex: -1
        };
    }

    async componentDidMount() {
        const response = await axios.get(`/api/campaigns`);
        let campaigns = response.data;
        let activeCampaign = response.data[0];
        if (this.props.match.params.campaign) {
            activeCampaign = campaigns.filter(campaign => campaign.name === this.props.match.params.campaign)[0];
        }
        await this.setState({
            ...this.state,
            campaigns: campaigns,
            activeCampaign: activeCampaign,
            selectedIndex: campaigns.indexOf(activeCampaign),
        });
        if (activeCampaign && this.props.location.pathname === "/campaigns") {
            this.props.history.push(`/campaigns/${activeCampaign.name}`);
        }
    }

    handleChange = (event) => {
        let index = event.target.value;
        if (index == -1) {
            return;
        }
        this.props.history.push(`/campaigns/${this.state.campaigns[index].name}`);
        this.setState({
            ...this.state,
            activeCampaign: this.state.campaigns[index],
            selectedIndex: index
        });
    }

    render() {
        return(
            <div>
                <select name='activeCampaign'
                        id='selector'
                        placeholder='Please Choose a Campaign'
                        onChange={this.handleChange}
                        value={this.state.selectedIndex}
                >
                    <option value={-1}>Please Choose a Campaign</option>
                    {this.state.campaigns.map( (campaign, index) => ( 
                        <option key={index} value={index}>{campaign.name}</option>
                    ))}
                </select>
                <Switch>
                    <Route exact path="/campaigns/:campaign/addworld" render={props => <NewWorld {...props}
                                                                                        Application={this.props.Application}
                                                                                        campaign={this.state.activeCampaign}/>}
                                                                                        />
                    <Route exact path="/campaigns/:campaign/:world" render={props => <World {...props} 
                                                                                      Application={this.props.Application} />}
                                                                                      />
                    <Route exact path="/campaigns/:campaign" render={props => <Campaign {...props}
                                                                               Application={this.props.Application} />}
                                                                               />
                </Switch>
            </div>
        );
    }
}

export default CampaignSelector;
