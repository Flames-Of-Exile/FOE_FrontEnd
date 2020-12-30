import React, {
    useEffect,
    useState,
    
} from 'react';

import NewEvent from "./NewEvent";
import Event from "./Event"

import Socket from '../../helper_functions/Socket';
const axios = require("axios").default;

function Calendar(props) {
    const [state, setState] = useState({
        Application: props.Application,
        events: []
    })

    useEffect(() => {

        async function getCalendar() {
            const response = await axios.get('/api/calendar');
            let events = response.data;
            if (events !== state.events){
            setState({
                ...state,
                events: events,
                newEventVisible: false,
                eventEditor: false
            })}
        }

        getCalendar();
    }, []);

    const handleCalendarUpdate = (data) => {
        let events = data;
        setState({
            ...state,
            events: events
        })
    }

    const newEvent = () => {
        setState({
            ...state,
            newEventVisible: true
        });
    };

    const closeNewEvent = () => {
        setState({
            ...state,
            newEventVisible: false
        })
    }

    return(
        <div>
            <h1 className='banner'>Upcoming Events</h1>
            {state.events.map( (e, index) => (
                <Event key={index} {...e}/>
            ))}
            {state.newEventVisible ?
                <NewEvent isOpen={state.newEventVisible} closeNewEvent={closeNewEvent}/>
            :
                <button onClick={newEvent}>Add Event</button>
            }
        </div>
    )
}

export default Calendar;