import React from "react"
import Pin from './Pin.js'
import NewPin from './NewPin.js'

const axios = require("axios").default

class World extends React.Component {
    constructor(props) {
        super()
        this.state = {
            world: props.world,
            id: props.id,
            newPin: false,
            newPinPosition: [0,0],
            loaded: false,
            uniqueID: 'world' + props.id,
            worldStyle: {
                zindex:0,
                position:'relative',
                width:'70%',
                height:'auto',
            },
            imgStyle: {
                width:'100%',
                height:'auto'
            }
        }
    }

    async componentDidMount() {
        const response = await axios.get(`/api/worlds/${this.state.id}`)
        this.setState({
            ...this.state,
            world: response.data,
            loaded: true,
        })
    }

    async componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.setState({
                ...this.state,
                id:this.props.id,
                loaded: true,
                uniqueID: 'world' + this.props.id
            })
        }

    }

    getWorldLoc() {
        let world = document.getElementById(this.state.uniqueID)
        return world.getBoundingClientRect()
    }

    addNewPin = (e) => {
        var worldLoc = this.getWorldLoc()
        var leftOffsetAbs = e.clientX - worldLoc.left
        var bottomOffsetAbs = worldLoc.bottom - e.clientY
        const leftPercent = (leftOffsetAbs)/(worldLoc.right - worldLoc.left)*100-1.3
        const bottomPercent = (bottomOffsetAbs)/(worldLoc.bottom - worldLoc.top)*100
        const placePin = [leftPercent, bottomPercent]
        this.setState({
            ...this.state,
            newPin: true,
            newPinPosition: placePin
        })
        console.log(this.state.newPinPosition)
        console.log('bottom' +worldLoc.bottom)
        console.log('top ' + worldLoc.top)
        console.log('topoffsetAbs ' + bottomOffsetAbs)
        console.log('click Y loc' + e.clientY)
    }
    
    content() {
        return(
            <div>
                <p>{this.state.world.name}</p>
                <div style={this.state.worldStyle} onClick={this.addNewPin}>
                <img id={this.state.uniqueID} style={this.state.imgStyle}  src={this.state.world.image} alt='World Failed to load you should refresh the application' />
                {console.log(this.state.newPinPosition)}
                {this.state.world.pins.map(point => (
                    <Pin key={point.id.toString()}
                        id = {point.id}
                        x = {point.position_x}
                        y = {point.position_y}
                        symbol = {point.symbol}
                        details = {point.notes}
                        worldName = {this.state.uniqueID}

                    />
                ))}</div>
                {this.state.newPin ? // if a new pin is being made
                    <NewPin position_x={this.state.newPinPosition[0]} 
                            position_y={this.state.newPinPosition[1]}
                            world_id={this.state.id}
                    />
                : null// else
                /*end if new pin is being made*/}
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.loaded ? this.content() : null}
            </div>
        )
    }
}

export default World