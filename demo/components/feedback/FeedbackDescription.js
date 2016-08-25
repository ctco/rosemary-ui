import React from 'react';
import OptionsTable from '../../helper/OptionsTable';
import {FeedbackManager} from '../../../src';


export default () => {
    let propDescription = {};

    return (
        <OptionsTable component={FeedbackManager} propDescription={propDescription} />
    );
};
