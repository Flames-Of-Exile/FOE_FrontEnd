import { useReducer } from "react";

export const setUsername = (username) => {
  return {
    type: "SET_USERNAME",
    value: username,
  };
};

export const setPassword = (password) => {
  return {
    type: "SET_PASSWORD",
    value: password,
  };
};

const initialState = {
  username: { value: "", error: false, helperText: "" },
  password: { value: "", error: false, helperText: "" },
};

const validateUsername = (username) => {
  if (username === "") {
    return { error: true, helperText: "Please enter a username" };
  }
  return { error: false, helperText: "" };
};

const validatePassword = (password) => {
  if (password === "") {
    return { error: true, helperText: "Please enter a password" };
  }
  return { error: false, helperText: "" };
};

const reducer = (state, action) => {
  let error, helperText;
  switch (action.type) {
    case "SET_USERNAME":
      ({ error, helperText } = validateUsername(action.value));
      return {
        ...state,
        username: { value: action.value, error, helperText },
      };
    case "SET_PASSWORD":
      ({ error, helperText } = validatePassword(action.value));
      return {
        ...state,
        password: { value: action.value, error, helperText },
      };
  }
};

export default function useLoginFormReducer(state = initialState) {
  return useReducer(reducer, state);
}
