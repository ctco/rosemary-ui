import React from 'react';
import {DatePicker, MonthPicker} from '../../../src';
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
        <div>
            <h2>DatePicker</h2>
            <OptionsTable component={DatePicker} propDescription={propDescription} />
            <br/>
            <h2>MonthPicker</h2>
            <OptionsTable component={MonthPicker} propDescription={propDescription} />
        </div>
    );
};
