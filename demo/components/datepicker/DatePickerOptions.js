import React from 'react';
import {DatePicker} from '../../../src';
import OptionsTable from '../../helper/OptionsTable';

export default () => {
    let propDescription = {
        value: {
            values: 'string',
            description: 'date value'
        },
        format: {
            values: 'string',
            description: 'value format'
        },
        onChange: {
            values: 'function (value) ',
            description: 'function which is called when value is changed '
        }
    };

    return (
        <OptionsTable component={DatePicker} propDescription={propDescription} />
    );
};
