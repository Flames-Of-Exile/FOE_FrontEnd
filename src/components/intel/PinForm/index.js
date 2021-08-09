import { Button, Grid, MenuItem, Select, Tooltip } from "@material-ui/core";
import { Popup } from "react-leaflet";
import React, { useEffect } from "react";
import useSocketContext from "SocketContext";
import axios from "axios";
import useFormReducer from "./reducer";
import useAlertBarContext from "AlertBarContext";
import { StyledInputBase, StyledTextField } from "./style";
import { useCampaignContext } from "components/intel/Home";

const PinForm = (props) => {
  /* PROPS */
  const { pin, handleCancel, marker, offset, coords } = props;

  let xPos, yPos;
  if (coords) {
    xPos = coords.lng;
    yPos = coords.lat;
  } else {
    xPos = pin.position_x;
    yPos = pin.position_y;
  }

  useEffect(() => {
    window.setTimeout(() => {
      marker.current.openPopup();
    });
  }, [marker]);

  /* FORM STATE */
  const {
    state: formState,
    setName,
    setRank,
    setAmount,
    setRespawn,
    setNotes,
    setXCoord,
    setYCoord,
    setSymbol,
    setResource,
  } = useFormReducer(pin);
  const {
    name,
    rank,
    amount,
    respawn,
    notes,
    xCoord,
    yCoord,
    symbol,
    resource,
    resourceList,
  } = formState;

  /* CONTEXT */
  const { setAlert } = useAlertBarContext();
  const { send } = useSocketContext();
  const { world } = useCampaignContext();

  /* FORM HANDLING */
  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "rank":
        setRank(e.target.value);
        break;
      case "amount":
        setAmount(e.target.value);
        break;
      case "respawn":
        setRespawn(e.target.value);
        break;
      case "notes":
        setNotes(e.target.value);
        break;
      case "xCoord":
        setXCoord(e.target.value);
        break;
      case "yCoord":
        setYCoord(e.target.value);
        break;
      case "symbol":
        setSymbol(e.target.value);
        break;
      case "resource":
        setResource(e.target.value);
        break;
    }
  };

  const handleSubmit = async () => {
    const payload = {
      position_x: xPos,
      position_y: yPos,
      world_id: world.id,
      symbol: symbol.value,
      resource: resource.value,
      notes: notes.value,
      name: name.value,
      rank: rank.value,
      amount: amount.value,
      respawn: respawn.value,
      x_cord: xCoord.value,
      y_cord: yCoord.value,
    };
    try {
      if (pin) {
        await axios.patch(`/api/pins/${pin.id}`, payload);
      } else {
        await axios.post("/api/pins", payload);
      }
      send("campaign-update");
      handleCancel();
    } catch (error) {
      setAlert(error.response.data, "error");
    }
  };

  const handleClose = () => {
    setName("");
    setRank(0);
    setAmount(0);
    setRespawn(0);
    setXCoord("");
    setYCoord(0);
    setNotes("");
    setSymbol("stone");
    setResource("granite");
    handleCancel();
  };

  /* COMPONENT PROPS */
  const nameTextFieldProps = {
    name: "name",
    id: "name",
    placeholder: "Name",
    onChange: handleChange,
    ...name,
  };

  const rankTextFieldProps = {
    type: "number",
    name: "rank",
    id: "rank",
    placeholder: "Rank",
    onChange: handleChange,
    ...rank,
  };

  const amountTextFieldProps = {
    type: "number",
    name: "amount",
    id: "amount",
    placeholder: "Amount",
    onChange: handleChange,
    ...amount,
  };

  const respawnTextFieldProps = {
    type: "number",
    name: "respawn",
    id: "respawn",
    placeholder: "Respawn time",
    onChange: handleChange,
    ...respawn,
  };

  const notesTextFieldProps = {
    name: "notes",
    id: "notes",
    placeholder: "Notes",
    onChange: handleChange,
    ...notes,
  };

  const xCoordTextFieldProps = {
    name: "xCoord",
    id: "xCoord",
    placeholder: "X Coordinate",
    onChange: handleChange,
    ...xCoord,
  };

  const yCoordTextFieldProps = {
    type: "number",
    name: "yCoord",
    id: "yCoord",
    placeholder: "Y Coordinate",
    onChange: handleChange,
    ...yCoord,
  };

  const symbolSelectProps = {
    name: "symbol",
    id: "symbol",
    input: <StyledInputBase />,
    onChange: handleChange,
    ...symbol,
  };

  const resourceSelectProps = {
    name: "resource",
    id: "resource",
    input: <StyledInputBase />,
    onChange: handleChange,
    ...resource,
  };

  return (
    <>
      <Popup
        offset={offset}
        onClose={handleClose}
        minWidth={200}
        maxWidth={200}
      >
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={5}>
            <Tooltip title="X Coordinate">
              <StyledTextField {...xCoordTextFieldProps} />
            </Tooltip>
          </Grid>
          <Grid item xs={5}>
            <Tooltip title="Y Coordinate">
              <StyledTextField {...yCoordTextFieldProps} />
            </Tooltip>
          </Grid>
          <Grid item xs={5}>
            <Select {...symbolSelectProps}>
              <MenuItem value="stone">Stone</MenuItem>
              <MenuItem value="stone-motherlode">Stone Motherload</MenuItem>
              <MenuItem value="ore">Ore</MenuItem>
              <MenuItem value="ore-motherlode">Ore Motherload</MenuItem>
              <MenuItem value="wood">Wood</MenuItem>
              <MenuItem value="animal">Animal</MenuItem>
              <MenuItem value="animal-boss">Animal Boss</MenuItem>
              <MenuItem value="mob">Camp</MenuItem>
              <MenuItem value="mob-boss">Boss</MenuItem>
              <MenuItem value="well">Well</MenuItem>
              <MenuItem value="grave">Grave</MenuItem>
              <MenuItem value="tactical-fire">Tactical Fire</MenuItem>
              <MenuItem value="tactical-fish">Tactical Fish</MenuItem>
              <MenuItem value="tactical-house">Tactical House</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={5}>
            <Select {...resourceSelectProps}>
              {resourceList.map((choice) => (
                <MenuItem key={choice} value={choice.toLowerCase()}>
                  {choice === "na" ? "-" : choice}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={5}>
            <Tooltip title="Name">
              <StyledTextField {...nameTextFieldProps} />
            </Tooltip>
          </Grid>
          <Grid item xs={5}>
            <Tooltip title="Rank">
              <StyledTextField {...rankTextFieldProps} />
            </Tooltip>
          </Grid>
          <Grid item xs={5}>
            <Tooltip title="Amount">
              <StyledTextField {...amountTextFieldProps} />
            </Tooltip>
          </Grid>
          <Grid item xs={5}>
            <Tooltip title="Respawn">
              <StyledTextField {...respawnTextFieldProps} />
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Tooltip title="Notes">
              <StyledTextField {...notesTextFieldProps} />
            </Tooltip>
          </Grid>

          <Grid item xs={5}>
            <Button onClick={handleClose} variant="contained">
              Cancel
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Popup>
    </>
  );
};

export default PinForm;
