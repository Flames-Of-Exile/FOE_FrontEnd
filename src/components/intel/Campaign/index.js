import { Backdrop, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Circle, MapContainer, ImageOverlay } from "react-leaflet";
import { CRS } from "leaflet";
import { CampaignContext } from "components/intel/CampaignSelector";
import SessionContext from "SessionContext";
import { useHistory } from "react-router-dom";
import InnerLink from "components/InnerLink";

const Campaign = () => {
  const history = useHistory();

  const [state, setState] = useState({
    width: 0,
    height: 0,
    loading: true,
  });
  const overlayRef = useRef(null);

  const { campaign } = useContext(CampaignContext);
  const { user } = useContext(SessionContext);

  useEffect(() => {
    if (campaign.image == undefined) {
      return;
    }
    const image = new Image();
    image.src = campaign.image;
    image.onload = () => {
      setState({
        ...state,
        width: image.naturalWidth,
        height: image.naturalHeight,
        loading: false,
      });
    };
  }, [campaign]);

  const handleLoad = () => {
    if (overlayRef.current) {
      let ratio = state.height / state.width;
      overlayRef.current.setBounds([
        [-400, -400 / ratio],
        [400, 400 / ratio],
      ]);
    }
  };

  useEffect(() => {
    if (overlayRef.current) {
      let ratio = state.height / state.width;
      overlayRef.current.setBounds([
        [-400, -400 / ratio],
        [400, 400 / ratio],
      ]);
    }
  }, [state.height, state.width]);

  if (state.loading) {
    return <Backdrop />;
  }
  return (
    <>
      <Typography>{campaign.name}</Typography>
      <MapContainer
        center={[0, 0]}
        zoom={0}
        keyboard={false}
        scrollWheelZoom={false}
        crs={CRS.Simple}
        minZoom={-5}
        maxZoom={5}
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
      <InnerLink
        to={`/campaigns/${campaign.name}/addworld`}
        primary="Add World"
      />
      {
        user.role === "admin" ? ( // if user is admin
          <InnerLink
            to={`/campaigns/${campaign.name}/update`}
            primary="Edit Campaign"
          />
        ) : (
          // else
          ""
        ) /* end if user is admin */
      }
    </>
  );
};

export default Campaign;
