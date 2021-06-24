import { createContext } from "react";

const adminContext = {
  guilds: [],
  setGuilds: () => {},
};

export const context = createContext(adminContext);
