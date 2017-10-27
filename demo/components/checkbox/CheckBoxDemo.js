import DemoWithSnippet from '../../layout/DemoWithSnippet';
import CheckBox from '../../../src/CheckBox';

import React from 'react';

export default class CheckBoxDemo extends React.Component {
    render() {
        return (
            <DemoWithSnippet>
                <CheckBox label="Checkbox lable - default "/>
                <br />
                <CheckBox label="Checkbox lable - checked " value={true} />
                <br />
                <CheckBox label="Checkbox lable - checked + disabled" disabled value={true} />
                <br />
                <CheckBox label="Checkbox lable - disabled" value={true} />
                <br />
                <CheckBox onChange={(event,value) => alert(value)} label="Checkbox with callback" />
            </DemoWithSnippet>
        );
    }
}
