import React from 'react';
import Tabs from '../../../src/components/tabs/Tabs';
import OptionsTable from '../../helper/OptionsTable';

export default () => {
    let description = {
        onBeforeChange: {
            values: 'function[tabId,next]',
            description: 'called before onChange,if using onBeforeChange dont forget call next function'
        },
        onChange: {
            values: 'function[tabId]',
            description: 'called when tab is selected tabId will be passed in'
        },
        selected: {
            values: 'any',
            description: 'specifies selected tab'
        }
    };


    return (
        <div>
            Tabs:
            <OptionsTable component={Tabs} propDescription={description}/>
        </div>
    );
};
