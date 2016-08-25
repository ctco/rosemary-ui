import React from 'react';
import {DateRangePicker} from '../../../src';
import OptionsTable from '../../helper/OptionsTable';

export default () => {
    let propDescription = {
        format: {
            values: 'function',
            description: 'Input field date format function'
        },
        parse: {
            values: 'function',
            description: 'Input field date parse function'
        },
        formatHeader: {
            values: 'function',
            description: 'Header month format'
        }
    };

    return (
        <OptionsTable component={DateRangePicker} propDescription={propDescription} />
    );
};
