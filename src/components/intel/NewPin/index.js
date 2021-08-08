import {
  Button,
  Grid,
  MenuItem,
  Popover,
  Select,
  Tooltip,
} from "@material-ui/core";
import React, { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { useCampaignContext } from "components/intel/Home";
import useSocketContext from "SocketContext";
import axios from "axios";
import useFormReducer from "./reducer";
import useAlertBarContext from "AlertBarContext";
import useStyles, { StyledInputBase, StyledTextField } from "./style";

const NewPin = () => {
  /* STYLING */
  const classes = useStyles();

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
  } = useFormReducer();
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
  const { world } = useCampaignContext();
  const { setAlert } = useAlertBarContext();
  const { send } = useSocketContext();

  /* MAP STATE */
  const [anchor, setAnchor] = useState({ top: 0, left: 0 });
  const [newPin, setNewPin] = useState(false);
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

  useMapEvents({
    click: (e) => {
      setNewPin(true);
      setCoords(e.latlng);
      setAnchor({
        top: e.originalEvent.y - 50,
        left: e.originalEvent.x,
      });
    },
  });

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
    try {
      await axios.post("/api/pins", {
        position_x: coords.lng,
        position_y: coords.lat,
        symbol: symbol.value,
        notes: notes.value,
        world_id: world.id,
        name: name.value,
        rank: rank.value,
        amount: amount.value,
        respawn: respawn.value,
        resource: resource.value,
        x_cord: xCoord.value,
        y_cord: yCoord.value,
      });
      send("campaign-update");
      handleCancel();
    } catch (error) {
      setAlert(error.response.data, "error");
    }
  };

  const handleCancel = () => {
    setNewPin(false);
    setName("");
    setRank(0);
    setAmount(0);
    setRespawn(0);
    setXCoord("");
    setYCoord(0);
    setNotes("");
    setSymbol("stone");
    setResource("granite");
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

  if (newPin === false) {
    return null;
  } else {
    return (
      <>
        <Marker position={coords}>
          <Popover
            open
            anchorReference="anchorPosition"
            anchorPosition={anchor}
            classes={{ paper: classes.popupPaper }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
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
                <Tooltip title="Notes">
                  <StyledTextField {...notesTextFieldProps} />
                </Tooltip>
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
              <Grid item xs={5} />
              <Grid item xs={5}>
                <Button onClick={handleCancel} variant="contained">
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button onClick={handleSubmit} variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Popover>
        </Marker>
      </>
    );
  }
};

export default NewPin;
