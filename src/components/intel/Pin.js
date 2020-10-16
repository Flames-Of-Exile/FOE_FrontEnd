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
            symbol: props.symbol,
            details: props.details,
            containerStyle:{
                bottom: props.y + '%',
                left: props.x + '%',
            },
            visibility: 'hidden'
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
                <img src={'/staticfiles/icons/' + this.state.symbol + '.png'} alt='' onMouseEnter={this.setVis} onMouseLeave={this.setInvis}/>
                <PinDetails visibility={this.state.visibility} details={this.state.details} />
            </div>
        );
    }
}

export default Pin;
