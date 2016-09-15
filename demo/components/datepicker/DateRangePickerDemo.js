import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DateRangePicker} from '../../../src';
import DemoWithSnippet from '../../layout/DemoWithSnippet';
import {updateDateFrom, updateDateTo} from '../../actions/date-picker-actions';

export class DateRangePickerDemo extends React.Component {
    constructor(props) {
        super(props);
    }

    handleRangeChange(value) {
        this.props.updateDateTo(value.to);
        this.props.updateDateFrom(value.from);
    }

    render() {
        return (
            <div>
                <DemoWithSnippet>
                    <DateRangePicker />
                    <h3>Controlled Date Picker</h3>
                    <DateRangePicker onChange={(value) => this.handleRangeChange(value)} value={this.props.value}/>
                </DemoWithSnippet>
            </div>
        );
    }
}

const mapStateToProps = ({datePicker}) => ({
    value: {
        from: datePicker.from,
        to: datePicker.to
    }
});
const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        updateDateFrom,
        updateDateTo
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DateRangePickerDemo);