import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';
import RadioGroup from '../../../src/components/radio/RadioGroup';
import Radio from '../../../src/components/radio/Radio';

import React from 'react';

export default class RadioButtonGroupDemo extends React.Component {


    render() {
        return (
            <DemoWithSnippet>
                <RadioGroup onChange={(data) => console.log(data)}>
                    <Radio label="Radio label - default" data={{ name : 'object' ,id : 'xa123'}}/>
                    <br/>
                    <Radio checked label="Radio label - checked" data={{ name : 'object2' ,id : 'xa5223'}}/>
                    <br/>
                    <Radio disabled label="Radio label - default + disabled" data={{ name : 'object3' ,id : 'xa1234'}}/>
                    <br/>
                    <Radio checked disabled label="Radio label - checked + disabled" data={{ name : 'object4' ,id : 'xa2222'}}/>
                </RadioGroup>
            </DemoWithSnippet>
        );
    }
}
