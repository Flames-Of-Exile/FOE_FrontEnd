import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import "./staticfiles/App.css"

import Campaign from "./components/intel/Campaign"
import NewCampaign from "./components/intel/NewCampaign"
import PinHistory from "./components/intel/PinHistory"
import World from "./components/intel/World"

import Login from "./components/auth/Login"
import Logout from "./components/auth/Logout"

import Home from "./components/Home"
import Sidebar from "./components/Sidebar"

const axios = require("axios").default
const url = process.env.REACT_APP_BACKEND || "http://localhost:5000/"
axios.defaults.baseURL = url
axios.defaults.headers.post["Content-Type"] = "application/json"
axios.defaults.headers.put["Content-Type"] = "application/json"
axios.defaults.headers.patch["Content-Type"] = "application/json"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentUser: null,
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Sidebar Application={this} />

          <Switch>
            <Route exact path="/logout" render={props => <Logout {...props} Application={this} />} />
            {this.state.currentUser ? // if a user is logged in 
            <div className="main">
              <Switch>
                <Route exact path="/" render={props => <Home {...props} Application={this} />}/>
                <Route exact path="/campaign/new" render={props => <NewCampaign {...props} Application={this} />}/>
                <Route exact path="/campaign/:id" render={props => <Campaign {...props} Application={this} />}/>
                <Route exact path="/pin/:id" render={props => <PinHistory {...props} Application={this} />}/>
                <Route exact path="/world/:id" render={props => <World {...props} Application={this} />}/>
              </Switch>
            </div>
            : // else user is not logged in
            <div className="main">
              <Switch>
                <Route path="/" render={props => <Login {...props} Application={this} />} />
              </Switch>
            </div>
            /* end if user is logged in */} 
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
