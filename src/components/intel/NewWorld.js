import React from "react";

import swal from "sweetalert";

const axios = require("axios").default;

class NewWorld extends React.Component {
    constructor(props) {
        super();
        this.state = {
            Application: props.Application,
            name: "",
            file: null,
            filename: "choose a file",
        };
    }

    handleChange = (event) => this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
    });

    handleSelect = (event) => this.setState({
        ...this.state,
        [event.target.name]: event.target.files[0],
        filename: event.target.value.split('\\').pop()
    });

    handleSubmit = async () => {
        if (this.state.name === "") {
            swal("Error", "Please enter the name of the world.", "error");
            return;
        }
        if (this.state.campaign_id < 1) {
            swal("Error", "Please enter the campaign id.", "error");
            return;
        }
        if (this.state.file === null) {
            swal("Error", "Please upload a file.", "error");
            return;
        }
        const formData = new FormData();
        formData.append("file", this.state.file, this.state.file.name);
        formData.append("name", this.state.name);
        formData.append("campaign_id", this.props.campaign.id);
        try {
            let config = { headers: {
                "Content-Type": "multipart/form-data"
            } };
            await axios.post("/api/worlds", formData, config);
            swal("Success", "World created!", "success");
        } catch (error) {
            swal("Error", error.response.data, "error");
        }
    }

    
    render() {
        return (
            <div>
                <br />
                <br />
                <p>Add world to {this.props.campaign.name}</p>
                <input type="text" name="name" placeholder='World Name' onChange={this.handleChange}/>
                <input type="file" name="file" id="file" onChange={this.handleSelect}/>
                <label htmlFor="file">{this.state.filename}</label>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default NewWorld;