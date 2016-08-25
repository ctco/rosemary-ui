import React from 'react';
import {Input} from '../../../src';
import OptionsTable from '../../helper/OptionsTable';

export default () => {
    let propDescription = {
        disabled: {
            values: 'boolean',
            description: 'becomes disabled'
        },
        placeholder: {
            values: 'string',
            description: 'set input placeholder'
        },
        onChange: {
            values: 'function',
            description: 'Is called when a input value is changed'
        }
    };

    return (
        <OptionsTable component={Input} propDescription={propDescription} />
    );
};
