import React from "react"

import PinDetails from "./PinDetails"

//Function needs a few things to be included in props
// a type that we can add a few different imgs to for different colored pins
// x and y locations
// details    this will be any text notes that should be displayed with the pin
class Pin extends React.Component {
    constructor(props) {
        super()
        this.state = {
            symbol:props.symbol,
            details:props.details,
            id: props.id,
            imgID: 'pinimg' + props.id,
            detailsID: 'pindets' + props.id,
            worldName: props.worldName,
            containerStyle:{
                position:'absolute',
                bottom: props.y + '%',
                left: props.x + '%',
                zindex: 10,
                height:'8.33%',
                width:'2.6%',
            },
            pinStyle:{
                height:'100%',
                width:'100%'

            },
            detailsStyle:{
                backgroundColor: '#000000',
                color: '#ffffff',
                visibility: 'hidden'
            }
        }
        console.log(this.state)
    }

    async componentDidMount() {
        await this.props.x
        this.setState({
            ...this.state,
            id:this.props.id
        })
    }

    setVis = () => this.setState({
        ...this.state,
        detailsStyle: {
            ...this.state.detailsStyle,
            visibility: 'visible'
        }
    })

    setInvis = () => this.setState({
        ...this.state,
        detailsStyle: {
            ...this.state.detailsStyle,
            visibility: 'hidden'
        }
    })
   
    render() {
        return(
            <div style={this.state.containerStyle}>
                <img id={this.state.imgID} src={'/staticfiles/icons/' + this.state.symbol + '.png'} style={this.state.pinStyle} alt='' onMouseEnter={this.setVis} onMouseLeave={this.setInvis}/>
                <PinDetails style={this.state.detailsStyle} details={this.state.details} />
            </div>
        )
    }
}

export default Pin