import { useReducer } from "react";

/* ACTIONS */
const setGuildName = (dispatch) => (name) => {
  return dispatch({
    type: "SET_GUILD_NAME",
    value: name,
  });
};

/* INITIAL STATE */
const initialState = {
  guildName: { value: "", error: false, helperText: "" },
};

/* VALIDATORS */
const validateGuildName = (name) => {
  if (name === "") {
    return { error: true, helperText: "Please enter a name" };
  }
  return { error: false, helperText: "" };
};

/* REDUCER */
const reducer = (state, action) => {
  let error, helperText;
  switch (action.type) {
    case "SET_GUILD_NAME":
      ({ error, helperText } = validateGuildName(action.value));
      return {
        ...state,
        guildName: { value: action.value, error, helperText },
      };
    default:
      new Error(`Invalid action: ${action.type}`);
  }
};

export default function useGuildFormReducer(initState = initialState) {
  const [state, dispatch] = useReducer(reducer, initState);
  return {
    state,
    setGuildName: setGuildName(dispatch),
  };
}
