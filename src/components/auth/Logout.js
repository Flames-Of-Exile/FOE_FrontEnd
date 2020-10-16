import React, { useEffect, useState } from "react";

const axios = require("axios").default;

function Logout(props) {
    const [state, setState] = useState({
        loading: true
    });

    useEffect(() => {
        async function apiLogout() {
            await axios.get('/api/users/logout');
            setState({
                loading: false
            });
            props.Application.syncLogout();
            localStorage.setItem('logout', Date.now());
        }
        apiLogout();
    }, []);

    
    return (
        <div className="main">
            {state.loading ? 
                "Logging out..."
            :
                "Successfully logged out!"
            }
        </div>
    );
}

export default Logout;
