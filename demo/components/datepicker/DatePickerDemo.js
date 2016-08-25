import React from 'react';
import {DatePicker, Input} from '../../../src';
import DemoWithSnippet from '../../layout/DemoWithSnippet';

import {getToday, getLastDayOfMonth, format} from '../../../src/util/date-utils';

export default class DatePickerDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            controlledValue: '01.01.2015'
        };
    }

    render() {
        return (
            <div>
                <DemoWithSnippet>
                    <div>
                        <span className="date-picker-demo__simple-example-text"> The selected date is:</span> <DatePicker className="btn--inline"/>
                    </div>
                </DemoWithSnippet>

                <br/>
                <br/>

                <h2>Date picker can be controlled</h2>
                <Input type="text" value={this.state.controlledValue} onChange={(value) => this.setState({controlledValue: value})}/>

                <DemoWithSnippet>
                    <DatePicker value={this.state.controlledValue}
                                format="DD.MM.YYYY"
                                onChange={(value) => this.setState({controlledValue: value})}/>
                </DemoWithSnippet>

                <br/>
                <br/>

                <h2>Dates can be limited</h2>
                <DemoWithSnippet>
                    <DatePicker format="DD.MM.YYYY"
                                minDate="01.10.2015"
                                maxDate="31.03.2017" />
                </DemoWithSnippet>
            </div>
        );
    }
}
