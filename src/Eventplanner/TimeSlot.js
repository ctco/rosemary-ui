import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const PROPERTY_TYPES = {
    value: PropTypes.instanceOf(Date).isRequired,
    isNow: PropTypes.bool,
    showLabel: PropTypes.bool,
    content: PropTypes.string,
    culture: PropTypes.string
};

const DEFAULT_PROPS = {
    isNow: false,
    showLabel: false,
    content: ''
};

class TimeSlot extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={cn('rbc-time-slot', this.props.showLabel && 'rbc-label', this.props.isNow && 'rbc-now')}>
                {this.props.showLabel && <span>{this.props.content}</span>}
            </div>
        );
    }
}

TimeSlot.propTypes = PROPERTY_TYPES;
TimeSlot.defaultProps = DEFAULT_PROPS;

export default TimeSlot;
