import React from "react";

import swal from "sweetalert";

import validatePassword from "../../helper_functions/ValidatePassword";

const axios = require("axios").default;

class Admin extends React.Component {
    constructor(props) {
        super();
        this.state = {
            Application: props.Application,
            adminPanel: props.adminPanel,
            id: props.match.params.id,
            username: "",
            password: "",
            role: "guest",
            is_active: false,
            guild: "",
            guildList: props.guilds,
            user: {},
        };
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`/api/users/${this.state.id}`);
            this.setState({
                ...this.state,
                user: response.data,
                username: response.data.username,
                role: response.data.role,
                is_active: response.data.is_active,
                guild: response.data.guild.id,
            });
        } catch (error) {
            swal("Error", error.response.data, "error");
        }
    }

    handleChange = async (event) => this.setState({
        ...this.state,
        [event.target.name]: event.target.value
    });

    handleCheck = async (event) => this.setState({
        ...this.state,
        [event.target.name]: event.target.checked
    });

    handleSubmit = async () => {
        try {
            swal("Sending...", "Attempting to update the user...", "info", {buttons: false});
            const putResponse = await axios.put(`/api/users/${this.state.id}`, JSON.stringify({
                role: this.state.role,
                is_active: this.state.is_active,
                guild_id: this.state.guild,
            }));
            this.setState({
                ...this.state,
                user: putResponse.data,
            });
            const getResponse = await axios.get('/api/guilds');
            this.state.adminPanel.setState({
                ...this.state.adminPanel.state,
                guilds: getResponse.data,
            });
            swal("Success", `${this.state.username} updated!`, "success");
        } catch (error) {
            swal("Error", error.response.data, "error");
        }
    }

    handleChangePassword = async () => {
        let errors = validatePassword(this.state.password);
        if (errors.length > 0) {
            swal("Error", errors.join('\n'), "error");
            return;
        }
        try {
            await axios.put(`/api/users/${this.state.id}`, JSON.stringify({
                password: this.state.password,
                role: this.state.user.role,
                is_active: this.state.user.is_active,
                guild_id: this.state.user.guild.id,
            }));
            swal("Success", "Password updated.", "success");
        } catch (error) {
            swal("Error", error.response.data, "error");
        }
    }
    
    render() {

        return(
            <div>
                <p>{this.state.username}</p>
                <form className="grid-2">
                    <label htmlFor="password">New Password</label>
                    <input type="password" name="password" placeholder="password" onChange={this.handleChange}/>
                </form>
                <button onClick={this.handleChangePassword}>Change Password</button>
                <br />
                <br />
                <br />
                <form className="grid-2">
                    <label htmlFor="is_active">Account Enabled</label>
                    <input type="checkbox" name="is_active" checked={this.state.is_active} onChange={this.handleCheck}/>
                    <label htmlFor="role">Access Level</label>
                    <select name="role" value={this.state.role} onChange={this.handleChange}>
                        <option value="guest">Guest</option>
                        <option value="verified">Verified</option>
                        <option value="admin">Admin</option>
                        <option value="alliance_member">Alliance Member</option>
                    </select>
                    <label htmlFor="guild">Guild</label>
                    <select name="guild" value={this.state.guild} onChange={this.handleChange}>
                        {this.state.guildList.map(guild => <option key={guild} value={guild.id}>{guild.name}</option>)}
                    </select>
                </form>
                <button onClick={this.handleSubmit}>Update User</button>
            </div>
        );
    }
}

export default Admin;
