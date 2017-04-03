import React from 'react';
import ReactDOM from 'react-dom';
import range from 'lodash/range';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';

import Select from '../select/Select';
import DatePickerCalendar from './DatePickerCalendar';
import Button from '../button/Button';

import {
    getToday,
    addMonths,
    getMonth,
    parse,
    getYear,
    setMonth,
    setYear,
    addYears,
    getMonths,
    isMonthBefore,
    isMonthAfter,
    isMonthBeforeOrTheSame,
    isMonthAfterOrTheSame,
    isYearTheSame,
    getFirstDayOfMonth,
    getFirstDayOfYear,
    isValidDate,
    getLastDayOfYear
} from '../../util/date-utils';

import {formatFullMonth} from '../../util/date-formats';

const PROPERTY_TYPES = {
    value: React.PropTypes.any,
    onSelected: React.PropTypes.func.isRequired,
    onMonthChange: React.PropTypes.func,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    getStyles: React.PropTypes.func,
    format: React.PropTypes.string.isRequired
};

const DEFAULT_PROPS = {
    value: getToday(),
    month: getFirstDayOfMonth(getToday()),
    minDate: getFirstDayOfYear(addYears(getToday(), -3)),
    maxDate: getLastDayOfYear(addYears(getToday(), 2))
};

class DatePickerPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isValidDate: this._isValidDate(props.value),
            value: this._getValue(props.value),
            years: range(getYear(props.minDate), getYear(props.maxDate) + 1).map((item) => {
                return {id: item, displayString: '' + item};
            })
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
            this.setState({
                isValidDate: this._isValidDate(nextProps.value),
                value: this._getValue(nextProps.value)
            });
        }
    }

    _isValidDate(value) {
        if (isObject(value)) {
            return true;
        }
        return isString(value) && isValidDate(value, this.props.format);
    }

    _getValue(value) {
        if (isObject(value)) {
            return value;
        }

        if (isString(value) && isValidDate(value, this.props.format)) {
            return parse(value, this.props.format);
        }

        return getToday();
    }

    left() {
        if (isMonthBeforeOrTheSame(this.state.value, this.props.minDate)) {
            return;
        }
        let month = addMonths(this.state.value, -1);
        this.updateMonth(month);
    }

    right() {
        if (isMonthAfterOrTheSame(this.state.value, this.props.maxDate)) {
            return;
        }
        let month = addMonths(this.state.value, 1);
        this.updateMonth(month);
    }

    onYearChange(selectedYear) {
        let month = setYear(this.state.value, selectedYear);
        if (isMonthBefore(month, this.props.minDate)) {
            month = this.props.minDate;
        } else if (isMonthAfter(month, this.props.maxDate)) {
            month = this.props.maxDate;
        }
        this.updateMonth(month);
    }

    onMonthChange(selectedMonth) {
        let month = setMonth(this.state.value, selectedMonth);
        this.updateMonth(month);
    }

    updateMonth(value) {
        if (this.isMonthControlled()) {
            this.props.onMonthChange(value);
        } else {
            this.setState({
                value
            });
        }
    }

    isMonthControlled() {
        if (this.props.value) {
            return true;
        } else {
            return false;
        }
    }

    getSelectedMonth() {
        if (isObject(this.state.value)) {
            return getMonth(this.state.value);
        }
        return null;
    }

    getSelectedYear() {
        if (isObject(this.state.value)) {
            return getYear(this.state.value);
        }
        return null;
    }

    getMonthOptions() {
        let result = [];
        let isMinYear = isYearTheSame(this.props.minDate, this.state.value);
        let isMaxYear = isYearTheSame(this.props.maxDate, this.state.value);

        if (!isMinYear && !isMaxYear) {
            return getMonths().map((item, index) => {
                return {id: index, displayString: '' + item};
            });
        }

        let start = isMinYear ? this.props.minDate : getFirstDayOfYear(this.props.maxDate);
        let end = isMaxYear ? this.props.maxDate : getLastDayOfYear(this.props.minDate);

        let rollable = start;
        while (isMonthBeforeOrTheSame(rollable, end)) {
            result.push({
                id: getMonth(rollable),
                displayString: formatFullMonth(rollable)
            });
            rollable = addMonths(rollable, 1);
        }

        return result;
    }

    render() {
        return (
            <div tabIndex="-1">
                <div className="date-picker-popup__header">
                    <i onClick={() => this.left()}
                       className="im date-picker-popup__arrow date-picker-popup__arrow--left"/>
                    <Select className="date-picker-popup__months select--sm"
                            value={this.getSelectedMonth()}
                            onChange={(month) => {
                                this.onMonthChange(month);
                            }}
                            options={this.getMonthOptions()}/>
                    <Select className="date-picker-popup__years select--sm"
                            value={this.getSelectedYear()}
                            onChange={(year) => {
                                this.onYearChange(year);
                            }}
                            options={this.state.years}/>
                    <i onClick={() => this.right()}
                       className="im date-picker-popup__arrow date-picker-popup__arrow--right"/>
                </div>
                <DatePickerCalendar onSelected={this.props.onSelected}
                                    isValidDate={this.state.isValidDate}
                                    month={this.state.value}
                                    minDate={this.props.minDate}
                                    maxDate={this.props.maxDate}
                                    getStyles={this.props.getStyles}/>
                <Button onClick={() => this.props.onSelected(getToday())}
                        className="date-picker__today-link btn-link btn--sm">Today</Button>
            </div>
        );
    }
}

DatePickerPopup.propTypes = PROPERTY_TYPES;
DatePickerPopup.defaultProps = DEFAULT_PROPS;

export default DatePickerPopup;