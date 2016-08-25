import React from 'react';
import {Radio, RadioGroup} from '../../../src';
import OptionsTable from '../../helper/OptionsTable';

export default () => {
    let radioDescription = {
        checked: {
            values: 'boolean',
            description: 'radio is selected'
        },
        label: {
            values: 'string',
            description: 'sets label next to radio'
        },
        disabled: {
            values: 'boolean',
            description: 'radio becomes disabled'
        }
    };

    let radioGroupDescription = {
        onChange: {
            values: 'function',
            description: 'function is called when radio is changed'
        }
    };

    return (
        <div>
            Radio:
            <OptionsTable component={Radio} propDescription={radioDescription}/>
            RadioGroup:
            <OptionsTable component={RadioGroup} propDescription={radioGroupDescription}/>
        </div>
    );
};
