import React from "react";
import { Circle, useMapEvents } from "react-leaflet";
import useMapReducer from "./reducer";

function WorldLinkDrawer(props) {
  /* PROPS */
  const { setCircle } = props;

  /* MAP STATE */
  const { state, setCenter, setDrawing, setRadius } = useMapReducer();
  const { drawing, centerCoords, radius } = state;

  /* MAP HANDLING */
  useMapEvents({
    click: (e) => {
      if (drawing) {
        setDrawing(false);
        setCircle({
          centerLat: centerCoords.latlng.lat,
          centerLng: centerCoords.latlng.lng,
          radius,
        });
      } else {
        setCenter({ latlng: e.latlng, xy: e.containerPoint });
      }
    },
    mousemove: (e) => {
      if (drawing) {
        let radius = Math.hypot(
          e.containerPoint.x - centerCoords.xy.x,
          e.containerPoint.y - centerCoords.xy.y
        );
        setRadius(radius);
      }
    },
  });

  if (radius === 0) {
    return null;
  }

  return <Circle center={centerCoords.latlng} radius={radius} />;
}

export default WorldLinkDrawer;
