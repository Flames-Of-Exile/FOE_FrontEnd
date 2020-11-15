import React from 'react';

function Wood(props) {
    return(
        <svg viewBox='22 0 6 11 ' xmlns='http://www.w3.org/2000/svg'>
            <g style={props.borderStyle}>
                <path
                    d={'M 25.135417,10.985417 22.754167,5.9583307 23.283333,3.3125 ' +
                        '22.754167,0.93125 h 4.7625 L 26.9875,3.3125 27.516656,5.9583307 Z'}
                />
            </g>
            <g style={props.iconStyle}>
                <path
                    d={'m 25.135417,2.2541667 0.79375,1.3229166 H 25.664583 L 26.19375,4.6354167 ' +
                        'H 25.929167 L 26.458334,5.69375 H 25.4 V 6.4875 H 24.870833 V 5.69375 ' +
                        'H 23.8125 L 24.341667,4.6354167 H 24.077083 L 24.60625,3.5770833 h -0.264583 z'}
                />
            </g>
        </svg>
    );
}

export default Wood;