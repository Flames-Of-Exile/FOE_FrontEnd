import React from "react";
import {
    Switch,
    Route
} from 'react-router-dom';

import swal from "sweetalert";

import GuildList from "./GuildList";
import UpdateGuild from "./UpdateGuild";
import UpdateUser from "./UpdateUser";

const axios = require("axios").default;

class Admin extends React.Component {
    constructor(props) {
        super();
        this.state = {
            Application: props.Application,
            guilds: [],
            loaded: false,
        };
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`/api/guilds`);
            this.setState({
                ...this.state,
                guilds: response.data,
                loaded: true,
            });
        } catch (error) {
            swal("Error", error.response.data, "error");
        }
    }
    
    render() {
        return(
            <div>
                {this.state.loaded ?
                    <Switch>
                        <Route exact path="/admin/guild/:name" render={props => <UpdateGuild {...props}
                                                                                guilds={this.state.guilds}
                                                                                Application={this.state.Application}
                                                                                adminPanel={this} />} />
                        <Route exact path="/admin/guild/user/:id" render={props => <UpdateUser {...props} 
                                                                                    guilds={this.state.guilds}
                                                                                    Application={props.Application}
                                                                                    adminPanel={this} />} />
                        <Route path="/admin" render={props => 
                            <GuildList {...props} guilds={this.state.guilds} Application={this.state.Application} />
                            }/>
                    </Switch>
                :
                    "loading..."
                } 
            </div>
        );
    }
}

export default Admin;
