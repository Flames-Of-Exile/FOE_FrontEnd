import { useReducer } from "react";

/* ACTIONS */
const setName = (dispatch) => (name) => {
  return dispatch({
    type: "SET_NAME",
    value: name,
  });
};

const setRank = (dispatch) => (rank) => {
  return dispatch({
    type: "SET_RANK",
    value: rank,
  });
};

const setAmount = (dispatch) => (amount) => {
  return dispatch({
    type: "SET_AMOUNT",
    value: amount,
  });
};

const setRespawn = (dispatch) => (respawn) => {
  return dispatch({
    type: "SET_RESPAWN",
    value: respawn,
  });
};

const setNotes = (dispatch) => (notes) => {
  return dispatch({
    type: "SET_NOTES",
    value: notes,
  });
};

const setXCoord = (dispatch) => (xCoord) => {
  return dispatch({
    type: "SET_X_COORD",
    value: xCoord,
  });
};

const setYCoord = (dispatch) => (yCoord) => {
  return dispatch({
    type: "SET_Y_COORD",
    value: yCoord,
  });
};

const setSymbol = (dispatch) => (symbol) => {
  return dispatch({
    type: "SET_SYMBOL",
    value: symbol,
  });
};

const setResource = (dispatch) => (resource) => {
  return dispatch({
    type: "SET_RESOURCE",
    value: resource,
  });
};

/* UTILITIES */
const generateResourceList = (symbol) => {
  let selectList;
  if (["stone", "stone-motherlode"].includes(symbol)) {
    selectList = ["Granite", "Limestone", "Travertine", "Slate", "Marble"];
  } else if (["ore", "ore-motherlode"].includes(symbol)) {
    selectList = ["Copper", "Tin", "Iron", "Silver", "Aurelium"];
  } else if (symbol === "wood") {
    selectList = ["Yew", "Birch", "Ash", "Oak", "Spruce"];
  } else if (["animal", "animal-boss"].includes(symbol)) {
    selectList = [
      "Spider",
      "Pig",
      "Cat",
      "Auroch",
      "Elk",
      "Wolf",
      "Bear",
      "Gryphon",
    ];
  } else if (["mob", "mob-boss"].includes(symbol)) {
    selectList = [
      "Urgu",
      "Elementals",
      "Satyr",
      "Aracoix",
      "Underhill",
      "Enbarri",
      "Thralls",
    ];
  } else if (symbol === "grave") {
    selectList = ["Human", "Elven", "Monster", "Stoneborn", "Guinecian"];
  } else {
    selectList = [];
  }
  return ["na"].concat(selectList);
};

/* INITIAL STATE */
const initialState = {
  name: { value: "", error: false, helperText: "" },
  rank: { value: 0, error: false, helperText: "" },
  amount: { value: 0, error: false, helperText: "" },
  respawn: { value: 0, error: false, helperText: "" },
  notes: { value: "", error: false, helperText: "" },
  xCoord: { value: "", error: false, helperText: "" },
  yCoord: { value: 0, error: false, helperText: "" },
  symbol: { value: "stone" },
  resource: { value: "granite" },
  resourceList: generateResourceList("stone"),
};

/* VALIDATORS */
const validateName = () => {
  return { error: false, helperText: "" };
};

const validateNumber = (number) => {
  if (number < 0) {
    return { error: true, helperText: "Number cannot be negative." };
  }
  return { error: false, helperText: "" };
};

const validateNotes = () => {
  return { error: false, helperText: "" };
};

const validateCoord = () => {
  return { error: false, helperText: "" };
};

/* REDUCER */
const reducer = (state, action) => {
  let error, helperText;
  switch (action.type) {
    case "SET_NAME":
      ({ error, helperText } = validateName(action.value));
      return {
        ...state,
        name: { value: action.value, error, helperText },
      };
    case "SET_RANK":
      ({ error, helperText } = validateNumber(action.value));
      return {
        ...state,
        rank: { value: action.value, error, helperText },
      };
    case "SET_AMOUNT":
      ({ error, helperText } = validateNumber(action.value));
      return {
        ...state,
        amount: { value: action.value, error, helperText },
      };
    case "SET_RESPAWN":
      ({ error, helperText } = validateNumber(action.value));
      return {
        ...state,
        respawn: { value: action.value, error, helperText },
      };
    case "SET_NOTES":
      ({ error, helperText } = validateNotes(action.value));
      return {
        ...state,
        notes: { value: action.value, error, helperText },
      };
    case "SET_X_COORD":
      ({ error, helperText } = validateCoord(action.value));
      return {
        ...state,
        xCoord: { value: action.value, error, helperText },
      };
    case "SET_Y_COORD":
      ({ error, helperText } = validateCoord(action.value));
      return {
        ...state,
        yCoord: { value: action.value, error, helperText },
      };
    case "SET_SYMBOL":
      var resourceList = generateResourceList(action.value);
      var resource =
        resourceList.length > 1 ? resourceList[1] : resourceList[0];
      return {
        ...state,
        symbol: { value: action.value },
        resourceList,
        resource: { value: resource.toLowerCase() },
      };
    case "SET_RESOURCE":
      return {
        ...state,
        resource: { value: action.value },
      };
    default:
      new Error(`Invalid action: ${action.type}`);
  }
};

export default function useUpdatePinFormReducer(pin = undefined) {
  let initState;
  if (!pin) {
    initState = initialState;
  } else {
    initState = {
      name: { value: pin.name, error: false, helperText: "" },
      rank: { value: pin.rank, error: false, helperText: "" },
      amount: { value: pin.amount, error: false, helperText: "" },
      respawn: { value: pin.respawn, error: false, helperText: "" },
      notes: { value: pin.notes, error: false, helperText: "" },
      xCoord: { value: pin.x_cord, error: false, helperText: "" },
      yCoord: { value: pin.y_cord, error: false, helperText: "" },
      symbol: { value: pin.symbol },
      resource: { value: pin.resource },
      resourceList: generateResourceList(pin.symbol),
    };
  }
  const [state, dispatch] = useReducer(reducer, initState);
  return {
    state,
    setName: setName(dispatch),
    setRank: setRank(dispatch),
    setAmount: setAmount(dispatch),
    setRespawn: setRespawn(dispatch),
    setNotes: setNotes(dispatch),
    setXCoord: setXCoord(dispatch),
    setYCoord: setYCoord(dispatch),
    setSymbol: setSymbol(dispatch),
    setResource: setResource(dispatch),
  };
}
