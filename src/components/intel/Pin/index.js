import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import Animal from "components/intel/pins/Animal.js";
import AnimalBoss from "components/intel/pins/AnimalBoss.js";
import Grave from "components/intel/pins/Grave.js";
import Mob from "components/intel/pins/Mob.js";
import MobBoss from "components/intel/pins/MobBoss.js";
import Ore from "components/intel/pins/Ore.js";
import OreMotherlode from "components/intel/pins/OreMotherlode.js";
import Stone from "components/intel/pins/Stone.js";
import StoneMotherlode from "components/intel/pins/StoneMotherlode.js";
import Well from "components/intel/pins/Well.js";
import Wood from "components/intel/pins/Wood.js";
import tactical_fire from "staticfiles/icons/tactical-fire.png";
import tactical_fish from "staticfiles/icons/tactical-fish.png";
import tactical_house from "staticfiles/icons/tactical-house.png";
import PinDetails from "components/intel/PinDetails";
import PinUpdate from "components/intel/PinUpdate";

function Pin(props) {
  /* PROPS */
  const { pin } = props;

  /* STATE */
  const [url, setUrl] = useState("http://");
  const [editing, setEditing] = useState(false);

  function chooseSVG(iconStyle, borderStyle, cutoutStyle) {
    let Icon;
    switch (pin.symbol) {
      case "animal-boss":
        Icon = AnimalBoss;
        break;
      case "animal":
        Icon = Animal;
        break;
      case "grave":
        Icon = Grave;
        break;
      case "mob":
        Icon = Mob;
        break;
      case "mob-boss":
        Icon = MobBoss;
        break;
      case "ore-motherlode":
        Icon = OreMotherlode;
        break;
      case "ore":
        Icon = Ore;
        break;
      case "stone-motherlode":
        Icon = StoneMotherlode;
        break;
      case "stone":
        Icon = Stone;
        break;
      case "well":
        Icon = Well;
        break;
      case "wood":
        Icon = Wood;
        break;
      case "tactical-fire":
        return tactical_fire;
      case "tactical-fish":
        return tactical_fish;
      case "tactical-house":
        return tactical_house;
      default:
        return "/static/icons/" + pin.symbol + ".png";
    }
    return (
      "data:image/svg+xml," +
      escape(
        ReactDOMServer.renderToStaticMarkup(
          <Icon
            iconStyle={iconStyle}
            borderStyle={borderStyle}
            cutoutStyle={cutoutStyle}
          />
        )
      )
    );
  }

  function colorSetter(resource) {
    if (
      ["yew", "copper", "granite", "spider", "human", "urgu"].includes(resource)
    ) {
      return "#ff0000";
    }
    if (
      ["birch", "tin", "limestone", "pig", "elven", "elementals"].includes(
        resource
      )
    ) {
      return "#ff8800";
    }
    if (
      ["ash", "iron", "travertine", "cat", "monster", "satyr"].includes(
        resource
      )
    ) {
      return "#ffff00";
    }
    if (
      ["oak", "silver", "slate", "auroch", "stoneborn", "aracoix"].includes(
        resource
      )
    ) {
      return "#00ff00";
    }
    if (
      [
        "spruce",
        "aurelium",
        "marble",
        "elk",
        "guinecian",
        "underhill",
      ].includes(resource)
    ) {
      return "#00ffff";
    }
    if (["wolf", "enbarri"].includes(resource)) {
      return "#0000ff";
    }
    if (["gryphon", "thralls"].includes(resource)) {
      return "#8800ff";
    }
    if (["bear"].includes(resource)) {
      return "#ff0088";
    }
    return "#ffffff";
  }

  useEffect(() => {
    const resourceColor = colorSetter(pin.resource);
    const iconStyle = {
      stroke: resourceColor,
      fill: "#000000",
      strokeWidth: 0.1,
    };
    const borderStyle = {
      stroke: "#000000",
      fill: resourceColor,
      strokeWidth: 0.1,
    };
    const cutoutStyle = {
      stroke: resourceColor,
      fill: resourceColor,
      strokeWidth: 0.1,
    };
    const newUrl = chooseSVG(iconStyle, borderStyle, cutoutStyle);
    setUrl(newUrl);
  }, [pin]);

  return (
    <Marker
      position={[pin.position_y, pin.position_x]}
      icon={
        new Icon({
          iconUrl: url,
          iconSize: [35, 70],
          iconAnchor: [17.5, 70],
        })
      }
    >
      <Popup offset={[0, -50]}>
        {
          editing ? ( // if editing
            <PinUpdate pin={pin} handleCancel={() => setEditing(false)} />
          ) : (
            // else not editing
            <PinDetails pin={pin} handleEdit={() => setEditing(true)} />
          )
          /* end if editing */
        }
      </Popup>
    </Marker>
  );
}

export default Pin;
