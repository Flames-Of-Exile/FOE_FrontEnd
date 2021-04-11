import React, { useContext } from "react";
import axios from "axios";
import useFormReducer, { setPassword1, setPassword2 } from "./reducer";
import SessionContext from "SessionContext";
import { Button, Grid, TextField } from "@material-ui/core";
import { AlertBarContext } from "components/AlertBar";

const EditProfile = () => {
  const [formState, dispatch] = useFormReducer();
  const { password1, password2 } = formState;
  const { user } = useContext(SessionContext);
  const { setOpen, setAlertText, setSeverity } = useContext(AlertBarContext);

  //   const handleSelect = async (event) => {
  //     user.theme = event.target.value;
  //     props.Application.setState({
  //       ...props.Application.state,
  //       currentUser: user,
  //     });
  //     try {
  //       await axios.patch(`/api/users/${user.id}`, JSON.stringify(user));
  //     } catch (error) {
  //       swal("Error", error.response.data, "error");
  //     }
  //   };

  const handleSubmit = async () => {
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
      setAlertText("Successfully updated password");
      setSeverity("success");
    } catch (error) {
      setAlertText(error.response.data);
      setSeverity("error");
    }
    setOpen(true);
  };

  const handleChange = async (event) => {
    switch (event.target.name) {
      case "password1":
        dispatch(setPassword1(event.target.value));
        break;
      case "password2":
        dispatch(setPassword2(event.target.value));
        break;
    }
  };

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
        <TextField {...password1Props} />
      </Grid>
      <Grid item>
        <TextField {...password2Props} />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </>
  );
};
//   return (
//     <div>
//       <form className="grid-2">
//         <label htmlFor="theme-selector">Theme</label>
//         <select
//           className="theme-selector"
//           onChange={handleSelect}
//           value={user.theme}
//         >
//           <option value="default">Default</option>
//           <option value="blue_raspberry">Blue Raspberry</option>
//           <option value="cartography">Cartography</option>
//           <option value="pumpkin_spice">Pumpkin Spice</option>
//           <option value="red">Red</option>
//           <option value="seabreeze">Seabreeze</option>
//         </select>
//         <div className="row-2 column-1-2" />
//         <div className="row-3 column-1-2" />
//         <label htmlFor="password1">New Password</label>
//         <input
//           type="password"
//           name="password1"
//           placeholder="password"
//           onChange={handleChange}
//         />
//         <label htmlFor="password2">Retype Password</label>
//         <input
//           type="password"
//           name="password2"
//           placeholder="retype password"
//           onChange={handleChange}
//         />
//       </form>
//       <button onClick={handleSubmit}>Change Password</button>
//     </div>
//   );

export default EditProfile;
