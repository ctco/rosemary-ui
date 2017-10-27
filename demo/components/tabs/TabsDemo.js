import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';
import Tabs from '../../../src/Tabs/Tabs';
import Tab from '../../../src/Tabs/Tab/Tab';

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

    _ajax() {
        setTimeout(() => {
            alert('data has been loaded');
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
                    <Tab tabId="Tab1" value="Tab1"/>
                    <Tab tabId="Tab2">Wait 1s then open</Tab>

                    <Tabs.Tab tabId="Tab3" onEnter={() => {
                        this._ajax();
                    }}>Load Data from Server</Tabs.Tab>
                </Tabs>
            </DemoWithSnippet>
        );
    }
}