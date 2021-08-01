import React from "react";
import axios from "axios";
import useFormReducer from "./reducer";
import useSessionContext from "SessionContext";
import { Button, Grid, MenuItem, Select, TextField } from "@material-ui/core";
import useAlertBarContext from "AlertBarContext";

const EditProfile = () => {
  /* CONTEXT */
  const { user, setUser } = useSessionContext();
  const { setAlert } = useAlertBarContext();

  /* FORM STATE */
  const { state: formState, setPassword1, setPassword2 } = useFormReducer();
  const { password1, password2 } = formState;

  /* FORM HANDLING */
  const handleSelect = async (event) => {
    user.theme = event.target.value;
    try {
      const response = await axios.patch(
        `/api/users/${user.id}`,
        JSON.stringify(user)
      );
      setUser(response.data);
    } catch (error) {
      setAlert(error.response.data, "error");
    }
  };

  const handleSubmit = async () => {
    if (password1.value === "" || password2.value === "") {
      setPassword1(password1.value);
      setPassword2(password2.value);
      return;
    }
    if (password1.error || password2.error) {
      return;
    }
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
  };

  const handleChange = async (event) => {
    switch (event.target.name) {
      case "password1":
        setPassword1(event.target.value);
        break;
      case "password2":
        setPassword2(event.target.value);
        break;
    }
  };

  /* COMPONENT PROPS */
  const password1Props = {
    label: "New Password",
    name: "password1",
    type: "password",
    onChange: handleChange,
    ...password1,
  };

  const password2Props = {
    label: "Confirm Password",
    name: "password2",
    type: "password",
    onChange: handleChange,
    ...password2,
  };

  return (
    <>
      <Grid item>
        <Select onChange={handleSelect} value={user.theme}>
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
        <Button variant="contained" onClick={handleSubmit}>
          Change Password
        </Button>
      </Grid>
    </>
  );
};

export default EditProfile;
