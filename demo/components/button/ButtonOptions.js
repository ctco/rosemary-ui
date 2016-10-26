import React from 'react';
import {Button} from '../../../src';
import OptionsTable from '../../helper/OptionsTable';

export default () => {
    let propDescription = {
        onClick: {
            values: 'function',
            description: 'Is called when a button is clicked'
        },
        title: {
            values: 'string',
            description: 'HTMl-Element tile'
        }
    };

    return (
        <OptionsTable component={Button} propDescription={propDescription} />
    );
};
