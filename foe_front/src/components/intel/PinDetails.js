import React from "react"

function PinDetails(props) {
    return (
        <div style={{visibility: props.visibility}} className='pindetails'>
            {props.details.name}    <br/>
            Amount: {props.details.amount} Rank: {props.details.rank} Respawn: {props.details.respawn}<br/>
            Notes: {props.details.notes}   id: {props.details.id}
        </div>
    )
}

export default PinDetails