import React, {
    useEffect,
    useState
} from 'react';

import {
    Switch,
    Route,
} from 'react-router-dom';

import Campaign from './Campaign';
import CampaignUpdate from './CampaignUpdate';
import World from './World';
import WorldUpdate from './WorldUpdate';
import NewWorld from './NewWorld';
import Socket from '../../helper_functions/Socket';

const axios = require('axios').default;

const socket = new Socket();

function CampaignSelector(props) {
    const [state, setState] = useState({
        Application: props.Application,
        campaigns: [],
        activeCampaign: { worlds: [], name: '' },
        selectedCampaignIndex: -1,
        selectedWorldIndex: -1,
        activeWorld: { pins: [], name: '' }
    });

    useEffect(() => {
        socket.connect();
        socket.registerListener('campaign-update', handleCampaignUpdate);
        
        async function fetchData() {
            const response = await axios.get(`/api/campaigns`);
            let campaigns = response.data;
            let activeCampaign = campaigns[0];
            let activeWorld = { pins: [], name: '' };
            let selectedWorldIndex = -1;
            if (props.match.params.campaign) {
                activeCampaign = campaigns.filter(campaign => campaign.name === props.match.params.campaign)[0];
                if (props.match.params.world) {
                    activeWorld = activeCampaign.worlds.filter(world => world.name === props.match.params.world)[0];
                    selectedWorldIndex =activeCampaign.worlds.indexOf(activeWorld);
                }
            }
            setState({
                ...state,
                campaigns: campaigns,
                activeCampaign: activeCampaign,
                selectedCampaignIndex: campaigns.indexOf(activeCampaign),
                activeWorld: activeWorld,
                selectedWorldIndex: selectedWorldIndex
            });
            if (activeCampaign && props.location.pathname === "/campaigns") {
                props.history.push(`/campaigns/${activeCampaign.name}`);
            }
        }

        fetchData();

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        let activeWorld = { pins: [], name: '' };
        if (props.match.params.world) {
            activeWorld = state.activeCampaign.worlds.filter(world => world.name === props.match.params.world)[0];
        }
        setState({
            ...state,
            activeWorld: activeWorld,
        });

    }, [props.match.params.world]);

    useEffect(() => {
        socket.registerListener('campaign-update', handleCampaignUpdate);
    }, [props.match.params]);

    const handleCampaignUpdate = (data) => {
        let activeCampaign = data[0];
        let activeWorld = { pins: [] };
        if (props.match.params.campaign) {
            activeCampaign = data.filter(campaign => campaign.name === props.match.params.campaign)[0];
            if (props.match.params.world) {
                activeWorld = activeCampaign.worlds.filter(world => world.name === props.match.params.world)[0];
            }
        }
        setState({
            ...state,
            campaigns: data,
            activeCampaign: activeCampaign,
            activeWorld: activeWorld,
        });
    };

    const handleCampaignChange = (event) => {
        let index = event.target.value;
        if (index === -1) {
            return;
        }
        props.history.push(`/campaigns/${state.campaigns[index].name}`);
        setState({
            ...state,
            activeCampaign: state.campaigns[index],
            selectedCampaignIndex: index
        });
    };

    const handleWorldChange = (event) => {
        let index = event.target.value;
        if (index === -1) {
            return;
        }
        props.history.push(`/campaigns/${state.activeCampaign.name}/${state.activeCampaign.worlds[index].name}`);
        setState({
            ...state,
            activeWorld: state.activeCampaign.worlds[index],
            selectedWorldIndex: index
        });
    };

    const handleBackToCampaign = () => {
        props.history.push(`/campaigns/${state.activeCampaign.name}`);
    };

    return(
        <div>
            <button onClick={handleBackToCampaign}>{state.activeCampaign.name}</button>
            <select name='activeCampaign'
                    id='selector'
                    placeholder='Please Choose a Campaign'
                    onChange={handleCampaignChange}
                    value={state.selectedCampaignIndex}
            >
                <option value={-1}>Please Choose a Campaign</option>
                {state.campaigns.map( (campaign, index) => ( 
                    <option key={index} value={index}>{campaign.name}</option>
                ))}
            </select>
            {state.activeCampaign ? // if there is an active campaign
                <select onChange={handleWorldChange} value={state.selectedWorldIndex}>
                    <option value={-1}>-</option>
                    {state.activeCampaign.worlds.map( (world, index) => (
                        <option key={index} value={index}>{world.name}</option>
                    ))}
                </select>
            : // else if there is no active campaign
                null
            /* end if there is an active campaign*/}
            <Switch>
                <Route exact path="/campaigns/:campaign/addworld" render={props => <NewWorld {...props}
                                                                                    Application={state.Application}
                                                                                    campaign={state.activeCampaign}/>}
                                                                                    />
                <Route exact path="/campaigns/:campaign/update" render={props => <CampaignUpdate {...props}
                                                                                    Application={state.Application}
                                                                                    campaign={state.activeCampaign}/>}
                                                                                    />               
                <Route exact path="/campaigns/:campaign/:world/update" render={props => <WorldUpdate {...props} 
                                                                                    Application={state.Application}
                                                                                    world={state.activeWorld}
                                                                                    campaign={state.activeCampaign}/>}
                                                                                    />
                <Route path="/campaigns/:campaign/:world" render={props => <World {...props} 
                                                                                    Application={state.Application}
                                                                                    world={state.activeWorld} />}
                                                                                    />
                <Route exact path="/campaigns/:campaign" render={props => <Campaign {...props}
                                                                            Application={state.Application}
                                                                            campaign={state.activeCampaign} />}
                                                                            />
            </Switch>
        </div>
    );
}

export default CampaignSelector;
