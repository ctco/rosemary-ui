import React from 'react';
import { storiesOf } from '@storybook/react';
import MultiSelect from './MultiSelect';

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
    getOption(10, ' Vienna (BR)')
];

storiesOf('MultiSelect', module).add('basic', () => <MultiSelect options={options} />);

storiesOf('MultiSelect', module).add('custom', () => (
    <MultiSelect options={options} popupHeader={<h2>CUSTOM Header</h2>} showSearch={false} showClear={false} />
));
