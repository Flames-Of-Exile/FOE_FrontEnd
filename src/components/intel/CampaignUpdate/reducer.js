import { useReducer } from "react";

/* ACTIONS */
const setName = (dispatch) => (name) => {
  return dispatch({
    type: "SET_NAME",
    value: name,
  });
};

const setIsDefault = (dispatch) => (isDefault) => {
  return dispatch({
    type: "SET_IS_DEFAULT",
    value: isDefault,
  });
};

const setIsArchived = (dispatch) => (isArchived) => {
  return dispatch({
    type: "SET_IS_ARCHIVED",
    value: isArchived,
  });
};

/* INITIAL STATE */
const initialState = {
  name: { value: "", error: false, helperText: "" },
  isDefault: { value: false },
  isArchived: { value: false },
};

/* VALIDATORS */
const validateName = (name) => {
  if (name === "") {
    return { error: true, helperText: "Please enter a name" };
  }
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
    case "SET_IS_DEFAULT":
      return {
        ...state,
        isDefault: { value: action.value },
      };
    case "SET_IS_ARCHIVED":
      return {
        ...state,
        isArchived: { value: action.value },
      };
    default:
      new Error(`Invalid action: ${action.type}`);
  }
};

export default function useCampaignUpdateReducer(initState = initialState) {
  const [state, dispatch] = useReducer(reducer, initState);
  return {
    state,
    setName: setName(dispatch),
    setIsDefault: setIsDefault(dispatch),
    setIsArchived: setIsArchived(dispatch),
  };
}
