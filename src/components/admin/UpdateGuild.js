import React from "react";

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
        } catch (error) {
            alert("failed to update guild access -", error.message);
        }
    }

    handleChange = (event) => this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
    })

    handleSubmit = async () => {
        try {
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
            this.props.history.goBack();
        } catch (error) {
            alert("failed to update guild name -", error.message);
        }
    }

    render() {
        return (
            <div>
                <UserList users={this.state.guild ? this.state.guild.users : []} Application={this.state.Application} />
                <button onClick={this.handleToggle}>{this.state.guild.is_active ? "Disable Access" : "Enable Access"}</button>
                <input type="text" name="guildName" onChange={this.handleChange} />
                <button onClick={this.handleSubmit}>Change Name</button>
            </div>
        );
    }
}


export default UpdateGuild;
