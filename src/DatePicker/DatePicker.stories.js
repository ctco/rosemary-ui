import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DatePicker from './DatePicker';
import Input from '../Input/Input';

class DatePickerStatefull extends React.Component {
    state = {
        value: null
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

storiesOf('DatePicker', module)
    .add('default', () => <DatePickerStatefull />)
    .add('disabled', () => <DatePickerStatefull disabled />);
