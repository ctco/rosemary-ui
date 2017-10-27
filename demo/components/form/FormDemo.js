import React from 'react';

import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';
import Example2 from './Example2';
import {Form, formHelper} from '../../../src';

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
