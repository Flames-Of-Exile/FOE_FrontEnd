import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCampaignContext } from "components/intel/Home";
import LabeledSelect from "components/utilities/LabeledSelect";

const useStyles = makeStyles(() => ({
  select: { minWidth: 200 },
}));

const CampaignSelector = () => {
  const classes = useStyles();
  const history = useHistory();

  const [indices, setIndices] = useState({ campaign: -1, world: -1 });

  const { campaigns, activeCampaign, world, setActiveCampaign, setWorld } =
    useCampaignContext();

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
    onChange: handleCampaignChange,
    value: indices.campaign,
    label: "Campaign",
    className: classes.select,
    options: campaigns.map((campaign, index) => {
      return { value: index, label: campaign.name };
    }),
  };

  const worldSelectProps = {
    name: "activeWorld",
    onChange: handleWorldChange,
    value: indices.world,
    label: "World",
    className: classes.select,
    options: [
      { value: -1, label: "-" },
      ...activeCampaign.worlds.map((world, index) => {
        return { value: index, label: world.name };
      }),
    ],
  };

  return (
    <>
      <Grid item>
        <LabeledSelect {...campaignSelectProps} />
      </Grid>
      {activeCampaign.worlds ? (
        <Grid item>
          <LabeledSelect {...worldSelectProps} />
        </Grid>
      ) : null}
    </>
  );
};

export default CampaignSelector;
