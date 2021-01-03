import React, {
    useState
} from 'react';

const axios = require("axios").default;

function NewEvent(props) {
    const [state, setState] = useState({
        Application: props.Application,
        name: '',
        game: '',
        date: '',
        notes: '',
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async() => {
        if (state.name === '') {
            alert('Must provide a name for the event');
            return;
        }
        else if (state.game === '') {
            alert('must provide a game for the event');
            return;
        }
        else if (state.date === '') {
            alert('must provide a date and time for the event');
            return;
        }
        else {
            await axios.post("/api/calendar", JSON.stringify({
                name: state.name,
                game: state.game,
                date: new Date(new Date(state.date).getTime() - new Date().getTimezoneOffset()*60000),
                note: state.notes
            }));
                console.log(typeof(state.date));
                console.log(state.date);
                props.newEvent();
                handleCancel();
            }
    };

    const handleClear = () => {
        setState({
            ...state,
            name: '',
            game: '',
            date: '',
            notes: ''
        });
    };

    const handleCancel = () => {
        handleClear();
        props.closeNewEvent();
    };

    return (
        <>
                <h2>New Event</h2>
                <input 
                    type='text' 
                    name='name' 
                    value={state.name} 
                    onChange={handleChange}
                    placeholder='Name'
                /><br/>
                <input
                    type='text'
                    name='game'
                    value={state.game}
                    onChange={handleChange}
                    placeholder='Game'
                /><br/>
                <input 
                    type='datetime-local' 
                    name='date' 
                    value={state.date} 
                    onChange={handleChange}
                /><br/>
                <input
                    type='text'
                    name='notes'
                    value={state.notes}
                    onChange={handleChange}
                    size='150'
                    placeholder='Notes'
                /><br/>
                <button onClick={handleSubmit}>Submit</button><br/>
                <button onClick={handleClear}>Clear</button><br/>
                <button onClick={handleCancel}>Cancel</button>

        </>
    );

}

export default NewEvent;