import checkPasswordComplexity from "helpers/checkPasswordComplexity";
import { useReducer } from "react";

/* ACTIONS */
export const setUsername = (username) => {
  return {
    type: "SET_USERNAME",
    value: username,
  };
};

export const setPassword1 = (password) => {
  return {
    type: "SET_PASSWORD1",
    value: password,
  };
};

export const setPassword2 = (password) => {
  return {
    type: "SET_PASSWORD2",
    value: password,
  };
};

export const setGuildId = (guildId) => {
  return {
    type: "SET_GUILD_ID",
    value: guildId,
  };
};

export const setGuildList = (guildList) => {
  return {
    type: "SET_GUILD_LIST",
    value: guildList,
  };
};

/* INITIAL STATE */
const initialState = {
  username: { value: "", error: false, helperText: "" },
  password1: { value: "", error: false, helperText: "" },
  password2: { value: "", error: false, helperText: "" },
  guildId: { value: 0 },
  guildList: [],
};

/* VALIDATORS */
const validateUsername = (username) => {
  if (username === "") {
    return { error: true, helperText: "Please enter a username" };
  }
  return { error: false, helperText: "" };
};

const validatePassword = (password, otherPassword) => {
  if (password === "") {
    return { error: true, helperText: "Please enter a password" };
  }
  if (otherPassword !== "" && password !== otherPassword) {
    return { error: true, helperText: "Passwords do not match" };
  }

  const validationErrors = checkPasswordComplexity(password);

  return {
    error: !!validationErrors,
    helperText: validationErrors,
  };
};

/* REDUCER */
const reducer = (state, action) => {
  let error, helperText;
  switch (action.type) {
    case "SET_USERNAME":
      ({ error, helperText } = validateUsername(action.value));
      return {
        ...state,
        username: { value: action.value, error, helperText },
      };
    case "SET_PASSWORD1":
      ({ error, helperText } = validatePassword(
        action.value,
        state.password2.value
      ));
      return {
        ...state,
        password1: { value: action.value, error, helperText },
      };
    case "SET_PASSWORD2":
      ({ error, helperText } = validatePassword(
        action.value,
        state.password1.value
      ));
      return {
        ...state,
        password2: { value: action.value, error, helperText },
      };
    case "SET_GUILD_ID":
      return { ...state, guildId: { value: action.value } };
    case "SET_GUILD_LIST":
      return { ...state, guildList: action.value };
  }
};

export default function useRegisterFormReducer(state = initialState) {
  return useReducer(reducer, state);
}
