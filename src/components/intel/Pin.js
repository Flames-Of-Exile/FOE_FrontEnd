import React from "react";

import PinDetails from "./PinDetails";

//Function needs a few things to be included in props
// a type that we can add a few different imgs to for different colored pins
// x and y locations
// details    this will be any text notes that should be displayed with the pin
class Pin extends React.Component {
    constructor(props) {
        super();
        this.state = {
            symbol: props.pin.symbol,
            containerStyle:{
                bottom: props.pin.position_y + '%',
                left: props.pin.position_x + '%',
            },

            visibility: 'hidden',
            amount: props.pin.amount,
            id: props.pin.id,
            name: props.pin.name,
            details: props.pin,
            resource: props.pin.resource
        };
    }

    setVis = () => this.setState({
        ...this.state,
        visibility: 'visible',
    });

    setInvis = () => this.setState({
        ...this.state,
        visibility: 'hidden',
    });


   
    render() {
        return(
            <div className='pin' style={this.state.containerStyle}>
                <PinDetails visibility={this.state.visibility} details={this.state.details} />
                <img src={'/staticfiles/icons/' + this.state.symbol + '.png'} color='red' alt='' onMouseEnter={this.setVis} onMouseLeave={this.setInvis}/>
            </div>
        );
    }
}

export default Pin;
