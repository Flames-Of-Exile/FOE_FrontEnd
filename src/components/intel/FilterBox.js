import React, { useEffect, useState } from 'react';
import Select from 'react-select';

function FilterBox(props) {
    const [state, setState] = useState({
        type: null,
        resource: null,
        rank: 0,
        amount: 0
    });

    useEffect(() => {
        let type = null;
        let resource = null;
        let rank = 0;
        let amount = 0;

        if (props.query.type) {
            type = typeOptions.filter(item => props.query.type.split(',').includes(item.value));
        }
        if (props.query.resource) {
            resource = resourceOptions.filter(item => props.query.resource.split(',').includes(item.value));
        }
        if (props.query.rank) {
            rank = props.query.rank;
        }
        if (props.query.amount) {
            amount = props.query.amount;
        }
        setState({
            type: type,
            resource: resource,
            rank: rank,
            amount: amount
        });
    }, [props.query]);

    const typeOptions = [
        { value: 'stone', label: 'Stone' },
        { value: 'stone-motherlode', label: 'Stone Motherlode' },
        { value: 'ore', label: 'Ore' },
        { value: 'ore-motherlode', label: 'Ore Motherlode' },
        { value: 'wood', label: 'Wood' },
        { value: 'animal', label: 'Animal' },
        { value: 'animal-boss', label: 'Animal Boss' },
        { value: 'mob', label: 'Mob' },
        { value: 'mob-boss', label: 'Mob Boss' },
        { value: 'well', label: 'Well' },
        { value: 'grave', label: 'Grave' },
        { value: 'tactical-house', label: 'Tactical House' },
        { value: 'tactical-fire', label: 'Tactical Fire' },
        { value: 'tactical-fish', label: 'Tactical Fish' }
    ];

    const woodptions = [
        { value: 'yew', label: 'Yew' },
        { value: 'birch', label: 'Birch' },
        { value: 'ash', label: 'Ash' },
        { value: 'oak', label: 'Oak' },
        { value: 'spruce', label: 'Spruce' }
    ];

    const stoneOptions = [
        { value: 'granite', label: 'Granite' },
        { value: 'limestone', label: 'Limestone' },
        { value: 'travertine', label: 'Travertine' },
        { value: 'slate', label: 'Slate' },
        { value: 'marble', label: 'Marble' }
    ];

    const oreOptions = [
        { value: 'copper', label: 'Copper' },
        { value: 'tin', label: 'Tin' },
        { value: 'iron', label: 'Iron' },
        { value: 'silver', label: 'Silver' },
        { value: 'aurelium', label: 'Aurelium' }
    ];

    const animalOptions = [
        { value: 'spider', label: 'Spider' },
        { value: 'pig', label: 'Pig' },
        { value: 'cat', label: 'Cat' },
        { value: 'auroch', label: 'Auroch' },
        { value: 'elk', label: 'Elk' },
        { value: 'wolf', label: 'Wolf' },
        { value: 'bear', label: 'Bear' },
        { value: 'gryphon', label: 'Gryphon'}
    ];

    const graveOptions = [
        { value: 'human', label: 'Human' },
        { value: 'elven', label: 'Elven' },
        { value: 'monster', label: 'Monster' },
        { value: 'stoneborn', label: 'Stoneborn' },
        { value: 'guinecian', label: 'Guinecian' }
    ];

    const buildResourceOptions = () => {
        let options = [];
        let types = state.type.map(item => item.value);
        if (types.includes('wood')) {
            options = options.concat(woodptions);
        }
        if (types.includes('ore') || types.includes('ore-motherlode')) {
            options = options.concat(oreOptions);
        }
        if (types.includes('stone') || types.includes('stone-motherlode')) {
            options = options.concat(stoneOptions);
        }
        if (types.includes('animal')) {
            options = options.concat(animalOptions);
        }
        if (types.includes('grave')) {
            options = options.concat(graveOptions);
        }
        return options;
    };

    const resourceOptions = [
        { value: 'yew', label: 'Yew' },
        { value: 'birch', label: 'Birch' },
        { value: 'ash', label: 'Ash' },
        { value: 'oak', label: 'Oak' },
        { value: 'spruce', label: 'Spruce' },
        { value: 'copper', label: 'Copper' },
        { value: 'tin', label: 'Tin' },
        { value: 'iron', label: 'Iron' },
        { value: 'silver', label: 'Silver' },
        { value: 'aurelium', label: 'Aurelium' },
        { value: 'granite', label: 'Granite' },
        { value: 'limestone', label: 'Limestone' },
        { value: 'travertine', label: 'Travertine' },
        { value: 'slate', label: 'Slate' },
        { value: 'marble', label: 'Marble' },
        { value: 'spider', label: 'Spider' },
        { value: 'pig', label: 'Pig' },
        { value: 'cat', label: 'Cat' },
        { value: 'auroch', label: 'Auroch' },
        { value: 'elk', label: 'Elk' },
        { value: 'wolf', label: 'Wolf' },
        { value: 'bear', label: 'Bear' },
        { value: 'gryphon', label: 'Gryphon'},
        { value: 'human', label: 'Human' },
        { value: 'elven', label: 'Elven' },
        { value: 'monster', label: 'Monster' },
        { value: 'stoneborn', label: 'Stoneborn' },
        { value: 'guinecian', label: 'Guinecian' }
    ];

    const handleChange = (event) => setState({
        ...state,
        [event.target.name]: event.target.value
    });

    const handleSelectType = (event) => setState({
        ...state,
        type: event
    });

    const handleSelectResource = (event) => setState({
        ...state,
        resource: event
    });

    const handleApply = () => {
        let queryString = "";
        if (state.type && state.type.length > 0) {
            queryString += "type=" + state.type.map(type => type.value).join(",") + "&";
        }
        if (state.resource && state.resource.length > 0) {
            queryString += "resource=" + state.resource.map(resource => resource.value).join(",") + "&";
        }
        if (state.rank > 0) {
            queryString += "rank=" + state.rank + "&";
        }
        if (state.amount > 0) {
            queryString += "amount=" + state.amount + "&";
        }
        props.history.push(`${props.location.pathname}?${queryString}`);
    };

    return(
        <div className="filter-box">
            <p>Types</p>
            <Select className="multiselect" isMulti={true} onChange={handleSelectType} value={state.type}
                    options={typeOptions} />
            <p>Resources</p>
            <Select className="multiselect" isMulti={true} onChange={handleSelectResource} value={state.resource}
                    options={state.type ? buildResourceOptions() : resourceOptions} />
            <span>Minimum Rank</span>
            <input type="number" name="rank" value={state.rank} onChange={handleChange} />
            <br />
            <span>Minimum Amount</span>
            <input type="number" name="amount" value={state.amount} onChange={handleChange} />
            <button onClick={handleApply}>Apply</button>
        </div>
    );
}

export default FilterBox;
