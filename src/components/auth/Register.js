import React from "react";

import swal from "sweetalert";

import validatePassword from "../../helper_functions/ValidatePassword";

const axios = require("axios").default;

class Register extends React.Component {
    constructor(props) {
        super();
        this.state = {
            Application: props.Application,
            username: "",
            password1: "",
            password2: "",
            guild: "",
            guildList: [],
            currentMember: false,
            interestedGames: '',
            ingameName: '',
            referral: '',
            hours: '',
            timeOfPlay: '',
            perferedRoles: [],
            willingFillNeededRoles: false,
            considerElite: false,
            pvpComfort: 0,
            whyApply: '',
            other: '',
            preferedRolesSupport: false,
            preferedRolesControl: false,
            preferedRolesShotrDPS: false,
            preferedRolesLongDPS: false,
            preferedRolesScouting: false,
            preferedRolesHarvesting: false,
        };
    }

    async componentDidMount() {
        const response = await axios.get("/api/guilds");
        this.setState({
            ...this.state,
            guildList: response.data,
            guild: response.data[0].id,
        });
    }

    handleChange = (event) => this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
    });

    handleRadioTrue = (event) =>{
        this.setState({
            ...this.state,
            [event.target.name]: true
    })}

    handleRadioFalse = (event) =>{
        this.setState({
            ...this.state,
            [event.target.name]: false
    })}

    handleCheckbox = (event) =>{
        if (this.state[event.target.name] == true){
            this.setState({
                ...this.state,
                [event.target.name]: false
            })
        }else {
            this.setState({
                ...this.state,
                [event.target.name]: true
            })
        }
    }

    handleSubmit = async () => {
        if (this.state.username === "") {
            swal("Error", "Please enter a username.", "error");
            return;
        }
        if (this.state.password1 !== this.state.password2) {
            swal("Error", "Passwords don't match.", "error");
            return;
        }
        let errors = validatePassword(this.state.password1);
        if (errors.length > 0) {
            swal("Error", errors.join('\n'), "error");
            return;
        }
        try {
            const response = await axios.post("/api/users", JSON.stringify({
                username: this.state.username,
                password: this.state.password1,
                guild_id: this.state.guild,
            }));
            if (this.state.currentMember == false){
                await axios.post("/bot/application", JSON.stringify({
                    interestedGames: this.state.interestedGames,
                    ingameName: this.state.ingameName,
                    referral: this.state.referral,
                    hours: this.state.hours,
                    timeOfPlay: this.state.timeOfPlay,
                    perferedRoles: this.state.perferedRoles,
                    willingFillNeededRoles: this.state.willingFillNeededRoles,
                    considerElite: this.state.considerElite,
                    pvpComfort: this.state.pvpComfort,
                    whyApply: this.state.whyApply,
                    other: this.state.other,
                    preferedRolesSupport: this.state.preferedRolesSupport,
                    preferedRolesControl: this.state.preferedRolesControl,
                    preferedRolesShotrDPS: this.state.preferedRolesShotrDPS,
                    preferedRolesLongDPS: this.state.preferedRolesLongDPS,
                    preferedRolesScouting: this.state.preferedRolesScouting,
                    preferedRolesHarvesting: this.state.preferedRolesHarvesting,
                }))
            }

            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
            this.state.Application.setState({
                ...this.state.Application.state,
                currentUser: response.data.user,
            });
            setTimeout(this.state.Application.refresh, 27000, this.state.Application);
        } catch (error) {
            if (error.response.data.includes(`(${this.state.username}) already exists`)) {
                swal("Error", "Username already taken, please try another.", "error");
                return;
            }
            swal("Error", error.response.data, "error");
        }
    }

    
    render() {
        return (
            <div>
                <div className="grid-3">
                    <span className="column-1-3">Password must meet the following requirements:</span>
                    <ul className="row-2 column-2">
                        <li>At least 8 characters in length</li>
                        <li>At least 1 uppercase character</li>
                        <li>At least 1 lowercase character</li>
                        <li>At least 1 number</li>
                        <li>At least 1 symbol</li>
                    </ul>
                </div>
                <br />
                <form className="grid-2">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder='user name' onChange={this.handleChange}/>
                    <label htmlFor="password1">Password</label>
                    <input type="password" name="password1" placeholder='password' onChange={this.handleChange}/>
                    <label htmlFor="password2">Retype Password</label>
                    <input type="password" name="password2" placeholder='retype password' onChange={this.handleChange}/>
                    <br/>
                    </form>
                    <label htmlFor='currentMember'>Are you currently a member of Flames of Exile or one of our Allied Guilds?</label>
                    <br/>
                    <input type='radio' name='currentMember' value={true} onClick={this.handleRadioTrue}/> Yes
                    <input type='radio' name='currentMember' value={false} onClick={this.handleRadioFalse}/>No
                    {this.state.currentMember ? 
                    <><br/>
                    <label htmlFor="guild">Which Guild are you a member of?</label>
                    <select name="guild" onChange={this.handleChange} value={this.state.guild}>
                        {this.state.guildList.map(guild => <option key={guild} value={guild.id}>{guild.name}</option>)}
                    </select>
                    </>
                    : 
                    <>
                    <p>
                    Thanks for applying to FOEX.
                    Please fill out this short recruitment form as accurately as you can and submit it.
                    You can return to this page to check the status of your application and any comments from FOEX Officers or recruiters during the recruiting process.
                    You will be notified on Discord after your application is accepted or denied.
                    After submitting this application please make sure you have registered your Discord with us so we are able to reach you.<br/><br/>
                    Remember, there are no wrong answers, and no answer will constitute an automatic denial. Just be as honest as posible.
                    </p><br/><br/>
                        <label htmlFor='interestedGames'>What game or games are you interested in playing with us?</label><br/>
                        <textarea name='interestedGames'rows='5' cols='75' value={this.state.interestedGames} onChange={this.handleChange}/><br/><br/>
                        <label htmlFor='ingameName'>What is you current or planned ingame name?</label><br/>
                        <textarea name='ingameName'rows='5' cols='75' value={this.state.ingameName} onChange={this.handleChange}/><br/><br/>
                        <label htmlFor='referral'>Were you referred by an existing guild member? if so please tell us who</label><br/>
                        <textarea name='referral'rows='5' cols='75' value={this.state.referral} onChange={this.handleChange}/><br/><br/>
                        <label htmlFor='hours'>How many hours a week do you usually play MMOs?</label><br/>
                        <textarea name='hours'rows='5' cols='75' value={this.state.hours} onChange={this.handleChange}/><br/><br/>
                        <label htmlFor='timeOfPlay'>What time zone and time of day do you currently play in?</label><br/>
                        <textarea name='timeOfPlay'rows='5' cols='75' value={this.state.timeOfPlay} onChange={this.handleChange}/><br/><br/>
                        <label htmlFor='preferedRoles'>Please select which roles you prefer to fill in a group based environment. (please select all that apply)</label><br/>
                        <input type='checkbox' name='preferedRolesSupport' onClick={this.handleCheckbox}/>Combat Support (including Healing and Buffing<br/>
                        <input type='checkbox' name='preferedRolesControl' onClick={this.handleCheckbox}/>Combat Control (including CC and Area Denial)<br/>
                        <input type='checkbox' name='preferedRolesShotrDPS' onClick={this.handleCheckbox}/>Short Range Combat DPS (Melee or short ranged firearms, depending on game)<br/>
                        <input type='checkbox' name='preferedRolesLongDPS' onClick={this.handleCheckbox}/>Long Range Combat DPS<br/>
                        <input type='checkbox' name='preferedRolesScouting' onClick={this.handleCheckbox}/>Scouting<br/>
                        <input type='checkbox' name='preferedRolesHarvesting' onClick={this.handleCheckbox}/>Resourcing and Production (Mining, harvesting, crafting, etc.)<br/><br/>
                        <label htmlFor='willingFillNeededRoles'>Are you willing, if requested, to roll specific characters or train specific
                                                                skills if requested by the guild for the purpose of filling gaps in group 
                                                                composition or crafting availability?</label><br/>
                        <input type='radio' name='willingFillNeededRoles' value={true} onClick={this.handleRadioTrue}/>Yes
                        <input type='radio' name='willingFillNeededRoles' value={false} onClick={this.handleRadioFalse}/>No<br/><br/>
                        <label htmlFor='considerElite'>Would you describe yourself as an "Elite Gamer?"</label><br/>
                        <input type='radio' name='considerElite' value={true} onClick={this.handleRadioTrue}/>Yes
                        <input type='radio' name='considerElite' value={false} onClick={this.handleRadioFalse}/>No<br/><br/>
                        <label htmlFor='pvpComfort'>on a scale of 0 to 5 with 0 being the lowest, how comfortable are you with PvP?</label><br/>
                        <input type='range' name='pvpComfort'value={this.state.pvpComfort} onChange={this.handleChange}/><br/><br/>
                        <label htmlFor='whyApply'>What made you want to apply to Flames of Exile, and why do you think you'd be a good fit for our guild?</label><br/>
                        <textarea name='whyApply'rows='5' cols='75' value={this.state.whyApply} onChange={this.handleChange}/><br/><br/>
                        <label htmlFor='other'>Finally, is there anything else you would like to tell us about yourself?</label><br/>
                        <textarea name='other'rows='5' cols='75' onChange={this.handleChange}/><br/>
                    </>
                    }


                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default Register;
