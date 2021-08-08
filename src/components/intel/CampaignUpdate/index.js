import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useSocketContext from "SocketContext";
import axios from "axios";
import useFormReducer from "./reducer";
import { useHistory } from "react-router-dom";
import { useCampaignContext } from "components/intel/Home";
import useAlertBarContext from "AlertBarContext";
import useIsMounted from "hooks/useIsMounted";

function CampaignUpdate() {
  /* REFS */
  const isMounted = useIsMounted();

  /* ROUTING */
  const history = useHistory();

  /* FORM STATE */
  const {
    state: formState,
    setName,
    setIsDefault,
    setIsArchived,
  } = useFormReducer();
  const { name, isDefault, isArchived } = formState;
  const [loading, setLoading] = useState(false);

  /* CONTEXT */
  const { send } = useSocketContext();
  const { activeCampaign: campaign } = useCampaignContext();
  const { setAlert } = useAlertBarContext();

  /* FORM HANDLING */
  useEffect(() => {
    if (isMounted) {
      setName(campaign.name);
      setIsDefault(campaign.is_default);
      setIsArchived(campaign.is_archived);
    }
  }, [campaign]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "isDefault":
        setIsDefault(e.target.checked);
        break;
      case "isArchived":
        setIsArchived(e.target.checked);
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
      send("campaign-update");
      history.push(`/`);
      setAlert("Campaign updated", "error");
    } catch (error) {
      setAlert(error.response.data, "error");
    }
    setLoading(false);
  };

  /* COMPONENT PROPS */
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
              name="isArchived"
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
              name="isDefault"
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
