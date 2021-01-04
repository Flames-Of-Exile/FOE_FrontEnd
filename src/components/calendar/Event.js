import React, {useState} from 'react';

const axios = require("axios").default;

function Event(props) {
    console.log(props.date);
    const sdate = props.date.split(' ');
    const date = new Date(new Date(sdate[0] + 'T' + sdate[1]).getTime() - new Date().getTimezoneOffset()*60000);
    console.log(date);
    const [state, setState] = useState({
        Application: props.Application,
        game: props.game,
        name: props.name,
        note: props.note,
        date: date,
        id: props.id,
        editor: false,
        active:props.active,
        edits: {
            game: props.game,
            name: props.name,
            note: props.note,
            date: date,
            active: props.active,
            tzoffset: new Date().getTimezoneOffset()
        }
    });

    const noOffsetDate = (date) => {
        const fixedDate = new Date(date.getTime() - new Date().getTimezoneOffset()*60000);
        const sdate = fixedDate.toISOString().split('.');
        return sdate[0];
    };

    const eventEditor = () => {
        setState({
            ...state,
            editor: true,
            edits:{
                name:state.name,
                game:state.game,
                note:state.note,
                date:state.date,
                active:state.active,
            }
        });
    };

    const handleEdit = (event) => {
        event.persist();
        let edits = state.edits;
        edits[[event.target.name]] = event.target.value;
        setState({
            ...state,
            edits: edits
        });
    };

    const handleDate = (event) => {
        event.persist();
        console.log(state.edits.date.toISOString());
        // console.log(new Date().toISOString());
        // console.log(typeof(event.target.value));
        const date = new Date(event.target.value);
        const fixedDate = new Date(date.getTime());
        setState({
            ...state,
            edits: {
                ...state.edits,
                date: fixedDate
            }
        });
        console.log(event.target.value);
        console.log(new Date(event.target.value));
    };

    const handleCheck = (event) => {
        event.persist();
        let edits = state.edits;
        edits[[event.target.name]] = event.target.checked;
        setState({
            ...state,
            edits: edits
                
        });
    };

    const update = async() => {
        let data = state.edits;
        console.log(data.date);
        data.date = new Date(state.edits.date.getTime());
        console.log(data);
        await axios.patch(`/api/calendar/${state.id}`, JSON.stringify(data));
        props.updateEvent();
        setState({
            ...state,
            game: state.edits.game,
            name: state.edits.name,
            note: state.edits.note,
            date: new Date(state.edits.date.getTime()),
            editor: false,
            active: state.edits.active,
        });
    };

    const cancelEdit = () => {
        setState({
            ...state,
            editor: false
        });
    };

    const deleteEvent = async() => {
        await axios.delete('/api/calendar/' + state.id);
        props.updateEvent();
    };


    return (
        <div className='event' >
            {state.editor ?
            <>
                Name: <input type='text' name='name' value={state.edits.name} onChange={handleEdit}/>
                Game: <input type='text' name='game' value={state.edits.game} onChange={handleEdit}/><br/>
                When: <input type='datetime-local' name='date' value={noOffsetDate(state.edits.date)}
                         onChange={handleDate}/>
                Notes: <input type='text' name='note' value={state.edits.note} onChange={handleEdit}/><br/>
                Active:<input type='checkbox' name='active' checked={state.edits.active} onChange={handleCheck}/>
                <button onClick={update}>Update</button><button onClick={cancelEdit}>Cancel</button>
                <button onClick={deleteEvent}>Delete Event</button>
            </>
            :
            <div onClick={eventEditor} style={state.active? {background:'white'}:{background:'#ff4455'}}>
                <h4 className='banner'>{state.name}</h4>
                <p><b>Where:</b> {state.game} &emsp;<b>When:</b> {state.date.toLocaleString()}</p>
                {state.note}<button onClick={deleteEvent}>Delete Event</button>
            </div>
            }
        </div>
    );
}

export default Event;