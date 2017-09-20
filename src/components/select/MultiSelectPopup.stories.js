import React from 'react';
import {storiesOf} from '@kadira/storybook';
import MultiSelect from './MultiSelect';

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

function getOption(id, displayString) {
    return {
        id,
        displayString
    };
}

const options = [
    getOption(1, 'Riga (UK)'),
    getOption(2, 'London (EST)'),
    getOption(3, 'Liveable  (LT)'),
    getOption(4, 'assigning  (LV)'),
    getOption(5, 'pro-active  (GBR)'),
    getOption(6, 'developments  (UK)'),
    getOption(7, 'South Asia (RUS)'),
    getOption(8, 'Australia (BK)'),
    getOption(9, 'Melbourne (VK)'),
    getOption(10, ' Vienna (BR)'),
];

storiesOf('MultiSelect', module)
    .add('basic', () => <MultiSelect options={options}/>);
