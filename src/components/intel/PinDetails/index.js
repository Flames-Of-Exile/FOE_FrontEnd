import { CircularProgress, Link } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Popup } from "react-leaflet";
import capitalize from "helpers/Capitalize";
import axios from "axios";
import useSessionContext from "SessionContext";
import useSocketContext from "SocketContext";
import useAlertBarContext from "AlertBarContext";
import { StyledTypography } from "./style";
import useIsMounted from "hooks/useIsMounted";

const PinDetails = (props) => {
  /* REFS */
  const isMounted = useIsMounted();

  /* PROPS */
  const { pin, handleEdit } = props;

  /* FORM STATE */
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  /* CONTEXT */
  const { setAlert } = useAlertBarContext();
  const { user } = useSessionContext();
  const { send, registerListener } = useSocketContext();

  /* FORM HANDLING */
  useEffect(() => {
    if (isMounted) {
      setDetails(createDetailArray(pin));
    }
  }, [pin]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/pins/${pin.id}`);
      registerListener("campaign-update", () => setLoading(false), {
        once: true,
      });
      send("campaign-update");
    } catch (error) {
      setAlert(error.response.data, "error");
      setLoading(false);
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
      <Popup offset={[0, -50]} minWidth={100} maxWidth={100}>
        {details}
        <Link onClick={handleEdit}>Edit </Link>
        {user.role === "admin" || user.id === pin.edits[0].user.id ? (
          <Link onClick={handleDelete}> Delete</Link>
        ) : (
          ""
        )}
        {loading && <CircularProgress size={15} />}
      </Popup>
    </>
  );
};

export default PinDetails;
