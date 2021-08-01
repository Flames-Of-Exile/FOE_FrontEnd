import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
import useFormReducer from "./reducer";
import useAlertBarContext from "AlertBarContext";
import Upload from "components/utilities/Upload";

const NewCampaign = () => {
  /* FORM STATE */
  const { state: formState, setName, setFile } = useFormReducer();
  const { name, file, filename } = formState;
  const [loading, setLoading] = useState(false);

  /* CONTEXT */
  const { setAlert } = useAlertBarContext();

  /* FORM HANDLING */
  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "file":
        setFile(e.target.files[0], e.target.value.split("\\").pop());
        break;
    }
  };

  const handleSubmit = async () => {
    if (name.error || name.value === "" || file.value === null) {
      setName(name.value);
      setFile(file.value, filename.value);
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file.value, filename.value);
      formData.append("name", name.value);
      formData.append("is_default", true);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      await axios.post("/api/campaigns", formData, config);
      setAlert("Campaign posted!", "success");
    } catch (error) {
      if (
        error.response.data.includes('unique constraint "campaigns_image_key"')
      ) {
        setAlert("A file with that name has already been uploaded.", "error");
      } else {
        setAlert(error.response.data, "error");
      }
    }
    setLoading(false);
  };

  /* COMPONENT PROPS */
  const nameTextFieldProps = {
    name: "name",
    id: "name",
    label: "Name",
    onChange: handleChange,
    disabled: loading,
    ...name,
  };

  const uploadProps = {
    inputProps: {
      name: "file",
      id: "file",
      accept: "image/*",
      onChange: handleChange,
    },
    buttonProps: {
      disabled: loading,
      text: filename.value,
    },
  };

  return (
    <>
      <Grid item>
        <TextField {...nameTextFieldProps} />
      </Grid>
      <Grid item>
        <Upload {...uploadProps} />
      </Grid>
      <Grid item>
        <Button onClick={handleSubmit} disabled={loading} variant="contained">
          Submit
          {loading && <CircularProgress size={25} />}
        </Button>
      </Grid>
    </>
  );
};

export default NewCampaign;
