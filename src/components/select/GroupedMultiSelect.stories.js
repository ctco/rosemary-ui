import React from 'react';
import {storiesOf,action} from '@kadira/storybook';
import GroupedMultiSelect from './GroupedMultiSelect.js';


function generateOptions(name, amount) {
    let result = [];
    for (let i = 0; i < amount; i++) {
        result.push({
            id: i,
            displayString: `${name} ${i}`
        });
    }
    return result;
}

const teamKey = 'Teams';
const personKey = 'Persons';

const teams = {
    value: [1, 2, 3],
    options: generateOptions('Teamsrrp', 5)
};
const persons = {
    value: [3, 5, 10],
    options: generateOptions('Personsrr', 5)
};


const values = {
    [teamKey]: teams.value,
    [personKey]: persons.value
};
const options = {
    [teamKey]: teams.options,
    [personKey]: persons.options
};

const TeamGroupHeader = (props) => {
    return (
        <div>
            <span>Teams selected({props.value.length})</span>
            <button onClick={() => alert(props.value)}>Open</button>
        </div>
    );
};

const groupView = {
    [teamKey]: {
        header: TeamGroupHeader
    }
};

storiesOf('Grouped MultiSelect', module)
    .add('basic', () => (
        <GroupedMultiSelect
            onChange={action('Changed')}
            groupView={groupView}
            keys={[teamKey, personKey]}
            value={values}
            options={options}/>
    ));

