import React, { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from 'react-leaflet';

import swal from "sweetalert";

const axios = require("axios").default;

function NewPin(props) {
    const [state, setState] = useState({
        newPin: false,
        coords: [0,0],

        world_id: props.world_id,
        symbol: "stone",
        notes: "",
        name: "",
        rank: 0,
        amount: 0,
        respawn: 0,
        resource: 'granite',
        resourceList: ['Granite','Limestone','Travertine','Slate','Marble'],
        x_cord: null,
        y_cord: null
    });

    useMapEvents({
        click: (event) => {
            setState({
                ...state,
                newPin: true,
                coords: event.latlng
            });
        }
    });

    function resourceSelector() {
        let symbol = state.symbol;
        let selectList = '';
        if (['stone','stone-motherlode'].includes(symbol)) {
            selectList = ['Granite','Limestone','Travertine','Slate','Marble'];
        }
        else if (['ore','ore-motherlode'].includes(symbol)) {
            selectList = ['Copper', 'Tin', 'Iron', 'Silver', 'Aurelium'];
        }
        else if (symbol === 'wood') {
            selectList = ['Yew','Birch','Ash','Oak','Spruce'];
        }
        else if (['animal', 'animal-boss'].includes(symbol)) {
            selectList = ['Spider', 'Pig', 'Cat', 'Auroch', 'Elk', 'Wolf'];
        }
        else if (['camp', 'boss'].includes(symbol)) {
            selectList = ['NA'];
        }
        else if (symbol === 'grave'){
            selectList = ['Human', 'Elven', 'Monster', 'Stoneborn', 'Guinecian'];
        }
        else {
            selectList = ['NA'];
        }
        return selectList;
    }

    useEffect(() => {
        let selectList = resourceSelector();
        setState({
            ...state,
            resourceList: selectList,
            resource: selectList[0].toLowerCase(),
        });
    }, [state.symbol]);

    const handleChange = (event) => setState({
        ...state,
        [event.target.name]: event.target.value,
    });

    const handleSubmit = async () => {
        try {
            await axios.post("/api/pins", JSON.stringify({
                position_x: state.coords.lng,
                position_y: state.coords.lat,
                symbol: state.symbol,
                notes: state.notes,
                world_id: state.world_id,
                name: state.name,
                rank: state.rank,
                amount: state.amount,
                respawn: state.respawn,
                resource: state.resource,
                x_cord: state.x_cord,
                y_cord: state.y_cord

            }));
            props.socket.send('campaign-update');
            handleCancel();
        } catch (error) {
            swal("Error", error.response.data, "error");
        }
    };

    const handleCancel = () => setState({
        newPin: false,
        coords: [0,0],

        world_id: props.world_id,
        symbol: "stone",
        notes: "",
        name: "",
        rank: 0,
        amount: 0,
        respawn: 0,
        resource: 'granite',
        resourceList: ['Granite','Limestone','Travertine','Slate','Marble'],
        x_cord: null,
        y_cord: null
    });

    const openPopup = (marker) => {
        if (marker) {
            window.setTimeout(() => {
                marker.openPopup();
            });
        }
    };

    if (state.newPin === false) {
        return null;
        
    } else {
        return (
            <div>
               <Marker position={state.coords} ref={openPopup}>
                    <Popup>
                        <input
                            type="text"
                            maxLength="1"
                            name="x_cord"
                            placeholder='X coordinant'
                            value={state.x_cord}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="y_cord"
                            placeholder='Y coordinant'
                            value={state.y_cord}
                            onChange={handleChange}
                        />
                        <select name="symbol" value={state.symbol} onChange={handleChange}>
                            <option value='stone'>Stone</option>
                            <option value='stone-motherlode'>Stone Motherload</option>
                            <option value='ore'>Ore</option>
                            <option value='ore-motherlode'>Ore Motherload</option>
                            <option value='wood'>Wood</option>
                            <option value='animal'>Animal</option>
                            <option value='animal-boss'>Animal Boss</option>
                            <option value='mob'>Camp</option>
                            <option value='mob-boss'>Boss</option>
                            <option value='well'>Well</option>
                            <option value='grave'>Grave</option>
                            <option value='tactical-fire'>Tactical Fire</option>
                            <option value='tactical-fish'>Tactical Fish</option>
                            <option value='tactical-house'>Tactical House</option>
                        </select>
                        <select name='resource' value={state.resource} onChange={handleChange}>
                            {state.resourceList.map(choice => (
                                <option key={choice} value={choice.toLowerCase()}>{choice}</option>
                            ))}
                        </select>
                        <input type="text" name="notes" placeholder='notes' onChange={handleChange}/>
                        <input type="text" name="name" placeholder='name' onChange={handleChange}/>
                        <input type="number" name="rank" placeholder='rank' onChange={handleChange}/>
                        <input type="number" name="amount" placeholder='amount' onChange={handleChange}/>
                        <input type="number" name="respawn" placeholder='respawn' onChange={handleChange}/>
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </Popup>
                </Marker> 
            </div>
        );
    }
}

export default NewPin;
