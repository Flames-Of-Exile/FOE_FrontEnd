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

    // componentDidMount() {
    //     let resource = this.state.resource
    //     let color = 0
    //     if (resource in ['yew','copper','granite','spider','human']) {
    //         color = 52
    //     } 
    //     else if (resource in ['birch', 'tin', 'limestone', 'pig', 'elven']) {
    //         color = 104
    //     }
    //     else if (resource in ['ash', 'iron', 'travertine', 'cat', 'monster']){
    //         color = 156
    //     } 
    //     else if (resource in ['oak', 'silver', 'slate', 'auroch', 'stoneborn']) {
    //         color = 208
    //     } 
    //     else if (resource in ['spruce', 'aurelium', 'marble', 'elk', 'guinecian']) {
    //         color = 260
    //     } 
    //     else if (resource in ['wolf']) {
    //         color = 312
    //     } 
    //     let container = this.state.filter
    //     container.hue= color

    //     this.setState({
    //         ...this.state,
    //         filter: container
    //     })
    // }
   
    render() {
        console.log(this.props.pin)
        return(
            <div className='pin' style={this.state.containerStyle}>
                <img src={'/staticfiles/icons/' + this.state.symbol + '.png'} alt='' onMouseEnter={this.setVis} onMouseLeave={this.setInvis}/>
                <PinDetails visibility={this.state.visibility} details={this.state.details} />
            </div>
        );
    }
}

export default Pin;
