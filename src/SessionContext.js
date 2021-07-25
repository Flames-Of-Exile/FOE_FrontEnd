import React, { createContext, useCallback, useContext, useState } from "react";
import useSocketContext from "SocketContext";
import axios from "axios";

const SessionContext = createContext();

export const SessionContextProvider = (props) => {
  const { connect, disconnect } = useSocketContext();
  const [user, setUser] = useState({
    id: 0,
    isAdmin: false,
    discordConfirmed: false,
  });

  const syncLogout = useCallback(() => {
    delete axios.defaults.headers.common["Authorization"];
    setUser({
      id: 0,
      isAdmin: false,
    });
  }, []);

  const refresh = useCallback(async () => {
    try {
      const response = await axios.get("/api/users/refresh");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      connect();
      setUser(response.data.user);
      // token is good for 5 minutes - refresh every 4 minutes, 30 seconds
      setTimeout(refresh, 270000);
    } catch (error) {
      syncLogout();
    }

    return () => {
      disconnect();
    };
  }, [syncLogout]);

  return (
    <SessionContext.Provider
      value={{ user, setUser, refresh, syncLogout }}
      {...props}
    />
  );
};

export default function useSessionContext() {
  const { user, setUser, refresh, syncLogout } = useContext(SessionContext);
  return { user, setUser, refresh, syncLogout };
}
