import { Link, Typography, withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import capitalize from "helpers/Capitalize";
import axios from "axios";
import useSessionContext from "SessionContext";
import useSocketContext from "SocketContext";
import useAlertBarContext from "AlertBarContext";

const StyledTypography = withStyles({ root: { margin: -5 } })(Typography);

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
        <StyledTypography key="resource" variant="h6">
          {capitalize(pin.resource)}
        </StyledTypography>
      );
    }
    if (pin.rank) {
      array.push(
        <StyledTypography
          key="rank"
          variant="caption"
        >{` Rank: ${pin.rank}`}</StyledTypography>
      );
      array.push(<br key="rank-br" />);
    }
    if (pin.amount) {
      array.push(
        <StyledTypography key="amount" variant="caption">
          {`Amount: ${pin.amount}`}
        </StyledTypography>
      );
      array.push(<br key="amount-br" />);
    }
    if (pin.x_cord && pin.y_cord) {
      array.push(
        <StyledTypography key="coord" variant="caption">
          {`Location: ${capitalize(pin.x_cord)}${pin.y_cord}`}
        </StyledTypography>
      );
      array.push(<br key="location-br" />);
    }
    if (pin.name) {
      array.push(
        <StyledTypography key="name" variant="subtitle1">
          {`${pin.name}`}
        </StyledTypography>
      );
    }
    if (pin.notes) {
      array.push(
        <StyledTypography key="notes" variant="caption">
          {`${pin.notes}`}
        </StyledTypography>
      );
      array.push(<br key="notes-br" />);
    }
    return array;
  };

  return (
    <>
      {details}
      <Link onClick={handleEdit}>Edit </Link>
      {user.role === "admin" || user.id === pin.edits[0].user.id ? (
        <Link onClick={handleDelete}> Delete</Link>
      ) : (
        ""
      )}
    </>
  );
};

export default PinDetails;
