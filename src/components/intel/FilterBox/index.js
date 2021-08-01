import { Button, Grid, makeStyles, Paper, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import capitalize from "helpers/Capitalize";
import useFormReducer from "./reducer";
import { TYPE_OPTIONS, RESOURCE_OPTIONS } from "./constants";
import LabeledSelect from "components/utilities/LabeledSelect";

/* STYLING */
const useStyles = makeStyles((theme) => ({
  paper: {
    background: theme.palette.background.filterBox,
    position: "absolute",
    top: 60,
    height: 300,
    right: 10,
    width: 300,
    zIndex: 1000,
    padding: 10,
  },
  select: { minWidth: 200 },
}));

const updateStyle = (value, selectedValues) => {
  return {
    fontWeight: selectedValues.includes(value) ? "bold" : "standard",
  };
};

const FilterBox = () => {
  /* STYLING */
  const classes = useStyles();

  /* FORM STATE */
  const {
    state: formState,
    setType,
    setResource,
    setRank,
    setAmount,
  } = useFormReducer();
  const { type, resource, rank, amount, resourceOptions } = formState;

  /* ROUTING */
  const history = useHistory();
  const location = useLocation();

  /* FORM HANDLING */
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

  /* COMPONENT PROPS */
  const typeSelectProps = {
    multiple: true,
    onChange: handleChange,
    value: type,
    name: "type",
    label: "Types",
    className: classes.select,
    options: TYPE_OPTIONS.map((option) => {
      return {
        value: option.value,
        label: capitalize(option.value),
        style: updateStyle(option.value, type),
      };
    }),
  };

  const resourceSelectProps = {
    multiple: true,
    onChange: handleChange,
    value: resource,
    name: "resource",
    label: "Resources",
    className: classes.select,
    options: resourceOptions.map((option) => {
      return {
        value: option.value,
        label: capitalize(option.value),
        style: updateStyle(option.value, resource),
      };
    }),
  };

  const rankTextFieldProps = {
    type: "number",
    name: "rank",
    id: "rank",
    label: "Rank",
    value: rank,
    onChange: handleChange,
  };

  const amountTextFieldProps = {
    type: "number",
    name: "amount",
    id: "amount",
    label: "Amount",
    value: amount,
    onChange: handleChange,
  };

  return (
    <>
      <Paper className={classes.paper} elevation={8}>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <LabeledSelect {...typeSelectProps} />
          </Grid>
          <Grid item>
            <LabeledSelect {...resourceSelectProps} />
          </Grid>
          <Grid item>
            <TextField {...rankTextFieldProps} />
          </Grid>
          <Grid item>
            <TextField {...amountTextFieldProps} />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleApply}>
              Apply
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default FilterBox;
