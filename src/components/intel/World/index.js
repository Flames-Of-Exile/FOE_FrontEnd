import { Backdrop, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";
import { CRS } from "leaflet";
import InnerLink from "components/utilities/InnerLink";
import FilterBox from "components/intel/FilterBox";
import Pin from "components/intel/Pin";
import NewPin from "components/intel/NewPin";
import { useLocation, useParams } from "react-router-dom";
import { useCampaignContext } from "components/intel/Home";
import useSessionContext from "SessionContext";
import queryString from "query-string";

/* STYLING */
const useStyles = makeStyles(() => ({
  map: {
    width: "90%",
    height: "75vh",
  },
}));

const World = () => {
  /* STYLING */
  const classes = useStyles();

  /* MAP STATE */
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);

  /* REFS */
  const overlayRef = useRef(null);

  /* ROUTING */
  const location = useLocation();
  const params = useParams();

  /* CONTEXT */
  const { world } = useCampaignContext();
  const { user } = useSessionContext();

  /* MAP HANDLING */
  useEffect(() => {
    if (world.image == undefined) {
      return;
    }
    const image = new Image();
    image.src = world.image;
    image.onload = () => {
      setSize({ width: image.naturalWidth, height: image.naturalHeight });
      setPins(filterPins(queryString.parse(location.search)));
    };
    setLoading(false);
  }, [world]);

  useEffect(() => {
    setPins(filterPins(queryString.parse(location.search)));
  }, [location.search, loading]);

  const filterPins = (filterOptions) => {
    if (filterOptions) {
      return world.pins.filter((pin) => {
        if (filterOptions.type) {
          if (!filterOptions.type.split(",").includes(pin.symbol)) {
            return false;
          }
        }
        if (filterOptions.resource) {
          if (
            !filterOptions.resource.split(",").includes(pin.resource) &&
            pin.resource !== "na"
          ) {
            return false;
          }
        }
        if (filterOptions.rank) {
          if (pin.rank && filterOptions.rank > pin.rank) {
            return false;
          }
        }
        if (filterOptions.amount) {
          if (pin.amount && filterOptions.amount > pin.amount) {
            return false;
          }
        }
        return true;
      });
    }
    return world.pins;
  };

  const handleLoad = useCallback(() => {
    if (overlayRef.current) {
      overlayRef.current.setBounds([
        [-1 * size.height, -1 * size.width],
        [size.height, size.width],
      ]);
    }
  }, [size]);

  useEffect(() => {
    handleLoad;
  }, [handleLoad]);

  if (loading) {
    return <Backdrop open />;
  }
  return (
    <>
      <Grid item>
        <Typography>{world.name}</Typography>
      </Grid>
      <MapContainer
        center={[0, 0]}
        zoom={-1}
        scrollWheelZoom={true}
        crs={CRS.Simple}
        minZoom={-3}
        className={classes.map}
      >
        <NewPin />
        <ImageOverlay
          url={world.image}
          ref={overlayRef}
          bounds={[
            [0, 0],
            [0, 0],
          ]}
          eventHandlers={{ load: handleLoad }}
        />
        {pins.map((pin) => (
          <Pin key={pin.id} pin={pin} />
        ))}
      </MapContainer>
      <FilterBox />
      {
        user.role === "admin" ? ( // if user is admin
          <Grid item>
            <InnerLink
              to={`/campaigns/${params.campaign}/${world.name}/update`}
              primary="Edit World"
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

export default World;
