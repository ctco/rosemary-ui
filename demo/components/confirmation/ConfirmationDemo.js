import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';
import Confirmation from '../../../src/components/Confirmation';

import React from 'react';

export default class ConfirmationDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        return (
            <DemoWithSnippet>
                <Confirmation title="Do you really want to delete this activity?"
                              body="Keep in mind that deleted activity can't be restored."
                />
            </DemoWithSnippet>
        );
    }
}