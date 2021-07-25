import { Backdrop } from "@material-ui/core";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import useAlertBarContext from "AlertBarContext";

const AdminContext = createContext();

export const AdminContextProvider = (props) => {
  const [guilds, setGuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setAlert } = useAlertBarContext();

  useEffect(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/guilds");
      setGuilds(response.data);
      setLoading(false);
    } catch (error) {
      setAlert(error.response.data, "error");
    }
  }, []);

  if (loading) {
    return <Backdrop open />;
  }
  return <AdminContext.Provider value={{ guilds, setGuilds }} {...props} />;
};

export default function useAdminContext() {
  const { guilds, setGuilds } = useContext(AdminContext);
  return { guilds, setGuilds };
}
