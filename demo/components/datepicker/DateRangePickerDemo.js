import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DateRangePicker} from '../../../src';
import DemoWithSnippet from '../../layout/DemoWithSnippet';
import {updateDateFrom, updateDateTo,changePopupState} from '../../actions/date-picker-actions';

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
                    <h3>DRP can be controlled</h3>
                    <DateRangePicker open={this.props.open}
                                     onPopupStateChange={(open) => this.props.changePopupState(open)}
                                     onChange={(value) => this.handleRangeChange(value)}
                                     value={this.props.value}/>
                </DemoWithSnippet>
            </div>
        );
    }
}

const mapStateToProps = ({datePicker}) => ({
    value: {
        from: datePicker.from,
        to: datePicker.to
    },
    open: datePicker.open
});
const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        updateDateFrom,
        updateDateTo,
        changePopupState
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DateRangePickerDemo);