import React from 'react'

import { Link } from 'react-router-dom'

function Sidebar(props) {

    return (
        <div className='sidebar'>
            <Link to="/">Home</Link><br/>
            <br />
            {props.Application.state.currentUser ? // if user is logged in
            <div>
                {/* Links/info for logged in users here */}
            </div>
            : // else user is not logged in
            <div>
                {/* Links/info for not logged in users here */}
            </div>
            /* end if user is logged in*/}
        </div>
    )
}

export default Sidebar