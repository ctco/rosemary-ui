import React from 'react';
import {FormField} from '../../../src';
import OptionsTable from '../../helper/OptionsTable';

export default () => {
    let propDescription = {
    };

    return (
        <div>
            FormField:
            <OptionsTable component={FormField} propDescription={propDescription} />
        </div>

    );
};
