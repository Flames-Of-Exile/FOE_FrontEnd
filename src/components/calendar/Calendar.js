import React, {
    useEffect,
    useState
} from 'react';

import Event from "./Event";

import Socket from '../../helper_functions/Socket';
const socket = new Socket();
const axios = require("axios").default;

function Calendar(props) {
    const [state, setState] = useState({
        Application: props.Application
    })

    useEffect(() => {
        socket.connect();
        socket.registerListener('calendar-update', handleCalendarUpdate)

        async function getCalendar() {
            const response = await axios.get('/api/calendar');
            let events = response.data;
            setState({
                ...state,
                events: events
            })
        }

        getCalendar();

        return () => {
            socket.disconnect();
        }
    })

    const handleCalendarUpdate = (data) => {
        let events = data;
        setState({
            ...state,
            events: events
        })
    }

    const newEvent = () => {

    }

    return(
        <div>
            <h1>Upcoming Events</h1>
            {state.events.map( (e, index) => (
                <Event key={index} {...e}/>
            ))}
            <button onClick={newEvent}>Add Event</button>
        </div>
    )
}

export default Calendar;