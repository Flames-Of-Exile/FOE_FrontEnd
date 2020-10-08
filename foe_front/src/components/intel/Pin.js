import React from "react"

//Function needs a few things to be included in props
// a type that we can add a few different imgs to for different colored pins
// x and y locations
// details    this will be any text notes that should be displayed with the pin

class Pin extends React.Component {
    constructor(props) {
        super()
        this.state = {
            position_x:props.x,
            position_y:props.y,
            symbol:null,
            details:props.details,
            loaded: false,
            id:props.id
        }
        console.log(this.state)
    }

    setVis(event) {
        event.target.style.visibility = 'visible'
    }

    setInvis(event) {
        event.target.style.visibility = 'hidden'
    }

    async componentDidMount() {
        await this.props.position_x
        this.setState({
            ...this.state,
            position_x:this.props.x,
            position_y:this.props.y,
            symbol:this.props.symbol,
            details:this.props.details,
            loaded: true,
            id:this.props.id,
            pinStyle:{
                position: 'absolute',
                top: this.state.position_y + 'px',
                left: this.state.position_x + 'px'
            },
            detailsStyle:{
                backgroundColor: '#FFFFFF',
                color: '#000000',
                visibility: 'hidden'
            },

        })
    }


    content() {
        return (
            <div id= {'pin' + this.state.id}>
                {console.log(this.state)}
                <img src= {'./icons/' + this.state.symbol + '.png'} style={this.state.pinStyle}/>
                <div id={toString(this.state.id)} style={this.state.detailsStyle}>{this.state.details}</div>
                {document.getElementById(toString(this.state.id)).addEventListener('mouseover', this.setVis)}
                {document.getElementById(toString(this.state.id)).addEventListener('mouseout', this.setInvis)}
            </div>
        )
    }
    
    render() {
        return(
            <div>
                {this.state.loaded ? this.content() : null}
            </div>
        )
    }
}

export default Pin