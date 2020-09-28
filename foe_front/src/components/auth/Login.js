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
            axios.defaults.headers.common["Authentication"] = `Bearer ${response.data.token}`
            this.state.Application.setState({
                ...this.state.Application.state,
                currentUser: response.data.id,
            })
        } catch (error) {
            console.log("Failed to login -", error.message)
        }
    }

    
    render() {
        return (
            <div>
                <input type="text" name="username" onChange={this.handleChange}/>
                <input type="password" name="password" onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

export default Login