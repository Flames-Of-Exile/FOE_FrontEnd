import {
  Button,
  CircularProgress,
  Grid,
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
import Upload from "components/utilities/Upload";
import useStyles from "./style";
import useIsMounted from "hooks/useIsMounted";

const NewWorld = () => {
  /* STYLING */
  const classes = useStyles();

  /* FORM STATE */
  const { state: formState, setName, setFile } = useFormReducer();
  const { name, file, filename } = formState;
  const [loading, setLoading] = useState(false);

  /* REFS */
  const overlayRef = useRef(null);
  const isMounted = useIsMounted();

  /* CONTEXT */
  const { activeCampaign: campaign } = useCampaignContext();
  const { setAlert } = useAlertBarContext();
  const { send } = useSocketContext();

  /* MAP STATE */
  const [circle, setCircle] = useState({
    centerLat: 0,
    centerLng: 0,
    radius: 0,
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const [size, setSize] = useState({ width: 0, height: 0 });

  /* MAP HANDLING */
  useEffect(() => {
    if (campaign.image == undefined) {
      return;
    }
    const image = new Image();
    image.src = campaign.image;
    image.onload = () => {
      if (isMounted) {
        setSize({ width: image.naturalWidth, height: image.naturalHeight });
        setInitialLoading(false);
      }
    };
  }, [campaign]);

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

  /* COMPONENT PROPS */
  const nameTextFieldProps = {
    name: "name",
    id: "name",
    label: "Name",
    required: true,
    autoFocus: true,
    onChange: handleChange,
    disabled: loading,
    inputProps: { form: "new-world-form" },
    ...name,
  };

  const uploadProps = {
    inputProps: {
      name: "file",
      id: "file",
      required: true,
      accept: "image/*",
      onChange: handleChange,
      inputProps: { form: "new-world-form" },
    },
    buttonProps: {
      disabled: loading,
      text: filename.value,
    },
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
        <Upload {...uploadProps} />
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit} id="new-world-form">
          <Button type="submit" disabled={loading} variant="contained">
            Submit
            {loading && <CircularProgress size={25} />}
          </Button>
        </form>
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
