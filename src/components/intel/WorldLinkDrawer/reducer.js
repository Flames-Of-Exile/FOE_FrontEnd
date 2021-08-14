import { useReducer } from "react";

const setCenter = (dispatch) => (coords) => {
  return dispatch({
    type: "SET_CENTER",
    value: coords,
  });
};

const setRadius = (dispatch) => (radius) => {
  return dispatch({
    type: "SET_RADIUS",
    value: radius,
  });
};

const setDrawing = (dispatch) => (drawing) => {
  return dispatch({
    type: "SET_DRAWING",
    value: drawing,
  });
};

const initialState = {
  drawing: false,
  centerCoords: { latlng: { lat: 0, lng: 0 }, xy: { x: 0, y: 0 } },
  radius: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_RADIUS":
      return { ...state, radius: action.value };
    case "SET_CENTER":
      return {
        ...state,
        drawing: true,
        centerCoords: action.value,
      };
    case "SET_DRAWING":
      return {
        ...state,
        drawing: action.value,
      };
  }
};

export default function useMapReducer(initState = initialState) {
  const [state, dispatch] = useReducer(reducer, initState);
  return {
    state,
    setRadius: setRadius(dispatch),
    setDrawing: setDrawing(dispatch),
    setCenter: setCenter(dispatch),
  };
}
