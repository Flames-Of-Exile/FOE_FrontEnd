import { Grid, MenuItem, Select } from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
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
  const history = useHistory();
  const location = useLocation();

  const [campaigns, setCampaigns] = useState([]);
  const [activeCampaign, setActiveCampaign] = useState({
    worlds: [],
    name: "",
  });
  const [world, setWorld] = useState({ pins: [], name: "" });
  const [indices, setIndices] = useState({ campaign: -1, world: -1 });

  const { socket } = useContext(SocketContext);

  const getActiveCampaign = (campaigns, name) => {
    let active = { worlds: [], name: "" };
    if (campaigns.length) {
      active = campaigns[0];
      if (name) {
        active = campaigns.filter((campaign) => campaign.name === name)[0];
      }
    }
    return active;
  };

  const getActiveWorld = (worlds, name) => {
    let active = { pins: [], name: "" };
    if (name) {
      active = worlds.filter((world) => world.name === name)[0];
    }
    return active;
  };

  const handleCampaignUpdate = useCallback(
    (data) => {
      setCampaigns(data);
      const activeCamp = getActiveCampaign(data, params.campaign);
      const activeWorld = getActiveWorld(activeCamp.worlds, params.world);

      setActiveCampaign(activeCamp);
      setWorld(activeWorld);
      setIndices({
        campaign: campaigns.indexOf(activeCamp),
        world: activeCamp.worlds.indexOf(activeWorld),
      });
      if (activeWorld.name) {
        if (
          location.pathname !==
          `/campaigns/${activeCamp.name}/${activeWorld.name}`
        ) {
          history.push(`/campaigns/${activeCamp.name}/${activeWorld.name}`);
        }
      } else if (
        activeCamp.name &&
        location.pathname !== `/campaigns/${activeCamp.name}`
      ) {
        history.push(`/campaigns/${activeCamp.name}`);
      }
    },
    [params]
  );

  useEffect(() => {
    socket.registerListener("campaign-update", handleCampaignUpdate);
    return () => {
      socket.removeListener("campaign-update");
    };
  }, [socket, handleCampaignUpdate]);

  useEffect(async () => {
    const response = await axios.get("/api/campaigns");
    handleCampaignUpdate(response.data);
  }, [handleCampaignUpdate]);

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
    value: indices.campaign,
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
          activeCampaign.worlds ? ( // if there is an active campaign
            <Grid item>
              <Select onChange={handleWorldChange} value={indices.world}>
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
