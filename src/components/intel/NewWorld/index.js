import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";
import { CRS } from "leaflet";
import useSocketContext from "SocketContext";
import WorldLinkDrawer from "components/intel/WorldLinkDrawer";
import axios from "axios";
import { useCampaignContext } from "components/intel/Home";
import useFormReducer from "./reducer";
import useAlertBarContext from "AlertBarContext";

const useStyles = makeStyles(() => ({
  map: {
    width: "100%",
    height: "90vh",
  },
}));

const NewWorld = () => {
  const classes = useStyles();
  const { state: formState, setName, setFile } = useFormReducer();
  const { name, file, filename } = formState;
  const [circle, setCircle] = useState({
    centerLat: 0,
    centerLng: 0,
    radius: 0,
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const overlayRef = useRef(null);

  const { activeCampaign: campaign } = useCampaignContext();
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
      case "file":
        setFile(e.target.files[0], e.target.value.split("\\").pop());
        break;
    }
  };

  const handleSubmit = async () => {
    if (name.value === "" || file.value === null) {
      setName(name.value);
      setFile(file.value, filename.value);
      return;
    }
    if (circle.radius === 0) {
      setAlert("Please draw the click area on the map.", "error");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file.value, filename.value);
    formData.append("name", name.value);
    formData.append("campaign_id", campaign.id);
    formData.append("center_lat", circle.centerLat);
    formData.append("center_lng", circle.centerLng);
    formData.append("radius", circle.radius);
    try {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.post("/api/worlds", formData, config);
      send("campaign-update");
      setAlert("World created!", "success");
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
      <Grid item>
        <Typography>Add world to {campaign.name}</Typography>
      </Grid>
      <Grid item>
        <TextField {...nameTextFieldProps} />
      </Grid>
      <Grid item>
        <TextField {...fileTextFieldProps} />
      </Grid>
      <Grid item>
        <Button onClick={handleSubmit} disabled={loading} variant="contained">
          Submit
          {loading && <CircularProgress size={25} />}
        </Button>
      </Grid>
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
          className={classes.map}
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

export default NewWorld;
