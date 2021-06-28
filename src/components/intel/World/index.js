import { Backdrop } from "@material-ui/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";
import { CRS } from "leaflet";
import InnerLink from "components/InnerLink";
import FilterBox from "components/intel/FilterBox";
import Pin from "components/intel/Pin";
import NewPin from "components/intel/NewPin";
import { useLocation, useParams } from "react-router-dom";
import { CampaignContext } from "components/intel/CampaignSelector";
import SessionContext from "SessionContext";
import queryString from "query-string";

const World = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);

  const overlayRef = useRef(null);

  const location = useLocation();
  const params = useParams();

  const { world } = useContext(CampaignContext);
  const { user } = useContext(SessionContext);

  useEffect(() => {
    if (world == undefined) {
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

  const handleLoad = () => {
    if (overlayRef.current) {
      overlayRef.current.setBounds([
        [-1 * size.height, -1 * size.width],
        [size.height, size.width],
      ]);
    }
  };

  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.setBounds([
        [-1 * size.height, -1 * size.width],
        [size.height, size.width],
      ]);
    }
  }, [size]);

  if (loading) {
    return <Backdrop />;
  }
  return (
    <>
      <MapContainer
        center={[0, 0]}
        zoom={-1}
        scrollWheelZoom={true}
        crs={CRS.Simple}
        minZoom={-3}
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
          <Pin key={pin} pin={pin} />
        ))}
      </MapContainer>
      <FilterBox />
      {
        user.role === "admin" ? ( // if user is admin
          <InnerLink
            to={`/campaigns/${params.campaign}/${world.name}/update`}
            primary="Edit World"
          />
        ) : (
          // else
          ""
        ) /* end if user is admin */
      }
    </>
  );
};

export default World;
