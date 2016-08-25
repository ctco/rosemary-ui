import React from 'react';
import {CheckBox} from '../../../src';
import OptionsTable from '../../helper/OptionsTable';

export default () => {
    let propDescription = {
        onChange: {
            values: 'function',
            description: 'function Is called when checkbox is changed'
        },
        value: {
            values: 'boolean',
            description: 'value'
        },
        label: {
            values: 'string',
            description: 'sets label next to checkbox'
        },
        disabled: {
            values: 'boolean',
            description: 'becomes disabled'
        }
    };

    return (
        <OptionsTable component={CheckBox} propDescription={propDescription} />
    );
};
