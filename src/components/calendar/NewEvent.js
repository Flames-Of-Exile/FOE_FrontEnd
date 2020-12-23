import React, {
    useState
} from 'react';

import Modal from 'react-modal';

const axios = require("axios").default;

function NewEvent(props) {
    const [state, setState] = useState({
        Application: props.Application,
        name: '',
        game: '',
        when: '',
        notes: '',
    });

    const modalFormating = {
        content: {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }}

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async() => {
        if (state.name === '') {
            alert('Must provide a name for the event')
            return
        }
        else if (state.game === '') {
            alert('must provide a game for the event')
            return
        }
        else if (state.when === '') {
            alert('must provide a date and time for the event')
            return
        }
        else {
            console.log(state)
            let responce = await axios.post("/api/calendar", JSON.stringify({
                name: state.name,
                game: state.game,
                when: state.when,
                note: state.notes
            }))
                handleCancel()
            }
    }

    const handleClear = () => {
        setState({
            ...state,
            name: '',
            game: '',
            when: '',
            notes: ''
        });
    };

    const handleCancel = () => {
        handleClear();
        props.closeNewEvent();
    }

    return (
        <>
            <Modal isOpen={props.isOpen} style={modalFormating}>
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
                    name='when' 
                    value={state.when} 
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
            </Modal>

        </>
    )

}

export default NewEvent;