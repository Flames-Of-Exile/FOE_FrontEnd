import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import useSocketContext from "SocketContext";
import axios from "axios";

const CampaignContext = createContext();

export const CampaignContextProvider = (props) => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  const [campaigns, setCampaigns] = useState([]);
  const [activeCampaign, setActiveCampaign] = useState({
    worlds: [],
    name: "",
  });
  const [world, setWorld] = useState({ pins: [], name: "" });

  const { registerListener, removeListener } = useSocketContext();

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
    registerListener("campaign-update", handleCampaignUpdate);
    return () => {
      removeListener("campaign-update");
    };
  }, [handleCampaignUpdate]);

  useEffect(async () => {
    const response = await axios.get("/api/campaigns");
    handleCampaignUpdate(response.data);
  }, [handleCampaignUpdate]);

  return (
    <CampaignContext.Provider
      value={{
        campaigns,
        setCampaigns,
        activeCampaign,
        setActiveCampaign,
        world,
        setWorld,
      }}
      {...props}
    />
  );
};

export default function useCampaignContext() {
  const {
    campaigns,
    setCampaigns,
    activeCampaign,
    setActiveCampaign,
    world,
    setWorld,
  } = useContext(CampaignContext);
  return {
    campaigns,
    setCampaigns,
    activeCampaign,
    setActiveCampaign,
    world,
    setWorld,
  };
}
