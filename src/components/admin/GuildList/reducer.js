import { useReducer } from "react";

export const setGuildName = (name) => {
  return {
    type: "SET_GUILD_NAME",
    value: name,
  };
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

export default function useGuildFormReducer(state = initialState) {
  return useReducer(reducer, state);
}
