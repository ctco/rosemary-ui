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
        to: {
            values: 'string',
            description: 'Redirect to link'
        },
        internal: {
            values: 'boolean',
            description: 'by default (true) react will compile as (Link) element instead of (a) element'
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
