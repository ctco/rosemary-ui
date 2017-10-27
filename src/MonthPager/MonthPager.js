import React from 'react';

import Button from '../Button/Button';
import MonthPicker from '../MonthPicker/MonthPicker';
import Pager from '../Pager/Pager';

import * as utils from '../util/utils';
import * as dateUtils from '../util/date-utils';
import * as dateFormats from '../util/date-formats';

const PROPERTY_TYPES = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.string
};

const DEFAULT_PROPS = {
    format: dateFormats.DD_MM_YYYY
};

class MonthPager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: dateUtils.getFirstDayOfMonth(dateUtils.getToday())
        };
    }

    prev() {
        let value = dateUtils.addMonths(this.getValue(), -1);
        this.monthChanged(value);
    }

    next() {
        let value = dateUtils.addMonths(this.getValue(), 1);
        this.monthChanged(value);
    }

    onMonthChange(newValue) {
        let value = dateUtils.parse(newValue, this.props.format);
        this.monthChanged(value);
    }

    getValue() {
        return this.parse(this.props.value) || this.state.value;
    }

    monthChanged(value) {
        if (this.props.onChange) {
            this.props.onChange(this.format(value));
        }

        if (!utils.isDefined(this.props.value)) {
            this.setState({
                value
            });
        }
    }

    format(value) {
        return dateUtils.format(value, this.props.format);
    }

    parse(value) {
        return dateUtils.parse(value, this.props.format);
    }

    render() {
        return (
            <Pager onPrevBtnClick={() => this.prev()} onNextBtnClick={() => this.next()}>
                <MonthPicker
                    value={this.format(this.getValue())}
                    format={this.props.format}
                    onChange={value => this.onMonthChange(value)}
                    formatMonth={dateFormats.formatMonthYearHeader}
                >
                    <Button baseClassName="ros-pager__month-picker" />
                </MonthPicker>
            </Pager>
        );
    }
}

MonthPager.propTypes = PROPERTY_TYPES;
MonthPager.defaultProps = DEFAULT_PROPS;

export default MonthPager;
