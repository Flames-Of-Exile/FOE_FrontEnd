import { Button, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";

const FilterBox = () => {
  const [state, setState] = useState({
    type: null,
    resource: null,
    rank: 0,
    amount: 0,
  });

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const query = queryString.parse(location.search);
    let type = null;
    let resource = null;
    let rank = 0;
    let amount = 0;

    if (query.type) {
      type = typeOptions.filter((item) =>
        query.type.split(",").includes(item.value)
      );
    }
    if (query.resource) {
      resource = resourceOptions.filter((item) =>
        query.resource.split(",").includes(item.value)
      );
    }
    if (query.rank) {
      rank = query.rank;
    }
    if (query.amount) {
      amount = query.amount;
    }
    setState({
      type: type,
      resource: resource,
      rank: rank,
      amount: amount,
    });
  }, [location]);

  const typeOptions = [
    { value: "stone", label: "Stone" },
    { value: "stone-motherlode", label: "Stone Motherlode" },
    { value: "ore", label: "Ore" },
    { value: "ore-motherlode", label: "Ore Motherlode" },
    { value: "wood", label: "Wood" },
    { value: "animal", label: "Animal" },
    { value: "animal-boss", label: "Animal Boss" },
    { value: "mob", label: "Mob" },
    { value: "mob-boss", label: "Mob Boss" },
    { value: "well", label: "Well" },
    { value: "grave", label: "Grave" },
    { value: "tactical-house", label: "Tactical House" },
    { value: "tactical-fire", label: "Tactical Fire" },
    { value: "tactical-fish", label: "Tactical Fish" },
  ];

  const woodptions = [
    { value: "yew", label: "Yew" },
    { value: "birch", label: "Birch" },
    { value: "ash", label: "Ash" },
    { value: "oak", label: "Oak" },
    { value: "spruce", label: "Spruce" },
  ];

  const stoneOptions = [
    { value: "granite", label: "Granite" },
    { value: "limestone", label: "Limestone" },
    { value: "travertine", label: "Travertine" },
    { value: "slate", label: "Slate" },
    { value: "marble", label: "Marble" },
  ];

  const oreOptions = [
    { value: "copper", label: "Copper" },
    { value: "tin", label: "Tin" },
    { value: "iron", label: "Iron" },
    { value: "silver", label: "Silver" },
    { value: "aurelium", label: "Aurelium" },
  ];

  const animalOptions = [
    { value: "spider", label: "Spider" },
    { value: "pig", label: "Pig" },
    { value: "cat", label: "Cat" },
    { value: "auroch", label: "Auroch" },
    { value: "elk", label: "Elk" },
    { value: "wolf", label: "Wolf" },
    { value: "bear", label: "Bear" },
    { value: "gryphon", label: "Gryphon" },
  ];

  const graveOptions = [
    { value: "human", label: "Human" },
    { value: "elven", label: "Elven" },
    { value: "monster", label: "Monster" },
    { value: "stoneborn", label: "Stoneborn" },
    { value: "guinecian", label: "Guinecian" },
  ];

  const mobOptions = [
    { value: "urgu", label: "Urgu" },
    { value: "elementals", label: "Elementals" },
    { value: "satyr", label: "Satyr" },
    { value: "aracoix", label: "Aracoix" },
    { value: "underhill", label: "Underhill" },
    { value: "enbarri", label: "Enbarri" },
    { vaule: "thralls", label: "Thralls" },
  ];

  const buildResourceOptions = () => {
    let options = [];
    let types = state.type.map((item) => item.value);
    if (types.includes("wood")) {
      options = options.concat(woodptions);
    }
    if (types.includes("ore") || types.includes("ore-motherlode")) {
      options = options.concat(oreOptions);
    }
    if (types.includes("stone") || types.includes("stone-motherlode")) {
      options = options.concat(stoneOptions);
    }
    if (types.includes("animal")) {
      options = options.concat(animalOptions);
    }
    if (types.includes("grave")) {
      options = options.concat(graveOptions);
    }
    if (types.includes("mob") || types.includes("mob-boss")) {
      options = options.concat(mobOptions);
    }
    return options;
  };

  const resourceOptions = [
    { value: "yew", label: "Yew" },
    { value: "birch", label: "Birch" },
    { value: "ash", label: "Ash" },
    { value: "oak", label: "Oak" },
    { value: "spruce", label: "Spruce" },
    { value: "copper", label: "Copper" },
    { value: "tin", label: "Tin" },
    { value: "iron", label: "Iron" },
    { value: "silver", label: "Silver" },
    { value: "aurelium", label: "Aurelium" },
    { value: "granite", label: "Granite" },
    { value: "limestone", label: "Limestone" },
    { value: "travertine", label: "Travertine" },
    { value: "slate", label: "Slate" },
    { value: "marble", label: "Marble" },
    { value: "spider", label: "Spider" },
    { value: "pig", label: "Pig" },
    { value: "cat", label: "Cat" },
    { value: "auroch", label: "Auroch" },
    { value: "elk", label: "Elk" },
    { value: "wolf", label: "Wolf" },
    { value: "bear", label: "Bear" },
    { value: "gryphon", label: "Gryphon" },
    { value: "human", label: "Human" },
    { value: "elven", label: "Elven" },
    { value: "monster", label: "Monster" },
    { value: "stoneborn", label: "Stoneborn" },
    { value: "guinecian", label: "Guinecian" },
    { value: "urgu", label: "Urgu" },
    { value: "elementals", label: "Elementals" },
    { value: "satyr", label: "Satyr" },
    { value: "aracoix", label: "Aracoix" },
    { value: "underhill", label: "Underhill" },
    { value: "enbarri", label: "Enbarri" },
    { vaule: "thralls", label: "Thralls" },
  ];

  const handleChange = (event) =>
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });

  const handleSelectType = (event) =>
    setState({
      ...state,
      type: event,
    });

  const handleSelectResource = (event) =>
    setState({
      ...state,
      resource: event,
    });

  const handleApply = () => {
    let queryString = "";
    if (state.type && state.type.length > 0) {
      queryString +=
        "type=" + state.type.map((type) => type.value).join(",") + "&";
    }
    if (state.resource && state.resource.length > 0) {
      queryString +=
        "resource=" +
        state.resource.map((resource) => resource.value).join(",") +
        "&";
    }
    if (state.rank > 0) {
      queryString += "rank=" + state.rank + "&";
    }
    if (state.amount > 0) {
      queryString += "amount=" + state.amount + "&";
    }
    history.push(`${location.pathname}?${queryString}`);
  };

  const typeSelectProps = {
    multiple: true,
    onChange: handleSelectType,
    value: state.type,
    options: typeOptions,
    getOptionLabel: (option) => option.label,
    getOptionSelected: (option) => option.value,
    renderInput: (params) => {
      const label = <TextField {...params} variant="standard" label="Types" />;
      return label;
    },
  };

  const resourceSelectProps = {
    multiple: true,
    onChange: handleSelectResource,
    value: state.resource,
    options: state.type ? buildResourceOptions() : resourceOptions,
    getOptionLabel: (option) => option.label,
    getOptionSelected: (option) => option.value,
    renderInput: (params) => {
      const label = (
        <TextField {...params} variant="standard" label="Resources" />
      );
      return label;
    },
  };

  const rankTextFieldProps = {
    type: "number",
    name: "rank",
    id: "rank",
    label: "rank",
    value: state.rank,
    onChange: handleChange,
  };

  const amountTextFieldProps = {
    type: "number",
    name: "amount",
    id: "amount",
    label: "amount",
    value: state.amount,
    onChange: handleChange,
  };

  return (
    <>
      <Autocomplete {...typeSelectProps} />
      <Autocomplete {...resourceSelectProps} />
      <TextField {...rankTextFieldProps} />
      <TextField {...amountTextFieldProps} />
      <Button onClick={handleApply}>Apply</Button>
    </>
  );
};

export default FilterBox;
