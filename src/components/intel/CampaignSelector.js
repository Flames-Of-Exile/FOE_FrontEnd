import React from 'react';

import {
    Switch,
    Route,
  } from "react-router-dom";

import Campaign from './Campaign.js';
import World from "./World";
import NewWorld from "./NewWorld";
import Socket from "../../helper_functions/Socket";

const axios = require('axios').default;

class CampaignSelector extends React.Component {
    constructor(props) {
        super();
        this.state = {
            Application: props.Application,
            campaigns: [],
            activeCampaign: { worlds: [], name: "" },
            selectedIndex: -1,
            activeWorld: { pins: []},
        };
        this.socket = new Socket()
    }

    async componentDidMount() {
        this.socket.connect();
        this.socket.registerListener('campaign-update', this.handleCampaignUpdate);
        const response = await axios.get(`/api/campaigns`);
        let campaigns = response.data;
        let activeCampaign = response.data[0];
        let activeWorld = { pins: []}
        if (this.props.match.params.campaign) {
            activeCampaign = campaigns.filter(campaign => campaign.name === this.props.match.params.campaign)[0];
            if (this.props.match.params.world) {
                activeWorld = activeCampaign.worlds.filter(world => world.name === this.props.match.params.world)[0];
            }
        }
        await this.setState({
            ...this.state,
            campaigns: campaigns,
            activeCampaign: activeCampaign,
            selectedIndex: campaigns.indexOf(activeCampaign),
            activeWorld: activeWorld,
        });
        if (activeCampaign && this.props.location.pathname === "/campaigns") {
            this.props.history.push(`/campaigns/${activeCampaign.name}`);
        }
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    handleCampaignUpdate = (data) => {
        let activeCampaign = data[0];
        let activeWorld = { pins: [] };
        if (this.props.match.params.campaign) {
            activeCampaign = data.filter(campaign => campaign.name === this.props.match.params.campaign)[0];
            if (this.props.match.params.world) {
                activeWorld = activeCampaign.worlds.filter(world => world.name === this.props.match.params.world)[0];
            }
        }
        this.setState({
            ...this.state,
            campaigns: data,
            activeCampaign: activeCampaign,
            activeWorld: activeWorld,
        })
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
                                                                                      Application={this.props.Application}
                                                                                      world={this.state.activeWorld} />}
                                                                                      />
                    <Route exact path="/campaigns/:campaign" render={props => <Campaign {...props}
                                                                               Application={this.props.Application}
                                                                               campaign={this.state.activeCampaign} />}
                                                                               />
                </Switch>
            </div>
        );
    }
}

export default CampaignSelector;
