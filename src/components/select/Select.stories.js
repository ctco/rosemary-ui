import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {boolean} from '@kadira/storybook-addon-knobs';
import Select from './Select';
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
const options = generateOptions('Robot', 1000);

storiesOf('Select', module)
    .add('uncontrolled', () => <Select options={options}/>)
    .add('controlled', () => <Select open={boolean('Open', true)} options={options}/>);
