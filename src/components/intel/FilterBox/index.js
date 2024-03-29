import { Button, Grid, Paper, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import useFormReducer from "./reducer";
import { TYPE_OPTIONS, RESOURCE_OPTIONS } from "./constants";
import LabeledSelect from "components/utilities/LabeledSelect";
import useStyles, { updateStyle } from "./style";
import useIsMounted from "hooks/useIsMounted";

const FilterBox = () => {
  /* REFS */
  const isMounted = useIsMounted();

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
    if (isMounted) {
      setType(type);
      setResource(resource);
      setRank(rank);
      setAmount(amount);
    }
  }, [location]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "type":
        setType(e.target.value);
        break;
      case "resource":
        setResource(e.target.value);
        break;
      case "amount":
        setAmount(e.target.value);
        break;
      case "rank":
        setRank(e.target.value);
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
        label: option.label,
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
        label: option.label,
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
          justifyContent="space-around"
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
