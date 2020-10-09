import React from "react"

import { Link } from "react-router-dom"

function Sidebar(props) {


    return (
        <div className="sidebar">
            <p>Welcome to the Flames of Exile</p>
            {props.Application.state.currentUser.id ? // if user is logged in
            <div>
                <p>{props.Application.state.currentUser.username}</p>
                <Link to="/">Home</Link><br/>
                <Link to="/profile">Edit Profile</Link><br />
                <Link to="/logout">Logout</Link>
                {props.Application.state.currentUser.role === "admin" ? // if user is admin
                <div>
                    <br /><Link to="/admin">Admin</Link>
                    <br /><Link to='/campaign/new'>Add Campaign</Link>
                    <br /><Link to='/world/new'>Add World</Link>
                </div>
                : // else
                    ""
                /*end if user is admin*/}
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