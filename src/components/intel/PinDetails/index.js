import { Link, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { AlertBarContext } from "components/AlertBar";
import capitalize from "helper_functions/Capitalize";
import axios from "axios";
import SessionContext from "SessionContext";
import SocketContext from "SocketContext";

const PinDetails = (props) => {
  const { pin, handleEdit } = props;
  const [details, setDetails] = useState([]);

  const { setAlert } = useContext(AlertBarContext);
  const { user } = useContext(SessionContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    setDetails(createDetailArray(pin));
  }, [pin]);

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

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/pins/${pin.id}`);
      socket.send("campaign-update");
    } catch (error) {
      setAlert(error.response.data, "error");
    }
  };

  return (
    <>
      {details}
      <Link onClick={handleEdit}>Edit</Link>
      {
        user.role === "admin" || user.id === pin.edits[0].user.id ? ( // if user is admin or creator
          <Link onClick={handleDelete}>Delete</Link>
        ) : (
          // else user is not admin
          ""
        )
        /* end if user is admin */
      }
    </>
  );
};

export default PinDetails;
