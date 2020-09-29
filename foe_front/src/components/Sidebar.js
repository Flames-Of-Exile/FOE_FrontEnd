import React from "react"

import { Link } from "react-router-dom"

function Sidebar(props) {


    return (
        <div className="sidebar">
            <Link to="/">Home</Link><br/>
            <br />
            {props.Application.state.currentUser ? // if user is logged in
            <div>
                <Link to="/logout">Logout</Link>
                {/* Links/info for logged in users here */}
            </div>
            : // else user is not logged in
            <div>
                <Link to="/login">Login</Link><br/>
                <Link to="/register">Register</Link>
                {/* Links/info for not logged in users here */}
            </div>
            /* end if user is logged in*/}
        </div>
    )
}

export default Sidebar