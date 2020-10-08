import React from "react"

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
                position: 'relitive',
                top: props.y + 'px',
                left: props.x + 'px',
                zindex: 10
            },
            pinStyle:{
                height:'200px',
                width:'75px'
            },
            detailsStyle:{
                backgroundColor: '#FFFFFF',
                color: '#000000',
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

    setVis() {
        console.log(this.state.uniqueId)
        document.getElementById(this.state.detailsID).visibility = 'visible'
    }

    setInvis() {
        document.getElementById(this.state.detailsID).visibility = 'hidden'
    }
   
    render() {
        return(
            <div style={this.state.containerStyle}>
                <img id={this.state.imgID} src={'/icons/' + this.state.symbol + '.png'} style={this.state.pinStyle} alt=''/>
                <div id={this.state.detailsID} style={this.state.detailsStyle}>{this.state.details}</div>
                {/* {document.getElementById(this.state.imgID).addEventListener('onMouseOver', this.setVis)}
                {document.getElementById(this.state.imgID).addEventListener('onMouseOut', this.setInvis)} */}
            </div>
        )
    }
}

export default Pin