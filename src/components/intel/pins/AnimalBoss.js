import React from 'react';

import PinDetails from '../PinDetails.js';

function AnimalBoss(props) {
    return(
        <svg viewBox='33 0 6 11 ' className='pinSVG'>
            <title><PinDetails visibility={props.visibility} details={props.details}/></title>
            <g className='border' style={props.boarderStyle}>
                <path d='M 35.718749,10.985419 33.337499,5.9583336 V 0.93125006 l 1.058334,1.05833324 h 2.645834 l 1.058332,-1.05833324 -1.1e-5,5.02708354 z'></path>
            </g>
            <g className='icon' style={props.iconStyle}>
                <path d='M 34.395833,3.8945832 V 3.0479167 L 34.836807,3.47125 h 0.440971 0.881945 0.440971 L 37.041666,3.0479167 V 3.8945832 L 37.482639,5.5879167 36.600694,6.4345833 36.159723,7.28125 H 35.277778 L 34.836807,6.4345833 33.954862,5.5879167 Z'></path>
                <path d='M 34.780962,2.51875 35.012515,2.848 35.24407,2.51875 35.475625,2.848 35.707177,2.51875 35.93873,2.848 36.170287,2.51875 36.401841,2.848 36.633394,2.51875 36.489796,3.3125 H 34.925 Z'></path>
            </g>
            <g className='cutout' style={props.cutoutStyle}>
                <path d='M 34.395833,5.1645834 34.925,5.69375 h 0.529167 z'></path>
                <path d='M 37.041667,5.1645834 36.5125,5.69375 h -0.529167 z'></path>

            </g>
        </svg>
    );
}

export default AnimalBoss;