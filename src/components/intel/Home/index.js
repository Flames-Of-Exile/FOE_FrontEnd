import React from "react";
import contextHook, { CampaignContextProvider } from "./context";
import { Switch, Route } from "react-router-dom";
import Campaign from "components/intel/Campaign";
import CampaignUpdate from "components/intel/CampaignUpdate";
import World from "components/intel/World";
import WorldUpdate from "components/intel/WorldUpdate";
import NewWorld from "components/intel/NewWorld";
import CampaignSelector from "components/intel/CampaignSelector";

const Home = () => {
  return (
    <>
      <CampaignContextProvider>
        <CampaignSelector />
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
      </CampaignContextProvider>
    </>
  );
};

export const useCampaignContext = contextHook;
export default Home;
