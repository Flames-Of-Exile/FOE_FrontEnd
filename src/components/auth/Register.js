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
            inGameName: '',
            referral: '',
            hours: '',
            timeOfPlay: '',
            preferredRoles: [],
            willingFillNeededRoles: false,
            considerElite: false,
            pvpComfort: 0,
            whyApply: '',
            other: '',
            preferedRolesSupport: false,
            preferedRolesControl: false,
            preferedRolesShortDPS: false,
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

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        });
    }

    handleRadioChange = (event) =>{
            this.setState({
                ...this.state,
                [event.target.name]: Boolean(Number(event.target.value))
        });
    }

    handleCheckbox = (event) =>{
        if (this.state[event.target.name] == true){
            this.setState({
                ...this.state,
                [event.target.name]: false
            });
        }else {
            this.setState({
                ...this.state,
                [event.target.name]: true
            });
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
                currentMember: this.state.currentMember,
                interestedGames: this.state.interestedGames,
                inGameName: this.state.inGameName,
                referral: this.state.referral,
                hours: this.state.hours,
                timeOfPlay: this.state.timeOfPlay,
                preferredRoles: this.state.preferredRoles,
                willingFillNeededRoles: this.state.willingFillNeededRoles,
                considerElite: this.state.considerElite,
                pvpComfort: this.state.pvpComfort,
                whyApply: this.state.whyApply,
                other: this.state.other,
                preferedRolesSupport: this.state.preferedRolesSupport,
                preferedRolesControl: this.state.preferedRolesControl,
                preferedRolesShortDPS: this.state.preferedRolesShortDPS,
                preferedRolesLongDPS: this.state.preferedRolesLongDPS,
                preferedRolesScouting: this.state.preferedRolesScouting,
                preferedRolesHarvesting: this.state.preferedRolesHarvesting,
            }));

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
                    <label htmlFor='currentMember'>
                        Are you currently a member of Flames of Exile or one of our Allied Guilds?
                    </label>
                    <br/>
                    <div onChange={this.handleRadioChange}>
                        <input type='radio' name='currentMember' value={1}/> Yes
                        <input type='radio' name='currentMember' value={0}/>No
                    </div>
                    {(this.state.currentMember===true) ? 
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
                    You can return to this page to check the status of your application and any comments
                     from FOEX Officers or recruiters during the recruiting process.
                    You will be notified on Discord after your application is accepted or denied.
                    After submitting this application please make sure you have 
                    registered your Discord with us so we are able to reach you.
                    <br/><br/>
                    Remember, there are no wrong answers, and no answer will constitute an automatic denial. 
                    Just be as honest as posible.
                    </p><br/><br/>
                        <h4 htmlFor='interestedGames'>What game or games are you interested in playing with us?</h4><br/>
                        <textarea name='interestedGames'rows='5' cols='75' 
                                  value={this.state.interestedGames} 
                                  onChange={this.handleChange}/>
                        <br/><br/>
                        <h4 htmlFor='inGameName'>
                            What is you current or planned ingame name?
                        </h4><br/>
                        <textarea name='inGameName'rows='5' cols='75' 
                                  value={this.state.inGameName} 
                                  onChange={this.handleChange}/><br/><br/>
                        <h4 htmlFor='referral'>
                            Were you referred by an existing guild member? if so please tell us who
                        </h4><br/>
                        <textarea name='referral'rows='5' cols='75' 
                                  value={this.state.referral} 
                                  onChange={this.handleChange}/><br/><br/>
                        <h4 htmlFor='hours'>
                            How many hours a week do you usually play MMOs?
                        </h4><br/>
                        <textarea name='hours'rows='5' cols='75' 
                                  value={this.state.hours} 
                                  onChange={this.handleChange}/><br/><br/>
                        <h4 htmlFor='timeOfPlay'>
                            What time zone are you in and what time of day do you currently play?
                        </h4><br/>
                        <textarea name='timeOfPlay'rows='5' cols='75' 
                                  value={this.state.timeOfPlay} 
                                  onChange={this.handleChange}/><br/><br/>
                        <h4 htmlFor='preferedRoles'>
                            Please select which roles you prefer to fill in a group based environment. 
                            (please select all that apply)
                        </h4><br/>
                        <table>
                            <colgroup>
                                <col width="30%"/>
                                <col width="60%"/>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td align="right">
                                        <input type='checkbox' 
                                               name='preferedRolesSupport' 
                                               onClick={this.handleCheckbox}/>
                                    </td>
                                    <td align="left">
                                        Combat Support (including Healing and Buffing)
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right">
                                        <input type='checkbox' 
                                               name='preferedRolesControl' 
                                               onClick={this.handleCheckbox}/>
                                    </td>
                                    <td align="left">
                                        Combat Control (including CC and Area Denial)<br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right">
                                        <input type='checkbox' 
                                               name='preferedRolesShortDPS' 
                                               onClick={this.handleCheckbox}/>
                                    </td>
                                    <td align="left">
                                        Short Range Combat DPS 
                                        (Melee or short ranged firearms, depending on game)<br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right">
                                        <input type='checkbox' 
                                               name='preferedRolesLongDPS' 
                                               onClick={this.handleCheckbox}/>
                                    </td>
                                    <td align="left">
                                        Long Range Combat DPS<br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right">
                                        <input type='checkbox' 
                                               name='preferedRolesScouting' 
                                               onClick={this.handleCheckbox}/>
                                    </td>
                                    <td align="left">
                                        Scouting<br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right">
                                        <input type='checkbox' 
                                               name='preferedRolesHarvesting' 
                                               onClick={this.handleCheckbox}/>
                                    </td>
                                    <td align="left">
                                        Resourcing and Production 
                                        (Mining, harvesting, crafting, etc.)
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <h4 htmlFor='willingFillNeededRoles'><br/>
                                            Are you willing, if requested, to roll specific characters or train specific
                                            skills if requested by the guild for the purpose of filling gaps in group 
                                            composition or crafting availability?
                                        </h4><br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <div onChange={this.handleRadioChange}>
                                            <input type='radio' 
                                                name='willingFillNeededRoles' 
                                                value={1}
                                                />Yes
                                            <input type='radio' 
                                                name='willingFillNeededRoles' 
                                                value={0} 
                                                />No
                                        </div>
                                        <br/><br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <h4 htmlFor='considerElite'>
                                            Would you describe yourself as an &quot;Elite Gamer?&quot;
                                        </h4><br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <div onChange={this.handleRadioChange}>
                                            <input type='radio' 
                                                name='considerElite' 
                                                value={1} 
                                                />Yes
                                            <input type='radio' 
                                                name='considerElite' 
                                                value={0}
                                                />No
                                        </div>
                                        <br/><br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <h4 htmlFor='pvpComfort'>
                                            How comfortable are you with PvP?
                                        </h4><br/>
                                        Not at All
                                        <input type='range' 
                                               name='pvpComfort' 
                                               value={this.state.pvpComfort} 
                                               onChange={this.handleChange}/>
                                        Very<br/><br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <h4 htmlFor='whyApply'>
                                            What made you want to apply to Flames of Exile, 
                                            and why do you think you&apos;d be a good fit for our guild?
                                        </h4><br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <textarea name='whyApply'rows='5' cols='75' 
                                                  value={this.state.whyApply} 
                                                  onChange={this.handleChange}/><br/><br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <h4 htmlFor='other'>
                                            Finally, is there anything else you would like to tell us about yourself?
                                        </h4><br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <textarea name='other'rows='5' cols='75' 
                                                  onChange={this.handleChange}/><br/>
                                    </td>
                                </tr>
                    </tbody></table>
                    </>
                    }


                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default Register;
