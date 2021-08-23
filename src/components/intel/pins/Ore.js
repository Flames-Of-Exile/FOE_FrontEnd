import React from "react";

function Ore(props) {
  return (
    <svg viewBox="12 0 6 11 " xmlns="http://www.w3.org/2000/svg">
      <g style={props.borderStyle}>
        <path
          d={
            "M 14.552083,10.985418 12.170833,5.9583333 V 3.3125 " +
            "L 13.229167,0.93125 H 15.875 l 1.058333,2.38125 -1.1e-5,2.6458333 z"
          }
        />
      </g>
      <g style={props.iconStyle}>
        <path d="m 15.478124,3.5770833 0.79375,0.2204862 0.396875,1.1024304 h -1.5875 z"></path>
        <path d="m 14.155208,2.2541666 0.79375,0.2204862 0.396874,1.1024305 h -1.587499 z"></path>
        <path d="m 12.832291,3.5770833 0.79375,0.2204862 0.396875,1.1024304 h -1.5875 z"></path>
      </g>
    </svg>
  );
}

export default Ore;
