import { useReducer } from "react";

export const setName = (name) => {
  return {
    type: "SET_NAME",
    value: name,
  };
};

export const setFile = (file, filename) => {
  return {
    type: "SET_FILE",
    value1: file,
    value2: filename,
  };
};

const initialState = {
  name: { value: "", error: false, helperText: "" },
  file: { value: null },
  filename: { value: "choose a file" },
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
    case "SET_FILE":
      return {
        ...state,
        file: { value: action.value1 },
        filename: { value: action.value2 },
      };
  }
};

export default function useNewWorldFormReducer(state = initialState) {
  return useReducer(reducer, state);
}
