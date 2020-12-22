import React, {
    useEffect,
    useState
} from 'react';

import Modal from 'react-model';

import Socket from '../helper_functions/Socket';
const socket = new Socket();

function Event(props) {
    const [state, setState] = useState({
        Application: props.Application
    });

}

export default Event;