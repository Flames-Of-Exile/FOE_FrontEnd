import { createContext } from "react";

const alertBarContext = {
  setOpen: () => {},
  setAlertText: () => {},
  setSeverity: () => {},
};

export const context = createContext(alertBarContext);
