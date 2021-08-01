import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import capitalize from "helper_functions/Capitalize";
import useFormReducer from "./reducer";
import { TYPE_OPTIONS, RESOURCE_OPTIONS } from "./constants";

const FilterBox = () => {
  const {
    state: formState,
    setType,
    setResource,
    setRank,
    setAmount,
  } = useFormReducer();
  const { type, resource, rank, amount, resourceOptions } = formState;

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const query = queryString.parse(location.search);
    let type = [];
    let resource = [];
    let rank = 0;
    let amount = 0;

    if (query.type) {
      type = TYPE_OPTIONS.filter((item) =>
        query.type.split(",").includes(item.value)
      ).map((item) => item.value);
    }
    if (query.resource) {
      resource = RESOURCE_OPTIONS.filter((item) =>
        query.resource.split(",").includes(item.value)
      ).map((item) => item.value);
    }
    if (query.rank) {
      rank = query.rank;
    }
    if (query.amount) {
      amount = query.amount;
    }
    setType(type);
    setResource(resource);
    setRank(rank);
    setAmount(amount);
  }, [location]);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "type":
        setType(event.target.value);
        break;
      case "resource":
        setResource(event.target.value);
        break;
      case "amount":
        setAmount(event.target.value);
        break;
      case "rank":
        setRank(event.target.value);
        break;
    }
  };

  const handleApply = () => {
    let queryString = "";
    if (type.length > 0) {
      queryString += "type=" + type.join(",") + "&";
    }
    if (resource.length > 0) {
      queryString += "resource=" + resource.join(",") + "&";
    }
    if (rank > 0) {
      queryString += "rank=" + rank + "&";
    }
    if (amount > 0) {
      queryString += "amount=" + amount + "&";
    }
    history.push(`${location.pathname}?${queryString}`);
  };

  const typeSelectProps = {
    multiple: true,
    onChange: handleChange,
    value: type,
    name: "type",
  };

  const resourceSelectProps = {
    multiple: true,
    onChange: handleChange,
    value: resource,
    name: "resource",
  };

  const rankTextFieldProps = {
    type: "number",
    name: "rank",
    id: "rank",
    label: "rank",
    value: rank,
    onChange: handleChange,
  };

  const amountTextFieldProps = {
    type: "number",
    name: "amount",
    id: "amount",
    label: "amount",
    value: amount,
    onChange: handleChange,
  };

  return (
    <>
      <Select {...typeSelectProps}>
        {TYPE_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {capitalize(option.value)}
          </MenuItem>
        ))}
      </Select>
      <Select {...resourceSelectProps}>
        {resourceOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {capitalize(option.value)}
          </MenuItem>
        ))}
      </Select>
      <TextField {...rankTextFieldProps} />
      <TextField {...amountTextFieldProps} />
      <Button variant="contained" onClick={handleApply}>
        Apply
      </Button>
    </>
  );
};

export default FilterBox;
