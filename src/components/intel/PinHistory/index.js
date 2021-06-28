import { Button, CircularProgress, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { AlertBarContext } from "components/AlertBar";
import Edit from "components/intel/Edit";
import axios from "axios";
import { useParams } from "react-router-dom";

const PinHistory = () => {
  const [pin, setPin] = useState({ edits: [] });
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const { setAlertText, setSeverity, setOpen } = useContext(AlertBarContext);

  useEffect(async () => {
    const response = await axios.get(`/api/pins${params.id}`);
    setPin(response.data);
  }, [params]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/pins/${params.id}`);
    } catch (error) {
      setAlertText(error.response.data);
      setSeverity("error");
      setOpen(true);
    }
    setLoading(false);
  };

  return (
    <>
      <Button onClick={handleDelete} variant="contained" disabled={loading}>
        Delete
        {loading && <CircularProgress size={25} />}
      </Button>
      <Typography>
        {pin.position_x} / {pin.position_y}
      </Typography>
      <Typography>{pin.symbol}</Typography>
      {pin.edits.map((edit) => (
        <Edit key={edit} edit={edit} />
      ))}
    </>
  );
};

export default PinHistory;
