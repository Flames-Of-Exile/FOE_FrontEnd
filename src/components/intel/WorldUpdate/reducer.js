import { useReducer } from "react";

/* ACTIONS */
const setName = (dispatch) => (name) => {
  return dispatch({
    type: "SET_NAME",
    value: name,
  });
};

/* INITIAL STATE */
const initialState = {
  name: { value: "", error: false, helperText: "" },
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
    default:
      new Error(`Invalid action: ${action.type}`);
  }
};

export default function useNewWorldFormReducer(initState = initialState) {
  const [state, dispatch] = useReducer(reducer, initState);
  return {
    state,
    setName: setName(dispatch),
  };
}
