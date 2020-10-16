import React from "react";

function PinDetails(props) {
    return (
        <div style={{visibility: props.visibility}}>
            {props.details}
        </div>
    );
}

export default PinDetails;
