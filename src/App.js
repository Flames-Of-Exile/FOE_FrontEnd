import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./staticfiles/App.css";

import Campaign from "./components/intel/Campaign";
import NewCampaign from "./components/intel/NewCampaign";
import PinHistory from "./components/intel/PinHistory";
import NewPin from "./components/intel/NewPin";
import World from "./components/intel/World";
import NewWorld from "./components/intel/NewWorld";

import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Register from "./components/auth/Register";

import Home from "./components/Home";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import Theme from "./components/Theme";

import Admin from "./components/admin/Admin";

const axios = require("axios").default;
const url = process.env.REACT_APP_BACKEND || "http://localhost:5000/";
axios.defaults.baseURL = url;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentUser: {},
    };
  }

  componentWillMount() {
    window.addEventListener('storage', this.syncLogout);
    this.refresh(this);
  }

  syncLogout = () => {
    axios.defaults.headers.common["Authorization"] = '';
      this.setState({
        ...this.state,
        currentUser: {},
      });
  }

  async refresh(Application) {
    try {
      const response = await axios.get('/api/users/refresh');
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      Application.setState({
        ...Application.state,
        currentUser: response.data.user,
      });
      setTimeout(Application.refresh, 270000, Application);  // token is good for 5 minutes - refresh every 4 minutes, 30 seconds
    } catch (error) {
      Application.syncLogout();
      console.log("failed to refresh session -", error.message);
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
        <Theme Application={this} />
          <Sidebar Application={this} />
          <Switch>
            <Route exact path="/logout" render={props => <Logout {...props} Application={this} />} />
            {this.state.currentUser.id ? // if a user is logged in 
            <div className="main">
              <Switch>
                {this.state.currentUser.role === "admin" ? // if user is admin
                  <Route path="/admin" render={props => <Admin {...props} Application={this} />} />
                : // else user is not an admin
                  ""
                /*end if user is admin*/}
                <Route exact path="/profile" render={props => <Profile {...props} Application={this} />} />
                <Route exact path="/campaign/new" render={props => <NewCampaign {...props} Application={this} />} />
                <Route exact path="/campaign/:id" render={props => <Campaign {...props} Application={this} />} />
                <Route exact path="/pin/new" render={props => <NewPin {...props} Application={this} />} />
                <Route exact path="/pin/:id" render={props => <PinHistory {...props} Application={this} />} />
                <Route exact path="/world/new" render={props => <NewWorld {...props} Application={this} />} />
                <Route exact path="/world/:id" render={props => <World {...props} Application={this} />} />
                <Route path="/" render={props => <Home {...props} Application={this} />}/>
              </Switch>
            </div>
            : // else user is not logged in
            <div className="main">
              <Switch>
                <Route exact path="/register" render={props => <Register {...props} Application={this} />} />
                <Route path="/" render={props => <Login {...props} Application={this} />} />
              </Switch>
            </div>
            /* end if user is logged in */} 
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
