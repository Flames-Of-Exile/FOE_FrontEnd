import { Button, CircularProgress, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import axios from "axios";
import useFormReducer from "./reducer";
import { AlertBarContext } from "components/AlertBar";

const NewCampaign = () => {
  const { state: formState, setName, setFile } = useFormReducer();
  const { name, file, filename } = formState;
  const [loading, setLoading] = useState(false);

  const { setAlert } = useContext(AlertBarContext);

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

  const nameTextFieldProps = {
    name: "name",
    id: "name",
    label: "name",
    onChange: handleChange,
    disabled: loading,
    ...name,
  };

  const fileTextFieldProps = {
    type: "file",
    name: "file",
    id: "file",
    label: filename.value,
    onChange: handleChange,
    disabled: loading,
  };

  return (
    <>
      <TextField {...nameTextFieldProps} />
      <TextField {...fileTextFieldProps} />
      <Button onClick={handleSubmit} disabled={loading} variant="contained">
        Submit
        {loading && <CircularProgress size={25} />}
      </Button>
    </>
  );
};

export default NewCampaign;
