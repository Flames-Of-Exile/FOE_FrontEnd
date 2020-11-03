import React from "react";

import { Link } from "react-router-dom";


function Campaign(props) {

    return(
        <div>
            <p className='banner'>{props.campaign.name}</p>
            <img src={props.campaign.image} className='campaign' alt='Failed to Load Campaign'/>
            <br />
            {props.campaign.worlds.map(world => 
                    <div key={world}>
                        <Link to={`/campaigns/${props.campaign.name}/${world.name}`} >{world.name}</Link><br />
                    </div>
                )}
            {props.Application.state.currentUser.role === "admin" ? // if user is admin
                <Link to={`/campaigns/${props.campaign.name}/addworld`}>Add World</Link>
            : // else
                "" /* end if user is admin */}
        </div>
    );
}

export default Campaign;
