import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import SocketContext from "SocketContext";
import axios from "axios";
import useFormReducer, {
  setName,
  setIsDefault,
  setIsArchived,
} from "./reducer";
import { useHistory } from "react-router-dom";
import { CampaignContext } from "components/intel/CampaignSelector";
import { AlertBarContext } from "components/AlertBar";

function CampaignUpdate() {
  const history = useHistory();

  const [formState, dispatch] = useFormReducer();
  const { name, isDefault, isArchived } = formState;
  const [loading, setLoading] = useState(false);

  const { socket } = useContext(SocketContext);
  const { activeCampaign: campaign } = useContext(CampaignContext);
  const { setAlertText, setSeverity, setOpen } = useContext(AlertBarContext);

  useEffect(() => {
    dispatch(setName(campaign.name));
    dispatch(setIsDefault(campaign.is_default));
    dispatch(setIsArchived(campaign.is_archived));
  }, [campaign]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        dispatch(setName(e.target.value));
        break;
      case "isDefault":
        dispatch(setIsDefault(e.target.checked));
        break;
      case "isArchived":
        dispatch(setIsArchived(e.target.checked));
        break;
    }
  };

  const handleSubmit = async () => {
    if (name.error) {
      return;
    }
    setLoading(true);
    try {
      await axios.patch(
        `/api/campaigns/${campaign.id}`,
        JSON.stringify({
          name: name.value,
          is_default: isDefault.value,
          is_archived: isArchived.value,
        })
      );
      socket.send("campaign-update");
      history.push(`/`);
      setAlertText("Campaign updated");
      setSeverity("success");
    } catch (error) {
      setAlertText(error.response.data);
      setSeverity("error");
    }
    setLoading(false);
    setOpen(true);
  };

  const nameTextFieldProps = {
    name: "name",
    id: "name",
    label: "name",
    onChange: handleChange,
    disabled: loading,
    ...name,
  };

  return (
    <>
      <Grid item>
        <TextField {...nameTextFieldProps} />
      </Grid>
      <Grid item>
        <FormControlLabel
          control={
            <Checkbox
              checked={isArchived.value}
              onChange={handleChange}
              disabled={loading}
            />
          }
          label="Is Archived:"
        />
      </Grid>
      <Grid item>
        <FormControlLabel
          control={
            <Checkbox
              checked={isDefault.value}
              onChange={handleChange}
              disabled={loading}
            />
          }
          label="Is Default:"
        />
      </Grid>
      <Grid item>
        <Button onClick={handleSubmit} disabled={loading}>
          Submit{loading && <CircularProgress />}
        </Button>
      </Grid>
      <img src={campaign.image} />
    </>
  );
}

export default CampaignUpdate;
