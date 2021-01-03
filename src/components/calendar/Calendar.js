import React, {
    useEffect,
    useState,
    
} from 'react';

import NewEvent from "./NewEvent";
import Event from "./Event";
import Socket from '../../helper_functions/Socket';

const axios = require("axios").default;
const socket = new Socket();

function Calendar(props) {
    const [state, setState] = useState({
        Application: props.Application,
        events: [],
        timeZone: new Date().getTimezoneOffset()
    });

    useEffect(() => {
        socket.connect();
        socket.registerListener('calendar-update', handleCalendarUpdate);

        async function getCalendar() {
            const response = await axios.get('/api/calendar');
            let events = response.data;
            if (events !== state.events){
            setState({
                ...state,
                events: events,
                newEventVisible: false,
                eventEditor: false
            });}
        }

        getCalendar();

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        socket.registerListener('calendar-update', handleCalendarUpdate);
    }, [props.match.params]);

    const handleCalendarUpdate = (data) => {
        console.log('handle calendar update data receved');
        setState({
            ...state,
            events: data
        });
    };

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
        });
    };

    const updateCalendar = () => {
        console.log('update calendar socket send');
        socket.send('calendar-update');
    };

    return(
        <div>
            <h1 className='banner'>Upcoming Events</h1>
            {state.events.map( (e, index) => (
                <Event key={index} updateEvent={updateCalendar} {...e}/>
            ))}
            {state.newEventVisible ?
                <NewEvent isOpen={state.newEventVisible} newEvent={updateCalendar} closeNewEvent={closeNewEvent}/>
            :
                <button onClick={newEvent}>Add Event</button>
            }
        </div>
    );
}

export default Calendar;