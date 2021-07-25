import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";
import { CRS } from "leaflet";
import WorldLinkDrawer from "components/intel/WorldLinkDrawer";
import axios from "axios";
import useSocketContext from "SocketContext";
import { useCampaignContext } from "components/intel/Home";
import { useHistory } from "react-router-dom";
import useFormReducer from "./reducer";
import useAlertBarContext from "AlertBarContext";

const WorldUpdate = () => {
  const { state: formState, setName } = useFormReducer();
  const { name } = formState;
  const [circle, setCircle] = useState({
    centerLat: 0,
    centerLng: 0,
    radius: 0,
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const history = useHistory();

  const overlayRef = useRef(null);

  const { campaign, world } = useCampaignContext();
  const { setAlert } = useAlertBarContext();
  const { send } = useSocketContext();

  useEffect(() => {
    if (campaign.image == undefined) {
      return;
    }
    const image = new Image();
    image.src = campaign.image;
    image.onload = () => {
      setSize({ width: image.naturalWidth, height: image.naturalHeight });
      setInitialLoading(false);
    };
  }, [campaign]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
    }
  };

  const handleSubmit = async () => {
    if (name === "") {
      setName(name.value);
      return;
    }
    setLoading(true);
    try {
      await axios.patch(`/api/worlds/${world.id}`, {
        name: name.value,
        center_lat: circle.centerLat,
        center_lng: circle.centerLng,
        radius: circle.radius,
      });
      send("campaign-update");
      history.push(`/campaigns/${campaign.name}`);
      setAlert("World updated!", "success");
    } catch (error) {
      setAlert(error.response.data, "error");
    }
    setLoading(false);
  };

  const setRefSize = useCallback(() => {
    if (overlayRef.current) {
      let ratio = size.height / size.width;
      overlayRef.current.setBounds([
        [-400, -400 / ratio],
        [400, 400 / ratio],
      ]);
    }
  }, [size]);

  const handleLoad = () => {
    setRefSize();
  };

  useEffect(() => {
    setRefSize();
  }, [setRefSize]);

  const nameTextFieldProps = {
    name: "name",
    id: "name",
    label: "name",
    onChange: handleChange,
    disabled: loading,
    ...name,
  };

  return (
    <>
      <Typography>
        Update {world.name} of {campaign.name}
      </Typography>
      <TextField {...nameTextFieldProps} />
      <Button onClick={handleSubmit} disabled={loading} variant="contained">
        Submit
        {loading && <CircularProgress size={25} />}
      </Button>
      Draw click area below
      {initialLoading ? (
        <CircularProgress />
      ) : (
        <MapContainer
          center={[0, 0]}
          keyboard={false}
          scrollWheelZoom={false}
          zoom={0}
          crs={CRS.Simple}
          minZoom={-5}
          maxZoom={5}
        >
          <WorldLinkDrawer setCircle={setCircle} />
          <ImageOverlay
            url={campaign.image}
            ref={overlayRef}
            bounds={[
              [0, 0],
              [0, 0],
            ]}
            eventHandlers={{ load: handleLoad }}
          />
        </MapContainer>
      )}
    </>
  );
};

export default WorldUpdate;
