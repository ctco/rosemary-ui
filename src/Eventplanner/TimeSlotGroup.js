import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeSlot from './TimeSlot';
import date from './utils/dates.js';
import localizer from './localizer';

const PROPERTY_TYPES = {
    timeslots: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.instanceOf(Date).isRequired,
    showLabels: PropTypes.bool,
    isNow: PropTypes.bool,
    timeGutterFormat: PropTypes.string,
    culture: PropTypes.string
};

const DEFAULT_PROPS = {
    timeslots: 2,
    step: 30,
    isNow: false,
    showLabels: false
};

class TimeSlotGroup extends Component {
    constructor(props) {
        super(props);
        this.renderSlice = this.renderSlice.bind(this);
        this.renderSlices = this.renderSlices.bind(this);
    }

    renderSlice(slotNumber, content, value) {
        return (
            <TimeSlot
                key={slotNumber}
                showLabel={this.props.showLabels && !slotNumber}
                content={content}
                culture={this.props.culture}
                isNow={this.props.isNow}
                value={value}
            />
        );
    }

    renderSlices() {
        const ret = [];
        const sliceLength = this.props.step;
        let sliceValue = this.props.value;
        for (let i = 0; i < this.props.timeslots; i++) {
            const content = localizer.format(sliceValue, this.props.timeGutterFormat, this.props.culture);
            ret.push(this.renderSlice(i, content, sliceValue));
            sliceValue = date.add(sliceValue, sliceLength, 'minutes');
        }
        return ret;
    }

    render() {
        return <div className="rbc-timeslot-group">{this.renderSlices()}</div>;
    }
}

TimeSlotGroup.propTypes = PROPERTY_TYPES;
TimeSlotGroup.defaultProps = DEFAULT_PROPS;

export default TimeSlotGroup;
