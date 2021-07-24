import {
  Button,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@material-ui/core";
import React, { useContext } from "react";
import { AlertBarContext } from "components/AlertBar";
import SocketContext from "SocketContext";
import axios from "axios";
import useFormReducer from "./reducer";

const PinUpdate = (props) => {
  const { pin, handleCancel } = props;
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

  const { setAlertText, setSeverity, setOpen } = useContext(AlertBarContext);
  const { socket } = useContext(SocketContext);

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
      await axios.patch(`/api/pins/${pin.id}`, {
        position_x: pin.position_x,
        position_y: pin.position_y,
        symbol: symbol.value,
        notes: notes.value,
        world_id: pin.world_id,
        name: name.value,
        rank: rank.value,
        amount: amount.value,
        respawn: respawn.value,
        resource: resource.value,
        x_cord: xCoord.value,
        y_cord: yCoord.value,
      });
      socket.send("campaign-update");
      handleCancel();
    } catch (error) {
      setAlertText(error.response.data);
      setSeverity("error");
      setOpen(false);
    }
  };

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
    type: "number",
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
    onChange: handleChange,
    ...symbol,
  };

  const resourceSelectProps = {
    name: "resource",
    id: "resource",
    onChange: handleChange,
    ...resource,
  };

  return (
    <>
      <Tooltip title="X Coordinate">
        <TextField {...xCoordTextFieldProps} />
      </Tooltip>
      <Tooltip title="Y Coordinate">
        <TextField {...yCoordTextFieldProps} />
      </Tooltip>
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
      <Select {...resourceSelectProps}>
        {resourceList.map((choice) => (
          <MenuItem key={choice} value={choice.toLowerCase()}>
            {choice === "na" ? "-" : choice}
          </MenuItem>
        ))}
      </Select>
      <Tooltip title="Notes">
        <TextField {...notesTextFieldProps} />
      </Tooltip>
      <Tooltip title="Name">
        <TextField {...nameTextFieldProps} />
      </Tooltip>
      <Tooltip title="Rank">
        <TextField {...rankTextFieldProps} />
      </Tooltip>
      <Tooltip title="Amount">
        <TextField {...amountTextFieldProps} />
      </Tooltip>
      <Tooltip title="Respawn">
        <TextField {...respawnTextFieldProps} />
      </Tooltip>
      <Button onClick={handleSubmit}>Submit</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </>
  );
};

export default PinUpdate;
