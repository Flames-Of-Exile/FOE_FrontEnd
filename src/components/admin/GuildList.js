import React from "react";

import swal from "sweetalert";

import Guild from "./Guild";

const axios = require('axios').default;

class GuildList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            Application: props.Application,
            guilds: props.guilds,
            guildName: "",
        };
    }

    handleChange = (event) => this.setState({
        ...this.state,
        [event.target.name]: event.target.value
    });

    handleSubmit = async () => {
        if (this.state.guildName === "") {
            swal("Error", "Please enter a guild name.", "error");
            return;
        }
        try {
            swal("Sending...", "Attempting to post the guild...", "info", {buttons: false});
            const response = await axios.post('/api/guilds', JSON.stringify({
                name: this.state.guildName,
            }));
            this.setState({
                ...this.state,
                guilds: [...this.state.guilds, response.data]
            });
            swal("Success", `${this.state.guildName} created!`, "success");
        } catch (error) {
            if (error.response.data.includes(`(name)=(${this.state.guildName}) already exists`)) {
                swal("Error", `Guild with name '${this.state.guildName}' already exists.`, "error");
                return;
            }
            swal("Error", error.response.data, "error");
        }
    }

    render() {
        return(
            <div>
                <div className="user-list">
                    {this.state.guilds.map(guild => <Guild guild={guild} key={guild} Application={this.state.Application}/>)}
                </div>
                <input type="text" name="guildName" placeholder="new guild name" onChange={this.handleChange} />
                <button onClick={this.handleSubmit}>Add Guild</button>
            </div>
        );
    }
    
}

export default GuildList;
