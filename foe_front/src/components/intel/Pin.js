import React from "react"

function Pin(props) {

    function setVis() {
        details.style.visibility = 'visible'
    }

    function setInvis() {
        details.style.visibility = 'hidden'
    }
    
    const type = props.type
    const x = props.x + 'px'
    const y = props.y + 'px'
    let pin = document.createElement('div')
    pin.style.position = 'absolute'
    pin.style.top = y
    pin.style.left = x
    
    let pinPoint = document.createElement('img')
    pinPoint.src = type + '.jpg'
    pin.appendChild(pinPoint)

    let details = document.createElement('div')
    details.style.backgroundColor('#FFFFFF')
    details.style.color('#000000')
    details.innerHTML = '<p>' + props.details + '</p>'
    details.style.visibility = 'hidden'
    pin.appendChild(details)

    details.addEventListener('mouseover', setVis)
    details.addEventListener('mouseout', setInvis)

    
    return(
        <div>
               {pin}
        </div>
    )
}

export default Pin