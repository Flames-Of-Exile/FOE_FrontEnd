import React from 'react'

const axios = require('axios').default

function EditProfile(props) {

    const handleSelect = async (event) => {
        let user = props.Application.state.currentUser
        user.theme = event.target.value
        props.Application.setState({
            ...props.Application.state,
            currentUser: user,
        })
        try {
           await axios.patch(`/api/users/${user.id}`, JSON.stringify(user)) 
        } catch (error) {
            console.log("failed to update profile -", error.message)
        }
    }


    return (
        <div>
            <select className="theme-selector" onChange={handleSelect} value={props.Application.state.currentUser.theme}>
                <option value="default">Default</option>
                <option value="blue_raspberry">Blue Raspberry</option>
                <option value="cartography">Cartography</option>
                <option value="pumpkin_spice">Pumpkin Spice</option>
                <option value="red">Red</option>
                <option value="seabreeze">Seabreeze</option>
            </select>
        </div>
    )
}

export default EditProfile