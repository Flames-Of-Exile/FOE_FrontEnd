import { Grid, MenuItem, Select } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Campaign from "components/intel/Campaign";
import CampaignUpdate from "components/intel/CampaignUpdate";
import World from "components/intel/World";
import WorldUpdate from "components/intel/WorldUpdate";
import NewWorld from "components/intel/NewWorld";
import axios from "axios";
import SocketContext from "SocketContext";
import { context } from "./context";
import { useHistory, useLocation, useParams } from "react-router-dom";

const CampaignSelector = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  const [campaigns, setCampaigns] = useState([]);
  const [activeCampaign, setActiveCampaign] = useState({
    worlds: [],
    name: "",
  });
  const [world, setWorld] = useState({ pins: [], name: "" });

  const { socket } = useContext(SocketContext);

  useEffect(async () => {
    socket.registerListener("campaign-update", handleCampaignUpdate);

    const response = await axios.get(`/api/campaigns`);
    let campaigns = response.data;
    let activeCampaign = campaigns[0];
    let activeWorld = { pins: [], name: "" };
    if (params.campaign) {
      activeCampaign = campaigns.filter(
        (campaign) => campaign.name === params.campaign
      )[0];
      if (params.world) {
        activeWorld = activeCampaign.worlds.filter(
          (world) => world.name === params.world
        )[0];
      }
    }

    setCampaigns(campaigns);
    setActiveCampaign(activeCampaign);
    setWorld(activeWorld);

    if (activeCampaign && location.pathname === "/campaigns") {
      history.push(`/campaigns/${activeCampaign.name}`);
    }

    return () => {
      socket.removeListener("campaign-update");
    };
  }, []);

  useEffect(() => {
    let activeWorld = { pins: [], name: "" };
    if (params.world) {
      activeWorld = activeCampaign.worlds.filter(
        (world) => world.name === params.world
      )[0];
    }
    setWorld(activeWorld);
  }, [params.world]);

  const handleCampaignUpdate = (data) => {
    let activeCampaign = data[0];
    let activeWorld = { pins: [] };
    if (params.campaign) {
      activeCampaign = data.filter(
        (campaign) => campaign.name === params.campaign
      )[0];
      if (params.world) {
        activeWorld = activeCampaign.worlds.filter(
          (world) => world.name === params.world
        )[0];
      }
    }
    setActiveCampaign(activeCampaign);
    setWorld(activeWorld);
  };

  const handleCampaignChange = (event) => {
    let index = event.target.value;
    if (index == -1) {
      return;
    }
    history.push(`/campaigns/${campaigns[index].name}`);
    setActiveCampaign(campaigns[index]);
  };

  const handleWorldChange = (event) => {
    let index = event.target.value;
    if (index == -1) {
      return;
    }
    history.push(
      `/campaigns/${activeCampaign.name}/${activeCampaign.worlds[index].name}`
    );
    setWorld(activeCampaign.worlds[index]);
  };

  const campaignSelectProps = {
    name: "activeCampaign",
    id: "activeCampaign",
    placeholder: "Please Choose a Campaign",
    onChange: handleCampaignChange,
    value: campaigns.indexOf(activeCampaign),
  };

  return (
    <>
      <context.Provider
        value={{
          campaigns,
          setCampaigns,
          activeCampaign,
          setActiveCampaign,
          world,
          setWorld,
        }}
      >
        <Grid item>
          <Select {...campaignSelectProps}>
            <MenuItem value={-1}>Please Choose a Campaign</MenuItem>
            {campaigns.map((campaign, index) => (
              <MenuItem key={index} value={index}>
                {campaign.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        {
          activeCampaign ? ( // if there is an active campaign
            <Grid item>
              <Select
                onChange={handleWorldChange}
                value={activeCampaign.worlds.indexOf(world)}
              >
                <MenuItem value={-1}>-</MenuItem>
                {activeCampaign.worlds.map((world, index) => (
                  <MenuItem key={index} value={index}>
                    {world.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          ) : // else if there is no active campaign
          null
          /* end if there is an active campaign*/
        }
        <Switch>
          <Route exact path="/campaigns/:campaign/addworld">
            <NewWorld />
          </Route>
          <Route exact path="/campaigns/:campaign/update">
            <CampaignUpdate />
          </Route>
          <Route exact path="/campaigns/:campaign/:world/update">
            <WorldUpdate />
          </Route>
          <Route path="/campaigns/:campaign/:world">
            <World />
          </Route>
          <Route exact path="/campaigns/:campaign">
            <Campaign />
          </Route>
        </Switch>
      </context.Provider>
    </>
  );
};

export const CampaignContext = context;
export default CampaignSelector;
