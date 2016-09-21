import React from 'react';
import {Select} from '../../../src';
import DemoWithSnippet from '../../layout/DemoWithSnippet';

export default class SelectDemo extends React.Component {
    constructor(props) {
        super(props);

        this.options = [
            {id: 1, displayString: 'Option 1'},
            {id: 2, displayString: 'Option 2'},
            {id: 3, displayString: 'Option 3'},
            {id: 4, displayString: 'Option 4'},
            {id: 5, displayString: 'Option 5'},
            {id: 6, displayString: 'Option 6'},
            {id: 7, displayString: 'Option 7'},
            {id: 8, displayString: 'Option 8'},
            {id: 9, displayString: 'Option 9'},
            {id: 10, displayString: 'Option 10'},
            {id: 11, displayString: 'Option 11'}
        ];

        this.state = {
            value: 10,
            open: true
        };
    }

    handleChange(item) {
        if (item === 3) {
            this.setState({
                open: false
            });
        }
    }

    render() {
        return (
            <div>
                <h2>
                    Variations
                </h2>
                <DemoWithSnippet>
                    <Select className="select--sm" placeholder="Small" options={this.options}/>
                    <br/><br/>
                    <Select placeholder="Default" options={this.options}/>
                    <br/><br/>
                    <Select className="select--lg" placeholder="Large" options={this.options}/>
                </DemoWithSnippet>

                <div className="separator-block"></div>

                <h2>
                    Can be rendered with a placeholder
                </h2>
                <DemoWithSnippet>
                    <Select placeholder="Please select..." options={this.options}/>
                </DemoWithSnippet>

                <div className="separator-block"></div>

                <h2>
                    Can be controlled
                </h2>
                <DemoWithSnippet>
                    <Select placeholder="Please select..."
                            onChange={(value) => this.setState({value})}
                            value={this.state.value}
                            options={this.options}/>
                </DemoWithSnippet>

                <div className="separator-block"></div>
                <h2>
                    Can be with search
                </h2>
                <DemoWithSnippet>
                    <Select className="select--sm" placeholder="Small" options={this.options} search={true}/>
                </DemoWithSnippet>

                <h2>
                    Can be Controllable(will close when option 3 are selected)
                </h2>
                <DemoWithSnippet>
                    <Select className="select--sm"
                            onPopupStateChange={(open) => {
                                this.setState({open});
                            }}
                            open={this.state.open}
                            onChange={(item) => this.handleChange(item)}
                            options={this.options} search={true}/>
                </DemoWithSnippet>
            </div>
        );
    }
}
