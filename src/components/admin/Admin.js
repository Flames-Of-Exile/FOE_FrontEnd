import React from "react";
import {
    Switch,
    Route
} from 'react-router-dom';

import UserList from "./UserList";
import UpdateUser from "./UpdateUser";

const axios = require("axios").default;

class Admin extends React.Component {
    constructor(props) {
        super();
        this.state = {
            Application: props.Application,
            users: []
        };
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`/api/users`);
            this.setState({
                ...this.state,
                users: response.data,
            });
        } catch (error) {
            console.log("failed to fetch users -", error.message);
        }
    }
    
    render() {
        return(
            <Switch>
                <Route exact path="/admin/user/:id" render={props => <UpdateUser {...props} Application={this.state.Application} />} />
                <Route path="/admin" render={props => <UserList {...props} users={this.state.users} Application={this.state.Application} />} />
            </Switch>
        );
    }
}

export default Admin;
