import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';
import Pager from '../../../src/components/Pager';

import React from 'react';

export default class PagerDemo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0
        };
    }

    render() {
        return (
            <DemoWithSnippet>
                <Pager
                    onPrevBtnClick={() => {
                        this.setState({
                            count: this.state.count - 1
                        });
                    }}
                    onNextBtnClick={() => {
                        this.setState({
                            count: this.state.count + 1
                        });
                    }}
                    value={this.state.count}
                />
            </DemoWithSnippet>
        );
    }
}