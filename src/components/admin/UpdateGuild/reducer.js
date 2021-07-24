import { useReducer } from "react";

export const setGuildName = (dispatch) => (name) => {
  return dispatch({
    action: "SET_GUILD_NAME",
    value: name,
  });
};

const initialState = {
  guildName: { value: "", error: false, helperText: "" },
};

const validateGuildName = (name) => {
  if (name === "") {
    return { error: true, helperText: "Please enter a name" };
  }
  return { error: false, helperText: "" };
};

const reducer = (state, action) => {
  let error, helperText;
  switch (action.type) {
    case "SET_GUILD_NAME":
      ({ error, helperText } = validateGuildName(action.value));
      return {
        ...state,
        guildName: { value: action.value, error, helperText },
      };
  }
};

export default function useGuildFormReducer(
  name = "",
  initState = initialState
) {
  initState = {
    ...initState,
    guildName: { ...initState.guildName, value: name },
  };
  const [state, dispatch] = useReducer(reducer, initState);
  return {
    state,
    setGuildName: setGuildName(dispatch),
  };
}
