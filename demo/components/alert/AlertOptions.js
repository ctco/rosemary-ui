import React from 'react';
import {Alert} from '../../../src';
import OptionsTable from '../../helper/OptionsTable';

export default () => {
    let propDescription = {
        type: {
            values: 'string',
            description: 'all types are stored in {AlertTypes} from Alert'
        },
        extra: {
            values: 'any',
            description: 'all can be passed in'
        }
    };

    return (
        <OptionsTable component={Alert} propDescription={propDescription}/>
    );
};
