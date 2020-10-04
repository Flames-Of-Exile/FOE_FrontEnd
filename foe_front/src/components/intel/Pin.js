import React from "react"

//Function needs a few things to be included in props
// a type that we can add a few different imgs to for different colored pins
// x and y locations
// details    this will be any text notes that should be displayed with the pin

function Pin(props) {

    function setVis(event) {
        event.target.style.visibility = 'visible'
    }

    function setInvis(event) {
        event.target.style.visibility = 'hidden'
    }
    
    const symbol = props.symbol
    const x = props.position_x + 'px'
    const y = props.position_y + 'px'
    let pin = document.createElement('div')
    pin.style.position = 'absolute'
    pin.style.top = y
    pin.style.left = x
    document.getElementById("pinholder").appendChild(pin)
    
    let pinPoint = document.createElement('img')
    pinPoint.src = './icons/' + symbol + '.png'
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
        <div id="pinholder" />
    )
}

export default Pin