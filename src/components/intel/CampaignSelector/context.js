import { createContext } from "react";

const campaignContext = {
  campaigns: [],
  setCampaigns: () => {},
  activeCampaign: {},
  setActiveCampaign: () => {},
  world: {},
  setWorld: () => {},
};

export const context = createContext(campaignContext);
