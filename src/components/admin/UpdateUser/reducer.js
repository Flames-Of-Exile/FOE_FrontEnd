import { useReducer } from "react";
import checkPasswordComplexity from "helper_functions/checkPasswordComplexity";

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

export const setIsActive = (isActive) => {
  return {
    type: "SET_IS_ACTIVE",
    value: isActive,
  };
};

export const setRole = (role) => {
  return {
    type: "SET_ROLE",
    value: role,
  };
};

export const setGuild = (guild) => {
  return {
    type: "SET_GUILD",
    value: guild,
  };
};

const initialState = {
  username: { value: "" },
  password: { value: "", error: false, helperText: "" },
  isActive: { value: false },
  accessLevel: { value: "guest" },
  guild: { value: 0 },
};

const validatePassword = (password) => {
  const validationErrors = checkPasswordComplexity(password);

  return {
    error: !!validationErrors,
    helperText: validationErrors,
  };
};

const reducer = (state, action) => {
  let error, helperText;
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...state,
        username: { value: action.value },
      };
    case "SET_PASSWORD":
      ({ error, helperText } = validatePassword(action.value));
      return {
        ...state,
        password: { value: action.value, error, helperText },
      };
    case "SET_IS_ACTIVE":
      return {
        ...state,
        isActive: { value: action.value },
      };
    case "SET_ROLE":
      return {
        ...state,
        role: { value: action.value },
      };
    case "SET_GUILD":
      return {
        ...state,
        guild: { value: action.value },
      };
  }
};

export default function useUpdateUserFormReducer(state = initialState) {
  return useReducer(reducer, state);
}
