import React from 'react';
import { storiesOf } from '@storybook/react';
import Select from './Select';
import { boolean } from '@storybook/addon-knobs';
import { SelectLabelInput } from "./SelectInput";

function generateOptions(name, amount) {
    let result = [];
    for (let i = 0; i < amount; i++) {
        result.push({
            id: i,
            displayString: `${name} ${i}`,
            className: i % 2 ? 'odd' : 'even'
        });
    }

    result.push({
        id: 9999,
        displayString: 'Amsterdam (NL)'
    });
    return result;
}

const options = generateOptions('Robot', 1000);

storiesOf('Select', module)
    .add('uncontrolled', () => <Select options={options} />)
    .add('with special options', () => <Select options={options} />)
    .add('controlled', () => <Select open={boolean('Open', true)} options={options} />)
    .add('with search', () => <Select search={true} options={options} />)
    .add('disabled', () => <Select options={options} disabled />)
    .add('with custom input', () => (
        <Select
            options={options}
            Input={(props) => <SelectLabelInput {...props} text="Select options" />}
            testId="test-id-check"
            popup={{
                attachment: "bottom left",
                width: 600,
                className: "tree-select__popup popover"
            }}
        />
    ));
