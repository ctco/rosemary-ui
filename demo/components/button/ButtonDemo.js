import React from 'react';
import {Button} from '../../../src';
import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';

export default () => {
    return (
        <DemoWithSnippet>
            <Button className="btn btn-sm">Small button</Button>
            <Button className="btn btn-m">Medium button</Button>
            <Button className="btn btn-lg">Large button</Button>
            <Button className="btn btn--default">
                Default
            </Button>
            <Button className="btn btn--primary">
                Primary
            </Button>
            <Button className="btn btn--success">
                Success
            </Button>
            <Button className="btn btn--danger">
                Danger
            </Button>
            <Button className="btn btn--warning">
                Warning
            </Button>
            <Button disabled className="btn btn--primary">
                Disabled
            </Button>
            <br/>
            <Button className="btn-link btn-sm">
                Button Link
            </Button>

            <Button className="btn-link btn-m">
                Button Link
            </Button>

            <Button className="btn-link btn-lg">
                Button Link
            </Button>
        </DemoWithSnippet>
    );
};
