import React from 'react';

function Mob(props) {
    return(
        <svg viewBox='38 0 6 11 ' className='pinSVG'>
            <g className='border' style={props.borderStyle}>
                <path
                    d={'M 41.010417,10.985419 38.629167,5.9583333 V 3.3125 l 1.5875,-1.3229167 ' +
                    'V 0.93125 h 1.5875 v 1.0583333 l 1.5875,1.3229167 -1.1e-5,2.6458333 z'}
                />
            </g>
            <g className='icon' style={props.iconStyle}>
                <path
                    d={'M 41.995029,5.4834711 42.251922,5.3495116 42.345192,5.4546464 42.181571,5.6937501 ' +
                        '41.130284,6.6264156 40.4995,7.186005 40.686044,7.3962588 40.475788,7.5827903 ' +
                        '40.289243,7.3725334 39.868729,7.7456013 39.682185,7.5353349 40.102699,7.1622689 ' +
                        '39.916155,6.9520151 40.126412,6.7654804 40.312956,6.9757373 40.943727,6.416136 Z'}
                />
                <path
                    d={'m 40.025806,5.4834711 -0.256893,-0.1339595 -0.09327,0.1051348 0.163622,0.2391037 ' +
                        '1.051287,0.9326655 0.630784,0.5595896 -0.186544,0.210254 0.210256,0.186531 ' +
                        '0.186545,-0.210257 0.420514,0.373068 0.186544,-0.210266 L 41.918137,7.1622692 ' +
                        '42.104681,6.9520151 41.894424,6.7654804 41.70788,6.9757373 41.077109,6.416136 Z'}
                />
                <path
                    d={'M 39.687499,4.90001 41.010416,2.2541766 42.333333,4.90001 ' +
                        'h 0.264583 v 0.2645833 h -3.175 l 10e-7,-0.2645833 H 39.6875'}
                />
            </g>
            <g className='cutout' style={props.cutoutStyle}>
                <path d='m 40.216667,4.6354267 0.79375,-1.3229167 0.79375,1.3229167 z'></path>
            </g>
        </svg>
    );
}

export default Mob;