import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';
import {IconInput, Input} from '../../../src';

import React from 'react';

export default class InputDemo extends React.Component {
    render() {
        return (
            <DemoWithSnippet>
                <Input placeholder="small input" size="sm"/>
                <br/><br/>

                <Input placeholder="default input" onChange={(value) => console.log(value)} type="text"/>
                <br/><br/>

                <Input placeholder="default input" onChange={(value) => console.log(value)} type="text"/>
                <br/><br/>

                <Input placeholder="large Input" size="lg"/>
                <br/><br/>

                <IconInput iconClassName="im icon-search"/>
                <br/><br/>

                <IconInput iconClassName="im icon-search"
                           position="right"
                           readOnly />
            </DemoWithSnippet>
        );
    }
}
