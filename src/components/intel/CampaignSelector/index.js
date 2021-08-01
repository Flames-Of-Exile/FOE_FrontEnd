import { Grid, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCampaignContext } from "components/intel/Home";

const CampaignSelector = () => {
  const history = useHistory();

  const [indices, setIndices] = useState({ campaign: -1, world: -1 });

  const {
    campaigns,
    activeCampaign,
    world,
    setActiveCampaign,
    setWorld,
  } = useCampaignContext();

  useEffect(() => {
    setIndices({
      campaign: campaigns.indexOf(activeCampaign),
      world: activeCampaign.worlds.indexOf(world),
    });
  }, [campaigns, activeCampaign, world]);

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

  const worldSelectProps = {
    name: "activeWorld",
    id: "activeWorld",
    onChange: handleWorldChange,
    value: indices.world,
  };

  return (
    <>
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
            <Select {...worldSelectProps}>
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
    </>
  );
};

export default CampaignSelector;
