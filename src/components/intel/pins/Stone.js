import React from "react";

function Stone(props) {
  return (
    <svg viewBox="1 0 6 11 " xmlns="http://www.w3.org/2000/svg">
      <g style={props.borderStyle}>
        <path d="M 3.9627389,10.985417 1.5814889,5.9583333 1.5875,0.93125 h 4.7564889 v 5.0270833 z"></path>
      </g>
      <g style={props.iconStyle}>
        <path d="M 4.7625,3.5770833 H 5.8208333 L 6.0854167,4.9 H 4.4979168 Z"></path>
        <path d="M 3.4395833,2.2541667 H 4.4979167 L 4.7624999,3.5770833 H 3.175 Z"></path>
        <path d="M 2.1166667,3.5770833 H 3.175 L 3.4395833,4.9 H 1.8520834 Z"></path>
      </g>
    </svg>
  );
}

export default Stone;
