import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';
import Example2 from './Example2';
import {Form, formHelper, Input, Select, DateRangePicker} from '../../../src';

class FormDemo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DemoWithSnippet>
                <Example2 />
            </DemoWithSnippet>
        );
    }
}

export default FormDemo;
