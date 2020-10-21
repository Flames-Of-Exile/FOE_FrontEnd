import React from 'react';

const axios = require('axios').default

function Unconfirmed(props) {

    const handleClick = async () => {
        const response = await axios.get('/api/users/resend')
        console.log(response.data)
    }

    return (
        <div>
            <p>A confirmation email has been sent to you at {props.Application.state.currentUser.email}.</p>
            <a onClick={handleClick}>Send another</a>
        </div>
    );
}

export default Unconfirmed;