import React, { useState } from "react";
import { Circle, useMapEvents } from "react-leaflet";

function WorldLinkDrawer(props) {
  /* PROPS */
  const { setCircle } = props;

  /* MAP STATE */
  const [state, setState] = useState({
    newMarker: false,
    centerLatLng: [0, 0],
    centerPx: [0, 0],
    radius: 0,
    settingRadius: false,
  });

  /* MAP HANDLING */
  useMapEvents({
    click: (event) => {
      if (state.settingRadius) {
        setState({
          ...state,
          settingRadius: false,
        });
        setCircle({
          centerLat: state.centerLatLng.lat,
          centerLng: state.centerLatLng.lng,
          radius: state.radius,
        });
      } else {
        setState({
          ...state,
          newMarker: true,
          centerLatLng: event.latlng,
          centerPx: event.containerPoint,
          settingRadius: true,
          radius: 0,
        });
      }
    },
    mousemove: (event) => {
      if (state.settingRadius) {
        let radius = Math.hypot(
          event.containerPoint.x - state.centerPx.x,
          event.containerPoint.y - state.centerPx.y
        );
        setState({
          ...state,
          radius: radius,
        });
      }
    },
  });

  if (state.newMarker === false) {
    return null;
  }

  return <Circle center={state.centerLatLng} radius={state.radius} />;
}

export default WorldLinkDrawer;
