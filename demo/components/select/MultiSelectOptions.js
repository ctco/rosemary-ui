import React from 'react';
import {MultiSelect} from '../../../src';
import OptionsTable from '../../helper/OptionsTable';

export default () => {
    let propDescription = {};

    return (
        <OptionsTable component={MultiSelect} propDescription={propDescription} />
    );
};
