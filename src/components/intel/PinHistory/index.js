import { Button, CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Edit from "components/intel/Edit";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAlertBarContext from "AlertBarContext";

const PinHistory = () => {
  const [pin, setPin] = useState({ edits: [] });
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const { setAlert } = useAlertBarContext();

  useEffect(async () => {
    const response = await axios.get(`/api/pins${params.id}`);
    setPin(response.data);
  }, [params]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/pins/${params.id}`);
    } catch (error) {
      setAlert(error.response.data, "error");
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
