import React from 'react';

function StoneMotherlode(props) {
    return(
        <svg viewBox='6 0 6 11 ' xmlns='http://www.w3.org/2000/svg'>
            <g style={props.borderStyle}>
                <path d='M 9.2604168,10.985418 6.8791667,5.9583333 6.8851778,0.93125003 H 11.641666 V 5.9583333 Z'></path>
            </g>
            <g style={props.iconStyle}>
                <path d='m 8.4666667,2.2541667 h 1.5875003 l 0.529167,3.7041667 H 7.9374997 Z'></path>
                <path d='m 10.054167,4.9 h 0.79375 l 0.396875,1.3670137 H 9.6572917 Z'></path>
                <path d='m 7.6729167,4.9 h 0.79375 l 0.396875,1.3670137 h -1.5875 z'></path>
            </g>
        </svg>
    );
}

export default StoneMotherlode;