import React, {
    useEffect,
    useState
} from 'react';

import {
    Switch,
    Route,
} from 'react-router-dom';

import Campaign from './Campaign';
import World from './World';
import NewWorld from './NewWorld';
import Socket from '../../helper_functions/Socket';

const axios = require('axios').default;

const socket = new Socket();

function CampaignSelector(props) {
    const [state, setState] = useState({
        Application: props.Application,
        campaigns: [],
        activeCampaign: { worlds: [], name: '' },
        selectedIndex: -1,
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
            if (props.match.params.campaign) {
                activeCampaign = campaigns.filter(campaign => campaign.name === props.match.params.campaign)[0];
                if (props.match.params.world) {
                    activeWorld = activeCampaign.worlds.filter(world => world.name === props.match.params.world)[0];
                }
            }
            setState({
                ...state,
                campaigns: campaigns,
                activeCampaign: activeCampaign,
                selectedIndex: campaigns.indexOf(activeCampaign),
                activeWorld: activeWorld,
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
    }, [props.match.params])

    const handleCampaignUpdate = (data) => {
        console.log(props)
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

    const handleChange = (event) => {
        let index = event.target.value;
        if (index == -1) {
            return;
        }
        props.history.push(`/campaigns/${state.campaigns[index].name}`);
        setState({
            ...state,
            activeCampaign: state.campaigns[index],
            selectedIndex: index
        });
    };

    return(
        <div>
            <select name='activeCampaign'
                    id='selector'
                    placeholder='Please Choose a Campaign'
                    onChange={handleChange}
                    value={state.selectedIndex}
            >
                <option value={-1}>Please Choose a Campaign</option>
                {state.campaigns.map( (campaign, index) => ( 
                    <option key={index} value={index}>{campaign.name}</option>
                ))}
            </select>
            <Switch>
                <Route exact path="/campaigns/:campaign/addworld" render={props => <NewWorld {...props}
                                                                                    Application={state.Application}
                                                                                    campaign={state.activeCampaign}/>}
                                                                                    />
                <Route exact path="/campaigns/:campaign/:world" render={props => <World {...props} 
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
