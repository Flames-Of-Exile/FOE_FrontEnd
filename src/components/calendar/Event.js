import React, {useState} from 'react';

const axios = require("axios").default;

function Event(props) {
    const [state, setState] = useState({
        Application: props.Application,
        game: props.game,
        name: props.name,
        note: props.note,
        date: props.date,
        id: props.id,
        editor: false,
        edits: {
            game: props.game,
            name: props.name,
            note: props.note,
            date: props.date
        }
    })

    const eventEditor = () => {
        setState({
            ...state,
            editor: true,
            edits:{
                name:state.name,
                game:state.game,
                note:state.note,
                date:state.date,
            }
        })
    }

    const handleEdit = (event) => {
        let edits = state.edits;
        edits[[event.target.name]] = event.target.value;
        setState({
            ...state,
            edits: edits
        })
    }

    const handleDate = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const update = async() => {
        response = await axios.patch(`/api/calendar/${state.id}`, JSON.stringify(edits));
        cancelEdit()
    }

    const cancelEdit = () => {
        setState({
            ...state,
            editor: false
        })
    }

    return (
        <div className='event' onClick={eventEditor}>
            {state.editor ?
            <>
                Name: <input type='text' name='name' value={state.edits.name} onChange={handleEdit}/>
                Game: <input type='text' name='game' value={state.edits.game} onChange={handleEdit}/><br/>
                When: <input type='datetime-local' name='date' value={state.edits.date} onChange={handleDate}/>
                notes: <input type='text' name='note' value={state.edits.note} onChange={handleEdit}/><br/>
                <button onClick={update}>Update</button><button onClick={cancelEdit}>Cancel</button>
            </>
            :
            <>
                <h4 className='banner'>{state.name}</h4>
                <h5>IN: {state.game} AT: {state.date}</h5>
                {state.note}
            </>
            }
        </div>
    )
}

export default Event