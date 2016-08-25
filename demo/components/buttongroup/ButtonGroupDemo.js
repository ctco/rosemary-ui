import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';
import {ButtonGroup} from '../../../src';
import Button from '../../../src/components/button/Button';

import React from 'react';

export default class ButtonGroupDemo extends React.Component {
    render() {
        return (
            <DemoWithSnippet>
                <ButtonGroup>
                   <Button className="btn--grouped">Hello</Button>
                   <Button className="btn--grouped">Hello 2</Button>
                </ButtonGroup>
            </DemoWithSnippet>
        );
    }
}
