import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import BlueRaspberry from "themes/BlueRaspberry";
import Cartography from "themes/Cartography";
import Default from "themes/Default";
import PumpkinSpice from "themes/PumpkinSpice";
import Red from "themes/Red";
import SeaBreeze from "themes/SeaBreeze";
import useSessionContext from "SessionContext";

const Theme = (props) => {
  const { user } = useSessionContext();
  const [theme, setTheme] = useState(Default);

  useEffect(() => {
    let selected;
    switch (user.theme) {
      case "blue_raspberry":
        selected = BlueRaspberry;
        break;
      case "cartography":
        selected = Cartography;
        break;
      case "pumpkin_spice":
        selected = PumpkinSpice;
        break;
      case "red":
        selected = Red;
        break;
      case "seabreeze":
        selected = SeaBreeze;
        break;
      default:
        selected = Default;
        break;
    }
    setTheme(selected);
  }, [user]);

  return <ThemeProvider theme={createTheme(theme)} {...props} />;
};

export default Theme;
