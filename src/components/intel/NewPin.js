import React from "react";

const axios = require("axios").default;

class NewPin extends React.Component {
    constructor(props) {
        super();
        this.state = {
            Application: props.Application,
            position_x: props.position_x,
            position_y: props.position_y,
            world_id: props.world_id,
            symbol: "stone",
            notes: "",
            name: "",
            rank: 0,
            amount: 0,
            respawn: 0,
            resource: 'granite',
            resourceList: ['Granite','Limestone','Travertine','Slate','Marble']
        };
    }

    handleChange = (event) => this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
    });

    handleSubmit = async () => {
        try {
            await axios.post("/api/pins", JSON.stringify({
                position_x: this.state.position_x,
                position_y: this.state.position_y,
                symbol: this.state.symbol,
                notes: this.state.notes,
                world_id: this.state.world_id,
                name: this.state.name,
                rank: this.state.rank,
                amount: this.state.amount,
                respawn: this.state.respawn,
                resource: this.state.resource
            }));
        } catch (error) {
            console.log("Failed to create pin -", error.message);
        }
    }

    resourceSelector() {
        let symbol = this.state.symbol
        let selectList = ''
        if (symbol in ['stone','sone-motherlode']) {
            selectList = ['Granite','Limestone','Travertine','Slate','Marble']
        }
        else if (symbol in ['ore','ore-motherlode']) {
            selectList = ['Copper', 'Tin', 'Iron', 'Silver', 'Aurelium']
        }
        else if (symbol = 'wood') {
            selectList = ['Yew','Birch','Ash','Oak','Spruce']
        }
        else if (symbol in ['animal', 'animal-boss']) {
            selectList = ['Spider', 'Pig', 'Cat', 'Auroch', 'Elk', 'Wolf']
        }
        else {
            selectList = ['Human', 'Elven', 'Monster', 'Stoneborn', 'Guinecian']
        }
        return selectList
    }


    componentDidUpdate() {
        let selectList = this.resourceSelector()
        if (selectList != this.state.resourceList) {
            this.setState({
                ...this.state,
                resourceList:selectList
        })}
    }
    
    render() {
        return (
            <div>
                <input type="number" name="position_x" value={this.state.position_x} onChange={this.handleChange}/>
                <input type="number" name="position_y" value={this.state.position_y} onChange={this.handleChange}/>
                <select name="symbol" value={this.state.symbol} onChange={this.handleChange}>
                    <option value='stone'>Stone</option>
                    <option value='stone-motherlode'>Stone Motherload</option>
                    <option value='ore'>Ore</option>
                    <option value='ore-motherlode'>Ore Motherload</option>
                    <option value='wood'>Wood</option>
                    <option value='animal'>Animal</option>
                    <option value='animal-boss'>Animal Boss</option>
                    <option value='mob'>Camp</option>
                    <option value='mob-boss'>Boss</option>
                    <option value='well'>Well</option>
                    <option value='grave'>Grave</option>
                    <option value='tactical-fire'>Tactical Fire</option>
                    <option value='tactical-fish'>Tactical Fish</option>
                    <option value='tactical-house'>Tactical House</option>
                </select>
                <select name='resource' value={this.state.symbol} onChange={this.handleChange}>
                    {this.state.resourceList.map(choice => (
                        <option value={choice.toLowerCase()}>{choice}</option>
                    ))}
                </select>
                <input type="text" name="notes" placeholder='notes' onChange={this.handleChange}/>
                <input type="text" name="name" placeholder='name' onChange={this.handleChange}/>
                <input type="number" name="rank" placeholder='rank' onChange={this.handleChange}/>
                <input type="number" name="amount" placeholder='amount' onChange={this.handleChange}/>
                <input type="number" name="respawn" placeholder='respawn' onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default NewPin;
