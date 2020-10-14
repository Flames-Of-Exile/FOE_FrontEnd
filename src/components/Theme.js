import React from 'react'
import ReactDOM from 'react-dom'

function Theme(props) {
    const theme = props.Application.state.currentUser.theme || "default"
    return ReactDOM.createPortal(
        (<link rel="stylesheet" href={`/staticfiles/theme_${theme}.css`} type="text/css"></link>), document.head
    )      
}

export default Theme