import React, { useEffect } from 'react';

import { Link } from "react-router-dom";

function Home(props) {

    useEffect(() => {
        props.history.push('/campaigns');
    },[]);
    
    
    return(
        <div>
            <Link to="/campaigns">Campaign Maps</Link>
        </div>
    );
}

export default Home;
