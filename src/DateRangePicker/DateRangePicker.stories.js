import React from 'react';
import { storiesOf } from '@storybook/react';
import DatePicker from './DateRangePicker';
import Input from '../Input/Input';

class DateRangePicker extends React.Component {
    state = {
        value: { from: null, to: null }
    };

    render() {
        return (
            <div>
                <DatePicker
                    value={this.state.value}
                    onChange={value => this.setState({ value })}
                    attachment="bottom left"
                    {...this.props}
                >
                    <Input />
                </DatePicker>
            </div>
        );
    }
}

storiesOf('DatePicker', module).add('Date range picker', () => <DateRangePicker />);
