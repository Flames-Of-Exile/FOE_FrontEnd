import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const LabeledSelect = (props) => {
  const {
    label,
    options,
    onChange,
    value,
    name,
    multiple,
    className,
    classes,
  } = props;

  return (
    <>
      <FormControl className={className} classes={classes}>
        <InputLabel id={name}>{label}</InputLabel>
        <Select
          name={name}
          onChange={onChange}
          value={value}
          multiple={multiple}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              style={option.style}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default LabeledSelect;
