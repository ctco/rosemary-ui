import React from 'react';
import {NavItem} from '../../../src';
import OptionsTable from '../../helper/OptionsTable';

export default () => {
    let propDescription = {
        onClick: {
            values: 'function',
            description: 'Is called when btn is clicked'
        },
        active: {
            values: 'boolean',
            description: 'Set link to be active'
        },
        right: {
            values: 'boolean',
            description: 'Set link to float right'
        }
    };

    return (
        <div>
            NavItem:
            <OptionsTable component={NavItem} propDescription={propDescription} />
        </div>
    );
};
