import { useReducer } from "react";

/* ACTIONS */
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

/* INITIAL STATE */
const initialState = {
  username: { value: "", error: false, helperText: "" },
  password: { value: "", error: false, helperText: "" },
};

/* VALIDATORS */
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
    case "SET_PASSWORD":
      ({ error, helperText } = validatePassword(action.value));
      return {
        ...state,
        password: { value: action.value, error, helperText },
      };
    default:
      new Error(`Invalid action: ${action.type}`);
  }
};

export default function useLoginFormReducer(initState = initialState) {
  const [state, dispatch] = useReducer(reducer, initState);
  return {
    state,
    setUsername: setUsername(dispatch),
    setPassword: setPassword(dispatch),
  };
}
