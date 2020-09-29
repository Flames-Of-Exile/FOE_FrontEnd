import React from "react"

const axios = require("axios").default

class Register extends React.Component {
    constructor(props) {
        super()
        this.state = {
            Application: props.Application,
            username: "",
            password1: "",
            password2: "",
            email: "",
        }
    }

    handleChange = (event) => this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
    })

    handleSubmit = async () => {
        if (this.state.password1 !== this.state.password2) {
            alert("passwords don't match")
            return
        }
        try {
            const response = await axios.post("/api/users", JSON.stringify({
                username: this.state.username,
                password: this.state.password1,
                email: this.state.email
            }))
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
            this.state.Application.setState({
                ...this.state.Application.state,
                currentUser: response.data.user,
            })
        } catch (error) {
            console.log("Failed to register -", error.message)
        }
    }

    
    render() {
        return (
            <div>
                <input type="text" name="username" onChange={this.handleChange}/>
                <input type="password" name="password1" onChange={this.handleChange}/>
                <input type="password" name="password2" onChange={this.handleChange}/>
                <input type="text" name="email" onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

export default Register