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
        <div>
            <p>Thank you for registering, please link your account to discord.</p>
            <p>1. Copy the following token, it is good for 1 hour:</p>
            <textarea ref={textArea} value={state.token} /> <a onClick={handleCopy}>Copy</a>
            <p>2. Please join our <a href="https://discord.gg/HPDCnAn">discord</a>.</p>
            <p>3. Type !register</p>
            <p>4. Follow the instructions given by the bot.</p>
            <a onClick={handleRegenerate}>Regenerate token</a>
        </div>
    );
}

export default Unconfirmed;