import React from "react";

import swal from "sweetalert";

import validatePassword from "../../../helper_functions/ValidatePassword";

const axios = require("axios").default;

class Register extends React.Component {
    constructor(props) {
        super();
        this.state = {
            Application: props.Application,
            username: "",
            password1: "",
            password2: "",
            guild: "",
            guildList: [],
        };
    }

    async componentDidMount() {
        const response = await axios.get("/api/guilds");
        this.setState({
            ...this.state,
            guildList: response.data,
            guild: response.data[0].id,
        });
    }

    handleChange = (event) => this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
    });

    handleSubmit = async () => {
        if (this.state.username === "") {
            swal("Error", "Please enter a username.", "error");
            return;
        }
        if (this.state.password1 !== this.state.password2) {
            swal("Error", "Passwords don't match.", "error");
            return;
        }
        let errors = validatePassword(this.state.password1);
        if (errors.length > 0) {
            swal("Error", errors.join('\n'), "error");
            return;
        }
        try {
            const response = await axios.post("/api/users", JSON.stringify({
                username: this.state.username,
                password: this.state.password1,
                guild_id: this.state.guild,
            }));
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
            this.state.Application.setState({
                ...this.state.Application.state,
                currentUser: response.data.user,
            });
            setTimeout(this.state.Application.refresh, 27000, this.state.Application);
        } catch (error) {
            if (error.response.data.includes(`(${this.state.username}) already exists`)) {
                swal("Error", "Username already taken, please try another.", "error");
                return;
            }
            swal("Error", error.response.data, "error");
        }
    }

    
    render() {
        return (
            <div>
                <div className="grid-3">
                    <span className="column-1-3">Password must meet the following requirements:</span>
                    <ul className="row-2 column-2">
                        <li>At least 8 characters in length</li>
                        <li>At least 1 uppercase character</li>
                        <li>At least 1 lowercase character</li>
                        <li>At least 1 number</li>
                        <li>At least 1 symbol</li>
                    </ul>
                </div>
                <br />
                <form className="grid-2">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder='user name' onChange={this.handleChange}/>
                    <label htmlFor="password1">Password</label>
                    <input type="password" name="password1" placeholder='password' onChange={this.handleChange}/>
                    <label htmlFor="password2">Retype Password</label>
                    <input type="password" name="password2" placeholder='retype password' onChange={this.handleChange}/>
                    <label htmlFor="guild">Guild</label>
                    <select name="guild" onChange={this.handleChange} value={this.state.guild}>
                        {this.state.guildList.map(guild => <option key={guild} value={guild.id}>{guild.name}</option>)}
                    </select>
                </form>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default Register;
