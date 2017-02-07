import React from 'react';
import Confirmation from '../../../src/components/Confirmation';
import OptionsTable from '../../helper/OptionsTable';

export default () => {
    let propDescription = {
        body: {
            values: 'string',
            description: 'description about action'
        },
        title: {
            values: 'string',
            description: 'title text'
        },
        onConfirm: {
            values: 'function',
            description: 'function Is called when confirm button clicks(no params passed)'
        },
        onCancel: {
            values: 'function',
            description: 'function Is called when cancel btn is clicked(no params passed)'
        },
        confirmBtnTxt: {
            values: 'string',
            description: 'confirm btn value'
        },
        cancelBtnText: {
            values: 'boolean',
            description: 'cancel btn value'
        }

    };

    return (
        <OptionsTable component={Confirmation} propDescription={propDescription}/>
    );
};
