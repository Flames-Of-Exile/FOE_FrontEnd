import React from "react";

import swal from "sweetalert";

const axios = require("axios").default;

class NewCampaign extends React.Component {
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
        const formData = new FormData();
        if (this.state.file === null) {
            swal("Error", "Please select an image to upload.", "error");
            return;
        }
        if (this.state.name === "") {
            swal("Error", "Please enter the name of the campaign.", "error");
            return;
        }
        formData.append("file", this.state.file, this.state.file.name);
        formData.append("name", this.state.name);
        formData.append("is_default", true);
        try {
            let config = { headers: {
                "Content-Type": "multipart/form-data"
            } };
            await axios.post("/api/campaigns", formData, config);
            swal("Success", "Campaign posted!", "success");
        } catch (error) {
            if (error.response.data.includes('violates unique constraint "campaigns_image_key"')) {
                swal("Error", "A file with that name has already been uploaded.", "error");
                return;
            }
            swal("Error", error.response.data, "error");
        }
    }

    
    render() {
        return (
            <div>
                <input type="text" name="name" placeholder="campaign name" onChange={this.handleChange}/>
                <input type="file" name="file" id="file" onChange={this.handleSelect}/>
                <label htmlFor="file">{this.state.filename}</label>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default NewCampaign;
