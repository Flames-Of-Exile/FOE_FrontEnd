import React from 'react';

import PinDetails from '../PinDetails.js';

function Grave(props) {
    return(
        <svg viewBox='54 0 6 11 ' className='pinSVG'>
            <title><PinDetails visibility={props.visibility} details={props.details}/></title>
            <g className='border' style={props.boarderStyle}>
                <path d='M 56.885417,10.985418 54.504167,5.9583333 V 3.3125 L 56.35625,2.7833333 V 2.2541667 h -0.529167 v -0.79375 H 56.35625 V 0.93125 h 1.058333 v 0.5291667 h 0.529167 v 0.79375 h -0.529167 v 0.5291666 l 1.852084,0.5291667 -1.1e-5,2.6458333 z'></path>
            </g>
            <g className='icon' style={props.iconStyle}>
                <path d='m 55.30639,5.9583333 c -0.0084,-1.0889037 1.33355,-1.0889037 1.33355,-0.015285 0,1.0736187 0,1.0736186 0,1.0736186 h -1.342023 c 0,0 0.01266,-0.3873348 0.0084,-1.0583333 z'></path>
                <path d='m 56.222879,3.8416667 c -0.0084,-1.0889037 1.33355,-1.0889037 1.33355,-0.015285 0,1.0736188 0,1.0736187 0,1.0736187 h -1.342023 c 0,0 0.01266,-0.3873349 0.0084,-1.0583334 z'></path>
                <path d='m 57.139367,5.958333 c -0.0084,-1.0889037 1.33355,-1.0889037 1.33355,-0.015285 0,1.0736188 0,1.0736187 0,1.0736187 h -1.342023 c 0,0 0.01266,-0.3873349 0.0084,-1.0583334 z'></path>
            </g>
        </svg>
    );
}

export default Grave;