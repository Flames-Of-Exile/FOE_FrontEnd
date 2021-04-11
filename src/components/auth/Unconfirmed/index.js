import React, {
    useEffect,
    useRef,
    useState
} from 'react';

const axios = require('axios').default;

function Unconfirmed() {

    const [state, setState] = useState({
        token: "",
    });

    const textArea = useRef(null);

    useEffect(() => {
        async function fetchToken() {
            const response = await axios.get('/api/users/discord-token');
            setState({
                token: response.data.token,
            });
        }
        fetchToken();
    }, []);

    const handleRegenerate = async () => {
        const response = await axios.get('/api/users/discord-token');
        setState({
            token: response.data.token,
        });
    };

    const handleCopy = () => {
        textArea.current.select();
        document.execCommand("copy");
    };

    return (
        <div className="grid-3">
            <p className="column-2">Thank you for registering, please link your account to discord.</p>
            <ol type="1" className="row-2 column-2">
                <li>Copy the following token, it is good for 1 hour:
                    <textarea ref={textArea} value={state.token} /> <a onClick={handleCopy}>Copy</a>
                </li>
                <li>Please join our <a href="https://discord.gg/HPDCnAn">discord</a>.</li>
                <li>Type !register</li>
                <li>Follow the instructions given by the bot.</li>
            </ol>
            <a className="row-3 column-2" onClick={handleRegenerate}>Regenerate token</a>
        </div>
    );
}

export default Unconfirmed;