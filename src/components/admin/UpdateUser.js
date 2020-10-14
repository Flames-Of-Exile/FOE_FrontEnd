import React from "react"

const axios = require("axios").default

class Admin extends React.Component {
    constructor(props) {
        super()
        this.state = {
            Application: props.Application,
            id: props.match.params.id,
            username: "",
            email: "",
            password: "",
            role: "guest",
            is_active: false,
        }
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`/api/users/${this.state.id}`)
            this.setState({
                ...this.state,
                username: response.data.username,
                email: response.data.email,
                role: response.data.role,
                is_active: response.data.is_active,
            })
        } catch (error) {
            console.log("failed to fetch user -", error.message)
        }
    }

    handleChange = async (event) => this.setState({
        ...this.state,
        [event.target.name]: event.target.value
    })

    handleCheck = async (event) => this.setState({
        ...this.state,
        [event.target.name]: event.target.checked
    })

    handleSubmit = async () => {
        try {
            await axios.put(`/api/users/${this.state.id}`, JSON.stringify({
                password: this.state.password,
                role: this.state.role,
                is_active: this.state.is_active,
                email: this.state.email,
            }))
        } catch (error) {
            console.log("Failed to update user -", error.message)
        }
        
    }
    
    render() {

        return(
            <div>
                <p>{this.state.username}</p>
                <input type="password" name="password" placeholder="password" onChange={this.handleChange}/>
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                <input type="checkbox" name="is_active" checked={this.state.is_active} onChange={this.handleCheck}/>
                <select name="role" value={this.state.role} onChange={this.handleChange}>
                    <option value="guest">Guest</option>
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                </select>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

export default Admin