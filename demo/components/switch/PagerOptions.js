import React from 'react';
import OptionsTable from '../../helper/OptionsTable';
import Pager from '../../../src/components/Pager';

export default () => {
    let propDescription = {
        onPrevBtnClick: {
            values: 'function',
            description: 'Is called when a left btn is clicked'
        },
        onNextBtnClick: {
            values: 'function',
            description: 'Is called when a right btn is clicked'
        },
        value: {
            values: 'any',
            description: 'value will be displayed'
        },
        prevBtnIcon: {
            values: 'string',
            description: 'icon name'
        },
        nextBtnIcon: {
            values: 'string',
            description: 'icon name'
        }
    };

    return (
        <OptionsTable component={Pager} propDescription={propDescription}/>
    );
};
