import React from "react"

const axios = require("axios").default

class NewWorld extends React.Component {
    constructor(props) {
        super()
        this.state = {
            Application: props.Application,
            name: "",
            file: null,
            campaign_id: 0,
        }
    }

    handleChange = (event) => this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
    })

    handleSelect = (event) => this.setState({
        ...this.state,
        [event.target.name]: event.target.files[0],
    })

    handleSubmit = async () => {
        const formData = new FormData()
        formData.append("file", this.state.file, this.state.file.name)
        formData.append("name", this.state.name)
        formData.append("campaign_id", this.state.campaign_id)
        try {
            let config = { headers: {
                "Content-Type": "multipart/form-data"
            } }
            const response = await axios.post("/api/worlds", formData, config)
            console.log(response)
        } catch (error) {
            console.log("Failed to create world -", error.message)
        }
    }

    
    render() {
        return (
            <div>
                <input type="text" name="name" onChange={this.handleChange}/>
                <input type="number" name="campaign_id" onChange={this.handleChange}/>
                <input type="file" name="file" onChange={this.handleSelect}/>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

export default NewWorld