import React, { useEffect, useState } from "react";
import ReactTooltip from 'react-tooltip';
import swal from "sweetalert";

const axios = require("axios").default;

function PinUpdate(props) {
    const [state, setState] = useState({
        symbol: props.pin.symbol,
        notes: props.pin.notes,
        name: props.pin.name,
        rank: props.pin.rank,
        amount: props.pin.amount,
        respawn: props.pin.respawn,
        resource: props.pin.resource,
        resourceList: resourceSelector(props.pin.symbol),
        x_cord: props.pin.x_cord,
        y_cord: props.pin.y_cord
    });

    function resourceSelector(symbol) {
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
            selectList = ['Spider', 'Pig', 'Cat', 'Auroch', 'Elk', 'Wolf', 'Bear', 'Gryphon'];
        }
        else if (['mob', 'mob-boss'].includes(symbol)) {
            selectList = ['Urgu', 'Elementals', 'Satyr', 'Aracoix', 'Underhill', 'Enbarri', 'Thralls'];
        }
        else if (symbol === 'grave'){
            selectList = ['Human', 'Elven', 'Monster', 'Stoneborn', 'Guinecian'];
        }
        else {
            selectList = [];
        }
        return selectList;
    }

    useEffect(() => {
        let selectList = ['na'];
        selectList = selectList.concat(resourceSelector(state.symbol));
        setState({
            ...state,
            resourceList: selectList,
        });
    }, [state.symbol]);

    const handleChange = (event) => setState({
        ...state,
        [event.target.name]: event.target.value,
    });

    const handleSubmit = async () => {
        try {
            await axios.patch(`/api/pins/${props.pin.id}`, JSON.stringify({
                position_x: props.pin.position_x,
                position_y: props.pin.position_y,
                symbol: state.symbol,
                notes: state.notes,
                world_id: props.pin.world_id,
                name: state.name,
                rank: state.rank,
                amount: state.amount,
                respawn: state.respawn,
                resource: state.resource,
                x_cord: state.x_cord,
                y_cord: state.y_cord
            }));
            props.socket.send('campaign-update');
            props.handleCancel();
        } catch (error) {
            swal("Error", error.response.data, "error");
        }
    };

    return (
        <div>
            <ReactTooltip id='tooltip' getContent={(dataTip) => <div>{dataTip}</div>} />
            <input
                type="text"
                maxLength="1"
                name="x_cord"
                placeholder='X coordinant'
                data-tip='X coordinant'
                data-for='tooltip'
                value={state.x_cord}
                onChange={handleChange}
            />
            <input
                type="number"
                name="y_cord"
                placeholder='Y coordinant'
                data-tip='Y coordinant'
                data-for='tooltip'
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
                    <option key={choice} value={choice.toLowerCase()}>{choice === 'na' ? '-' : choice}</option>
                ))}
            </select>
            <input type="text"
                   name="notes"
                   placeholder='notes'
                   data-tip='notes'
                   data-for='tooltip'
                   value={state.notes}
                   onChange={handleChange}
            />
            <input type="text"
                   name="name"
                   placeholder='name'
                   data-tip='name'
                   data-for='tooltip'
                   value={state.name}
                   onChange={handleChange}
            />
            <input type="number"
                   name="rank"
                   placeholder='rank'
                   data-tip='rank'
                   data-for='tooltip'
                   value={state.rank}
                   onChange={handleChange}
            />
            <input type="number"
                   name="amount"
                   placeholder='amount'
                   data-tip='amount'
                   data-for='tooltip'
                   value={state.amount}
                   onChange={handleChange}
            />
            <input type="number"
                   name="respawn"
                   placeholder='respawn'
                   data-tip='respawn'
                   data-for='tooltip'
                   value={state.respawn}
                   onChange={handleChange}
            />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={props.handleCancel}>Cancel</button>
        </div>
    );
}

export default PinUpdate;
