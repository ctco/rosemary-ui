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

    let tabDescription = {
        tabId: {
            values: 'any',
            description: 'simple tab id'
        },
        onEnter: {
            values: 'function[callback]',
            description: 'called before onChange,can make ajax requests etc. to continue call callback func'
        }

    };


    return (
        <div>
            Tabs
            <OptionsTable component={Tabs} propDescription={description}/>

            Tabs.Tab
            <OptionsTable component={Tabs.Tab} propDescription={tabDescription}/>
        </div>
    );
};
