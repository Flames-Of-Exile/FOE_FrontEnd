import React from "react";

import swal from "sweetalert";

import UserList from "./UserList";

const axios = require('axios').default;


class UpdateGuild extends React.Component {
    constructor(props) {
        super();
        let this_guild = props.guilds.filter(guild => guild.name === props.match.params.name)[0];
        this.state = {
            Application: props.Application,
            adminPanel: props.adminPanel,
            guild: this_guild,
            guildName: "",
        };
    }

    handleToggle = async () => {
        try {
            const patchResponse = await axios.patch(`/api/guilds/${this.state.guild.id}`, JSON.stringify({
                "name": this.state.guild.name,
                "is_active": !this.state.guild.is_active
            }));
            this.setState({
                ...this.state,
                guild: patchResponse.data,
            });
            const getResponse = await axios.get("/api/guilds");
            this.state.adminPanel.setState({
                ...this.state.adminPanel.state,
                guilds: getResponse.data,
            });
            let access = this.state.guild.is_active ? "enabled" : "disabled";
            swal("Success", `Access for '${this.state.guild.name}' ${access}.`, "success");
        } catch (error) {
            swal("Error", error.response.data, "error");
        }
    }

    handleChange = (event) => this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
    })

    handleSubmit = async () => {
        if (this.state.guildName === "") {
            swal("Error", "Please enter a name.", "error");
            return;
        }
        try {
            swal("Sending...", "Attempting to update the guild...", "info", {buttons: false});
            const patchResponse = await axios.patch(`/api/guilds/${this.state.guild.id}`, JSON.stringify({
                "name": this.state.guildName,
                "is_active": this.state.guild.is_active
            }));
            this.setState({
                ...this.state,
                guild: patchResponse.data,
            });
            const getResponse = await axios.get("/api/guilds");
            await this.state.adminPanel.setState({
                ...this.state.adminPanel.state,
                guilds: getResponse.data,
            });
            swal("Success", `${this.state.guildName} updated!`, "success");
            this.props.history.goBack();
        } catch (error) {
            if (error.response.data.includes(`(name)=(${this.state.guildName}) already exists`)) {
                swal("Error", `Guild with name '${this.state.guildName}' already exists.`, "error");
                return;
            }
            swal("Error", error.response.data, "error");
        }
    }

    render() {
        return (
            <div>
                {this.state.guild.name}
                <UserList users={this.state.guild ? this.state.guild.users : []} Application={this.state.Application} />
                <button onClick={this.handleToggle}>{this.state.guild.is_active ? "Disable Access" : "Enable Access"}</button>
                <br />
                <br />
                <input type="text" name="guildName" placeholder="new guild name" onChange={this.handleChange} />
                <button onClick={this.handleSubmit}>Change Name</button>
            </div>
        );
    }
}


export default UpdateGuild;
