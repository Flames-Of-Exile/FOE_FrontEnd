import { useReducer } from "react";
import checkPasswordComplexity from "helpers/checkPasswordComplexity";

/* ACTIONS */
const setPassword1 = (dispatch) => (password) => {
  return dispatch({
    type: "SET_PASSWORD1",
    value: password,
  });
};

const setPassword2 = (dispatch) => (password) => {
  return dispatch({
    type: "SET_PASSWORD2",
    value: password,
  });
};

/* INITIAL STATE */
const initialState = {
  password1: { value: "", error: false, helperText: "" },
  password2: { value: "", error: false, helperText: "" },
};

/* REDUCER */
const reducer = (state, action) => {
  let error, helperText;
  switch (action.type) {
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
    default:
      new Error(`Invalid action: ${action.type}`);
  }
};

/* VALIDATORS */
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

export default function useProfileFormReducer(initState = initialState) {
  const [state, dispatch] = useReducer(reducer, initState);
  return {
    state,
    setPassword1: setPassword1(dispatch),
    setPassword2: setPassword2(dispatch),
  };
}
