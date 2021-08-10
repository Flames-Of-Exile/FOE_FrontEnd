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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formState).find((key) => key.error)) {
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
    required: true,
    autoFocus: true,
    onChange: handleChange,
    disabled: loading,
    inputProps: { form: "new-campaign-form" },
    ...name,
  };

  const uploadProps = {
    inputProps: {
      name: "file",
      id: "file",
      required: true,
      accept: "image/*",
      onChange: handleChange,
      inputProps: { form: "new-campaign-form" },
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
        <form onSubmit={handleSubmit} id="new-campaign-form">
          <Button type="submit" disabled={loading} variant="contained">
            Submit
            {loading && <CircularProgress size={25} />}
          </Button>
        </form>
      </Grid>
    </>
  );
};

export default NewCampaign;
