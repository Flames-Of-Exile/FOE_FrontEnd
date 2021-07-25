import { useReducer } from "react";
import checkPasswordComplexity from "helper_functions/checkPasswordComplexity";

const setUsername = (dispatch) => (username) => {
  return dispatch({
    type: "SET_USERNAME",
    value: username,
  });
};

const setPassword = (dispatch) => (password) => {
  return dispatch({
    type: "SET_PASSWORD",
    value: password,
  });
};

const setIsActive = (dispatch) => (isActive) => {
  return dispatch({
    type: "SET_IS_ACTIVE",
    value: isActive,
  });
};

const setRole = (dispatch) => (role) => {
  return dispatch({
    type: "SET_ROLE",
    value: role,
  });
};

const setGuild = (dispatch) => (guild) => {
  return dispatch({
    type: "SET_GUILD",
    value: guild,
  });
};

const initialState = {
  username: { value: "" },
  password: { value: "", error: false, helperText: "" },
  isActive: { value: false },
  role: { value: "guest" },
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
    default:
      new Error(`Invalid action: ${action.type}`);
  }
};

export default function useUpdateUserFormReducer(initState = initialState) {
  const [dispatch, state] = useReducer(reducer, initState);
  return {
    state,
    setUsername: setUsername(dispatch),
    setPassword: setPassword(dispatch),
    setIsActive: setIsActive(dispatch),
    setRole: setRole(dispatch),
    setGuild: setGuild(dispatch),
  };
}
