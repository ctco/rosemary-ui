import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';
import Tabs from '../../../src/components/tabs/Tabs';
import Tab from '../../../src/components/tabs/Tab';

import React from 'react';

export default class TabsDemo extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);

        this.state = {
            selected: 'Tab1'
        };
    }

    _onChange(tabId) {
        this.setState({selected: tabId});
        console.log(tabId);
    }

    render() {
        return (
            <DemoWithSnippet>
                <Tabs selected={this.state.selected}
                      onBeforeChange={(id, next) => {
                          if (id === 'Tab2') {
                              setTimeout(() => next(), 1000);
                          } else {
                              next();
                          }
                      }}
                      onChange={this._onChange}>
                    <Tab tabId="Tab1">Tab1</Tab>
                    <Tab tabId="Tab2">Wait 1s then open</Tab>
                    <Tab tabId="Tab3">Tab3</Tab>
                </Tabs>
            </DemoWithSnippet>
        );
    }
}