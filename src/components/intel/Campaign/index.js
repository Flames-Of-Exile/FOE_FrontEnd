import { Backdrop, Grid, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Circle, MapContainer, ImageOverlay } from "react-leaflet";
import { CRS } from "leaflet";
import { useCampaignContext } from "components/intel/Home";
import useSessionContext from "SessionContext";
import { useHistory } from "react-router-dom";
import InnerLink from "components/utilities/InnerLink";
import useStyles from "./style";
import useIsMounted from "hooks/useIsMounted";

const Campaign = () => {
  /* STYLING */
  const classes = useStyles();

  /* ROUTING */
  const history = useHistory();

  /* MAP STATE */
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(true);

  /* REFS */
  const overlayRef = useRef(null);
  const isMounted = useIsMounted();

  /* CONTEXT */
  const { activeCampaign: campaign, setWorld } = useCampaignContext();
  const { user } = useSessionContext();

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
        setLoading(false);
      }
    };
  }, [campaign]);

  const handleLoad = useCallback(() => {
    if (overlayRef.current) {
      let ratio = size.height / size.width;
      overlayRef.current.setBounds([
        [-400, -400 / ratio],
        [400, 400 / ratio],
      ]);
    }
  }, [size]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  const handleWorldSelect = (world) => {
    return () => {
      history.push(`/campaigns/${campaign.name}/${world.name}`);
      setWorld(world);
    };
  };

  if (loading) {
    return <Backdrop open />;
  }
  return (
    <>
      <Grid item>
        <Typography>{campaign.name}</Typography>
      </Grid>
      <MapContainer
        center={[0, 0]}
        zoom={0}
        keyboard={false}
        scrollWheelZoom={false}
        crs={CRS.Simple}
        minZoom={-5}
        maxZoom={5}
        className={classes.map}
      >
        <ImageOverlay
          url={campaign.image}
          ref={overlayRef}
          bounds={[
            [0, 0],
            [0, 0],
          ]}
          eventHandlers={{ load: handleLoad }}
        />
        {campaign.worlds.map((world) => (
          <div key={world}>
            <Circle
              center={[world.center_lat, world.center_lng]}
              radius={world.radius}
              opacity={0}
              fillColor={"yellow"}
              eventHandlers={{
                click: handleWorldSelect(world),
              }}
            />
          </div>
        ))}
      </MapContainer>
      <Grid item>
        <InnerLink
          to={`/campaigns/${campaign.name}/addworld`}
          primary="Add World"
        />
      </Grid>
      {user.role === "admin" ? (
        <Grid item>
          <InnerLink
            to={`/campaigns/${campaign.name}/update`}
            primary="Edit Campaign"
          />
        </Grid>
      ) : (
        ""
      )}
    </>
  );
};

export default Campaign;
