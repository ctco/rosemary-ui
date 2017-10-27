import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';
import TextArea from '../../../src/TextArea/TextArea';

import React from 'react';

export default class TextAreaDemo extends React.Component {
    render() {
        return (
            <DemoWithSnippet>
                <TextArea value="make" onChange={() => console.log('area change')}/>
            </DemoWithSnippet>
        );
    }
}