import React, { useRef, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import PinForm from "components/intel/PinForm";

const NewPin = () => {
  /* REFS */
  const marker = useRef(null);

  /* MAP STATE */
  const [newPin, setNewPin] = useState(false);
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

  useMapEvents({
    click: (e) => {
      setNewPin(true);
      setCoords(e.latlng);
    },
  });

  if (newPin === false) {
    return null;
  } else {
    return (
      <>
        <Marker position={coords} ref={marker}>
          <PinForm
            handleCancel={() => setNewPin(false)}
            marker={marker}
            offset={[0, 0]}
            coords={coords}
          />
        </Marker>
      </>
    );
  }
};

export default NewPin;
