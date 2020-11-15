import React from 'react';

function Well(props) {
    return(
        <svg viewBox='49 0 6 11 ' className='pinSVG' xmlns='http://www.w3.org/2000/svg'>
            <g className='border' style={props.borderStyle}>
                <path
                    d={'M 51.59375,10.98542 49.2125,5.958333 V 1.9895833 ' +
                        'L 51.59375,0.93125 V 1.9895833 L 53.975,0.93125 l -1.1e-5,5.027083 z'}
                />
            </g>
            <g className='icon' style={props.iconStyle}>
                <path
                    d={'m 50.799999,6.7520951 -0.79375,-2.38125 h 0.264584 ' +
                        'l 0.264583,0.79375 h 1.322917 0.529167 l 0.264584,-0.79375 ' +
                        'h 0.264583 l -0.79375,2.38125 h -1.322918'}
                />
                <path
                    d={'m 49.477084,4.1062618 c 0.666578,-0.4361482 ' +
                        '1.488281,-1.0583334 1.984374,-1.5875 0.545704,0.5291666 ' +
                        '1.785938,1.42875 1.984376,1.5875'}
                />
            </g>
        </svg>
    );
}

export default Well;