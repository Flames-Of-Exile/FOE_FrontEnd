import { useReducer } from "react";

export const setName = (name) => {
  return {
    type: "SET_NAME",
    value: name,
  };
};

const initialState = {
  name: { value: "", error: false, helperText: "" },
};

const validateName = (name) => {
  if (name === "") {
    return { error: true, helperText: "Please enter a name" };
  }
  return { error: false, helperText: "" };
};

const reducer = (state, action) => {
  let error, helperText;
  switch (action.type) {
    case "SET_NAME":
      ({ error, helperText } = validateName(action.value));
      return {
        ...state,
        name: { value: action.value, error, helperText },
      };
  }
};

export default function useNewWorldFormReducer(state = initialState) {
  return useReducer(reducer, state);
}
