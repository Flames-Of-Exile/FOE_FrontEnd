import React, {
    useEffect,
    useState,
} from "react";

import { Link } from "react-router-dom";
import swal from "sweetalert";

const axios = require("axios").default;


function Campaign(props) {

    const [state, setState] = useState({
        campaign: {name: "", worlds: []}
    });

    useEffect(() => {
        let campaignName = props.match.params.campaign;
        async function fetchData() {
            try {
                const response = await axios.get(`/api/campaigns/q?name=${campaignName}`);
                setState({
                    ...state,
                    campaign: response.data,
                });
            } catch (error) {
                if (error.response.data.includes(`404 Not Found`)) {
                    swal("Error", `Campaign with name '${campaignName}' not found.`, "error");
                    props.history.push('/campaigns');
                    return;
                }
                swal("Error", error.response.data, "error");
                props.history.push('/campaigns');
            }
        }
        fetchData();
    }, [props.match.params.campaign]);


    return(
        <div>
            <p className='banner'>{state.campaign.name}</p>
            <img src={state.campaign.image} className='campaign' alt='Failed to Load Campaign'/>
            <br />
            {state.campaign.worlds.map(world => 
                    <div key={world}>
                        <Link to={`/campaigns/${state.campaign.name}/${world.name}`} >{world.name}</Link><br />
                    </div>
                )}
            {props.Application.state.currentUser.role === "admin" ? // if user is admin
                <Link to={`/campaigns/${state.campaign.name}/addworld`}>Add World</Link>
            : // else
                "" /* end if user is admin */}
        </div>
    );
}

export default Campaign;
