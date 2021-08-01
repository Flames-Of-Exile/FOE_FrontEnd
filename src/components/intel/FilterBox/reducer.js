import { useReducer } from "react";
import { RESOURCE_OPTIONS } from "./constants";

/* ACTIONS */
const setType = (dispatch) => (type) => {
  return dispatch({
    type: "SET_TYPE",
    value: type,
  });
};

const setResource = (dispatch) => (resource) => {
  return dispatch({
    type: "SET_RESOURCE",
    value: resource,
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

/* INITIAL STATE */
const initialState = {
  type: [],
  resource: [],
  rank: 0,
  amount: 0,
  resourceOptions: [],
};

/* UTILITIES */
const buildResourceOptions = (type) => {
  const types = type.map((item) => item.replace("-motherlode", ""));
  return RESOURCE_OPTIONS.filter((option) => types.includes(option.type));
};

/* REDUCER */
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TYPE":
      return {
        ...state,
        type: action.value,
        resourceOptions: buildResourceOptions(action.value),
      };
    case "SET_RESOURCE":
      return {
        ...state,
        resource: action.value,
      };
    case "SET_RANK":
      return {
        ...state,
        rank: action.value,
      };
    case "SET_AMOUNT":
      return {
        ...state,
        amount: action.value,
      };
  }
};

export default function useFilterFormReducer(initState = initialState) {
  const [state, dispatch] = useReducer(reducer, initState);
  return {
    state,
    setType: setType(dispatch),
    setResource: setResource(dispatch),
    setRank: setRank(dispatch),
    setAmount: setAmount(dispatch),
  };
}
