import { Link, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import capitalize from "helpers/Capitalize";
import axios from "axios";
import useSessionContext from "SessionContext";
import useSocketContext from "SocketContext";
import useAlertBarContext from "AlertBarContext";

const PinDetails = (props) => {
  /* PROPS */
  const { pin, handleEdit } = props;

  /* FORM STATE */
  const [details, setDetails] = useState([]);

  /* CONTEXT */
  const { setAlert } = useAlertBarContext();
  const { user } = useSessionContext();
  const { send } = useSocketContext();

  /* FORM HANDLING */
  useEffect(() => {
    setDetails(createDetailArray(pin));
  }, [pin]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/pins/${pin.id}`);
      send("campaign-update");
    } catch (error) {
      setAlert(error.response.data, "error");
    }
  };

  /* COMPONENT ARRAY CONSTRUCTION */
  const createDetailArray = (pin) => {
    let array = [];
    if (pin.resource !== "na") {
      array.push(
        <Typography key="resource">{capitalize(pin.resource)}</Typography>
      );
    }
    if (pin.rank) {
      array.push(<Typography key="rank">{` Rank: ${pin.rank}`}</Typography>);
    }
    if (array.length > 0) {
      array.push(<br key="br" />);
    }
    if (pin.amount) {
      array.push(
        <Typography key="amount">
          {`Amount: ${pin.amount}`}
          <br />
        </Typography>
      );
    }
    if (pin.x_cord && pin.y_cord) {
      array.push(
        <Typography key="coord">
          {`Location: ${capitalize(pin.x_cord)}${pin.y_cord}`}
          <br />
        </Typography>
      );
    }
    if (pin.name) {
      array.push(
        <Typography key="name">
          {`${pin.name}`}
          <br />
        </Typography>
      );
    }
    if (pin.notes) {
      array.push(
        <Typography key="notes">
          {`${pin.notes}`}
          <br />
        </Typography>
      );
    }
    return details;
  };

  return (
    <>
      {details}
      <Link onClick={handleEdit}>Edit</Link>
      {user.role === "admin" || user.id === pin.edits[0].user.id ? (
        <Link onClick={handleDelete}>Delete</Link>
      ) : (
        ""
      )}
    </>
  );
};

export default PinDetails;
