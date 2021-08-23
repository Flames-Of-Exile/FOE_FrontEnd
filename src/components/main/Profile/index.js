import React, { useState } from "react";
import axios from "axios";
import useFormReducer from "./reducer";
import useSessionContext from "SessionContext";
import {
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import useAlertBarContext from "AlertBarContext";

const EditProfile = () => {
  /* CONTEXT */
  const { user, setUser } = useSessionContext();
  const { setAlert } = useAlertBarContext();

  /* FORM STATE */
  const { state: formState, setPassword1, setPassword2 } = useFormReducer();
  const { password1, password2 } = formState;
  const [loading, setLoading] = useState(false);

  /* FORM HANDLING */
  const handleSelect = async (e) => {
    setLoading(true);
    user.theme = e.target.value;
    try {
      const response = await axios.patch(
        `/api/users/${user.id}`,
        JSON.stringify(user)
      );
      setUser(response.data);
    } catch (error) {
      setAlert(error.response.data, "error");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formState).find((key) => key.error)) {
      return;
    }
    setLoading(true);
    try {
      await axios.patch(
        `/api/users/${user.id}`,
        JSON.stringify({
          theme: user.theme,
          password: password1.value,
        })
      );
      setAlert("Successfully updated password", "success");
    } catch (error) {
      setAlert(error.response.data, "error");
    }
    setLoading(false);
  };

  const handleChange = async (e) => {
    switch (e.target.name) {
      case "password1":
        setPassword1(e.target.value);
        break;
      case "password2":
        setPassword2(e.target.value);
        break;
    }
  };

  /* COMPONENT PROPS */
  const password1Props = {
    label: "New Password",
    name: "password1",
    type: "password",
    required: true,
    autoFocus: true,
    disabled: loading,
    onChange: handleChange,
    inputProps: { form: "profile-form" },
    ...password1,
  };

  const password2Props = {
    label: "Confirm Password",
    name: "password2",
    type: "password",
    required: true,
    disabled: loading,
    onChange: handleChange,
    inputProps: { form: "profile-form" },
    ...password2,
  };

  return (
    <>
      <Grid item>
        <Select onChange={handleSelect} value={user.theme} disabled={loading}>
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="blue_raspberry">Blue Raspberry</MenuItem>
          <MenuItem value="cartography">Cartography</MenuItem>
          <MenuItem value="pumpkin_spice">Pumpkin Spice</MenuItem>
          <MenuItem value="red">Red</MenuItem>
          <MenuItem value="seabreeze">Seabreeze</MenuItem>
        </Select>
      </Grid>
      <Grid item>
        <TextField {...password1Props} />
      </Grid>
      <Grid item>
        <TextField {...password2Props} />
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit} id="profile-form">
          <Button variant="contained" type="submit" disabled={loading}>
            Change Password
            {loading && <CircularProgress size={25} />}
          </Button>
        </form>
      </Grid>
    </>
  );
};

export default EditProfile;
