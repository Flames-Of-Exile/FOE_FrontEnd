import React, { useEffect } from 'react'

const axios = require('axios').default

function Logout(props) {

    useEffect(() => {
        props.Application.setState({
            ...props.Application.state,
            currentUser: null
        })
        axios.defaults.headers.common['Authentication'] = ""
    }, [])

    return (
        <div className="main">
            Successfully logged out!
        </div>
    )
}

export default Logout