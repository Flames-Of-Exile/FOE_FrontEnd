import React, {useState} from 'react';

import swal from "sweetalert";

import validatePassword from "../helper_functions/ValidatePassword"

const axios = require('axios').default;

function EditProfile(props) {

    const [state, setState] = useState({
        password1: "",
        password2: "",
    })

    const handleSelect = async (event) => {
        let user = props.Application.state.currentUser;
        user.theme = event.target.value;
        props.Application.setState({
            ...props.Application.state,
            currentUser: user,
        });
        try {
           await axios.patch(`/api/users/${user.id}`, JSON.stringify(user));
        } catch (error) {
            swal("Error", error.response.data, "error");
        }
    };

    const handleSubmit = async () => {
        if (state.password1 !== state.password2) {
            swal("Error", "Passwords don't match.", "error");
            return;
        }
        let errors = validatePassword(state.password1)
        if (errors.length > 0) {
            swal("Error", errors.join('\n'), "error");
            return;
        }
        try {
            let user = props.Application.state.currentUser;
            await axios.patch(`/api/users/${user.id}`, JSON.stringify({
                'theme': user.theme,
                'password': state.password1,
            }))
            swal("Success", "Password updated!", "success");
        } catch (error) {
            swal("Error", error.response.data, "error");
        }
    }

    const handleChange = async (event) => setState({
        ...state,
        [event.target.name]: event.target.value,
    })


    return (
        <div>
            <form className="grid-2">
                <label for="theme-selector">Theme</label>
                <select className="theme-selector" onChange={handleSelect} value={props.Application.state.currentUser.theme}>
                    <option value="default">Default</option>
                    <option value="blue_raspberry">Blue Raspberry</option>
                    <option value="cartography">Cartography</option>
                    <option value="pumpkin_spice">Pumpkin Spice</option>
                    <option value="red">Red</option>
                    <option value="seabreeze">Seabreeze</option>
                </select>
                <div className="row-2 column-1-2" />
                <div className="row-3 column-1-2" />
                <label for="password1">New Password</label>
                <input type="password" name="password1" placeholder="password" onChange={handleChange} />
                <label for="password2">Retype Password</label>
                <input type="password" name="password2" placeholder="retype password" onChange={handleChange} />
            </form>
            <button onClick={handleSubmit}>Change Password</button>
        </div>
    );
}

export default EditProfile;
