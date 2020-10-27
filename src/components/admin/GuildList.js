import React from "react";

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
        try {
            const response = await axios.post('/api/guilds', JSON.stringify({
                name: this.state.guildName,
            }));
            this.setState({
                ...this.state,
                guilds: [...this.state.guilds, response.data]
            });
        } catch (error) {
            alert("failed to create new guild -", error.message);
        }
    }

    render() {
        return(
            <div>
                <div className="user-list">
                    {this.state.guilds.map(guild => <Guild guild={guild} key={guild} Application={this.state.Application}/>)}
                </div>
                <input type="text" name="guildName" onChange={this.handleChange} />
                <button onClick={this.handleSubmit}>Add Guild</button>
            </div>
        );
    }
    
}

export default GuildList;
