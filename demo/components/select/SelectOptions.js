import React from 'react';
import {Select} from '../../../src';
import OptionsTable from '../../helper/OptionsTable';

export default () => {
    let propDescription = {
        onChange: {
            values: 'function',
            description: 'Returning values for function'
        },
        search: {
            values: 'boolean',
            description: 'Whether search should be present'
        },
        options: {
            values: 'array',
            description: 'array of options'
        },
        value: {
            values: 'number',
            description: 'selected object'
        },
        placeholder: {
            values: 'string',
            description: 'Text to be shown when nothing is selected'
        }
    };

    return (
        <OptionsTable component={Select} propDescription={propDescription} />
    );
};
