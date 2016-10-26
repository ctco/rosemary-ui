import React from 'react';
import {Input, IconInput} from '../../../src';
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
        <div>
            <h2>Input</h2>
            <OptionsTable component={Input} propDescription={propDescription} />
            <br/>
            <h2>IconInput</h2>
            <OptionsTable component={IconInput} propDescription={propDescription} />
        </div>
    );
};
