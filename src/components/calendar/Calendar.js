import React, {
    useEffect,
    useState
} from 'react';

import Socket from '../helper_functions/Socket';
const socket = new Socket();

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

    return(
        <div>
            {state.events.map( (e, index) => (
                <Event key={index} {...e}/>
            ))}
        </div>
    )
}