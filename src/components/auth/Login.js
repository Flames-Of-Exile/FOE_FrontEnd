import React from "react"

const axios = require("axios").default

class Login extends React.Component {
    constructor(props) {
        super()
        this.state = {
            Application: props.Application,
            username: "",
            password: "",
        }
    }

    handleChange = (event) => this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
    })

    handleSubmit = async () => {
        try {
            const response = await axios.post("/api/users/login", JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }))
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
            this.state.Application.setState({
                ...this.state.Application.state,
                currentUser: response.data.user,
            })
            setTimeout(this.state.Application.refresh, 27000, this.state.Application)
        } catch (error) {
            console.log("Failed to login -", error.message)
        }
    }

    keyDown = (e) => {
        if(e.key === 'Enter') {
            this.handleSubmit()
        }
    }

    
    render() {
        return (
            <div>
                <input type="text" name="username" placeholder='username' onChange={this.handleChange} onKeyDown={this.keyDown}/>
                <input type="password" name="password" placeholder='password' onChange={this.handleChange} onKeyDown={this.keyDown}/>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

export default Login