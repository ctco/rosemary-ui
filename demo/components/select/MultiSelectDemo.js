import React from 'react';
import {MultiSelect} from '../../../src';
import DemoWithSnippet from '../../layout/DemoWithSnippet';

export default class MultiSelectDemo extends React.Component {
    constructor(props) {
        super(props);

        this.manyOptions = this.generateOptions(1000);
    }

    generateOptions(amount) {
        let result = [];
        for (let i = 0; i < amount; i++) {
            result.push({
                id: i,
                displayString: `Option ${i}`
            });
        }
        return result;
    }

    render() {
        return (
            <div>
                <DemoWithSnippet>
                    <MultiSelect placeholder="Please select..." options={this.manyOptions} onChange={(ids) => {
                        console.log(ids);
                    }} inputProps={{
                        'data-selenium-id': 'multi-select'
                    }} tooltipProps={{
                        'data-selenium-id': 'multi-select-tooltip'
                    }}/>
                </DemoWithSnippet>

                <h3> Controlled </h3>
                <DemoWithSnippet>
                    <MultiSelect placeholder="Please select..."
                                 options={this.manyOptions}
                                 value={[0,626,1]}
                                 onChange={(ids) => {
                        console.log(ids);
                    }} inputProps={{
                        'data-selenium-id': 'multi-select'
                    }} tooltipProps={{
                        'data-selenium-id': 'multi-select-tooltip'
                    }}/>
                </DemoWithSnippet>
            </div>
        );
    }
}