import React, { useEffect } from "react";

const axios = require('axios').default;

function Confirm(props) {

    useEffect(() => {
        async function confirmEmail() {
            try {
                const response = axios.get(`/api/users/confirm?token=${props.match.params.token}`)
                console.log(response.data)
                props.history.push('/')
            } catch (error) {
                console.log("failed to confirm email -", error.message);
            }
        }
        confirmEmail();
    }, [])

    return (
        <div>

        </div>
    );
}

export default Confirm;