import { createContext } from "react";

const campaignContext = {
  campaigns: [],
  setCampaigns: () => {},
  campaign: {},
  setCampaign: () => {},
  world: {},
  setWorld: () => {},
};

export const context = createContext(campaignContext);
