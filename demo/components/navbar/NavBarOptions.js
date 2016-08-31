import React from 'react';
import {NavItem, NavHrefItem} from '../../../src';
import OptionsTable from '../../helper/OptionsTable';

export default () => {
    let commonPropDesc = {
        active: {
            values: 'boolean',
            description: 'Set link to be active'
        },
        right: {
            values: 'boolean',
            description: 'Set link to float right'
        }
    };

    let navItemPropDesc = {
        ...commonPropDesc,
        onClick: {
            values: 'function',
            description: 'Is called when btn is clicked'
        }
    };

    let navHrefItemPropDesc = {
        ...commonPropDesc,
        withHoverEffect: {
            values: 'boolean',
            description: 'on hover will show underline'
        }
    };

    return (
        <div>
            NavItem:
            <OptionsTable component={NavItem} propDescription={navItemPropDesc} />

            NavHrefItem:
            <OptionsTable component={NavHrefItem} propDescription={navHrefItemPropDesc} />
        </div>
    );
};
