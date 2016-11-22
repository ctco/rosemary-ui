import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';
import Tabs from '../../../src/components/tabs/Tabs';

import React from 'react';

export default class TabsDemo extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);

        this.state = {
            selected: 'Tab3'
        };
    }

    _onChange(tabId) {
        this.setState({selected: tabId});
        console.log(tabId);
    }

    _ajax(cb) {
        setTimeout(() => {
            alert('data has been loaded');
            cb();
        }, 1000);
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
                    <Tabs.Tab tabId="Tab1">Tab1</Tabs.Tab>
                    <Tabs.Tab tabId="Tab2">Wait 1s then open</Tabs.Tab>

                    <Tabs.Tab tabId="Tab3" onEnter={(cb) => {
                        this._ajax(cb);
                    }}>Load Data from Server</Tabs.Tab>
                </Tabs>
            </DemoWithSnippet>
        );
    }
}