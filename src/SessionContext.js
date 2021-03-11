import { createContext } from "react";

const sessionContext = {
  user: { id: 0, isAdmin: false, discordConfirmed: false },
  setUser: () => {},
  syncLogout: () => {},
  refresh: () => {},
};

export default createContext(sessionContext);
