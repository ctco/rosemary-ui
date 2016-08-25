import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';
import Input from '../../../src/components/Input';

import React from 'react';

export default class InputDemo extends React.Component {
    render() {
        return (
            <DemoWithSnippet>
                <Input placeholder="small input" className="text-input--sm"/>
                <br/><br/>
                <Input placeholder="default input" onChange={(value) => alert(value)} type="text"/>
                <br/><br/>
                <Input placeholder="large Input" className="text-input--lg"/>
            </DemoWithSnippet>
        );
    }
}
