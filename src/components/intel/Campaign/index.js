import { Backdrop, Grid, Typography, makeStyles } from "@material-ui/core";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Circle, MapContainer, ImageOverlay } from "react-leaflet";
import { CRS } from "leaflet";
import { CampaignContext } from "components/intel/CampaignSelector";
import SessionContext from "SessionContext";
import { useHistory } from "react-router-dom";
import InnerLink from "components/InnerLink";

const useStyles = makeStyles(() => ({
  map: {
    width: "100%",
    height: "90vh",
  },
}));

const Campaign = () => {
  const classes = useStyles();
  const history = useHistory();

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(true);
  const overlayRef = useRef(null);

  const { activeCampaign: campaign } = useContext(CampaignContext);
  const { user } = useContext(SessionContext);

  useEffect(() => {
    if (campaign.image == undefined) {
      return;
    }
    const image = new Image();
    image.src = campaign.image;
    image.onload = () => {
      setSize({ width: image.naturalWidth, height: image.naturalHeight });
      setLoading(false);
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
                click: () =>
                  history.push(`/campaigns/${campaign.name}/${world.name}`),
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
      {
        user.role === "admin" ? ( // if user is admin
          <Grid item>
            <InnerLink
              to={`/campaigns/${campaign.name}/update`}
              primary="Edit Campaign"
            />
          </Grid>
        ) : (
          // else
          ""
        ) /* end if user is admin */
      }
    </>
  );
};

export default Campaign;
