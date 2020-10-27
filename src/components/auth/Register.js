import React from "react";

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
        if (this.state.password1 !== this.state.password2) {
            alert("passwords don't match");
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
            alert("Failed to register -", error.message);
        }
    }

    
    render() {
        return (
            <div>
                <input type="text" name="username" placeholder='user name' onChange={this.handleChange}/>
                <input type="password" name="password1" placeholder='password' onChange={this.handleChange}/>
                <input type="password" name="password2" placeholder='retype password' onChange={this.handleChange}/>
                <select name="guild" onChange={this.handleChange} value={this.state.guild}>
                    {this.state.guildList.map(guild => <option key={guild} value={guild.id}>{guild.name}</option>)}
                </select>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default Register;
