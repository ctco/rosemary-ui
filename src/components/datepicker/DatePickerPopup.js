import '../../assets/scss/components/_date-picker-popup.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import range from 'lodash/range';

import Select from '../select/Select';
import DatePickerCalendar from './DatePickerCalendar';
import Popup from '../Popup';
import Input from '../Input';
import Button from '../button/Button';

import {getToday,
    addMonths,
    getMonth,
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
    getLastDayOfYear} from '../../util/date-utils';

import {formatDMonthYear, formatFullMonth} from '../../util/date-formats';

const PROPERTY_TYPES = {
    value: React.PropTypes.object,
    month: React.PropTypes.object,
    onSelected: React.PropTypes.func.isRequired,
    onMonthChange: React.PropTypes.func,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    getStyles: React.PropTypes.func
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
            month: props.month,
            value: props.value,
            years: range(getYear(props.minDate), getYear(props.maxDate) + 1).map((item) => {
                return {id: item, displayString: '' + item};
            })
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.month) {
            this.setState({
                month: nextProps.month
            });
        }
    }

    left() {
        if (isMonthBeforeOrTheSame(this.state.month, this.props.minDate)) {
            return;
        }
        let month = addMonths(this.state.month, -1);
        this.updateMonth(month);
    }

    right() {
        if (isMonthAfterOrTheSame(this.state.month, this.props.maxDate)) {
            return;
        }
        let month = addMonths(this.state.month, 1);
        this.updateMonth(month);
    }

    onYearChange(selectedYear) {
        let month = setYear(this.state.month, selectedYear);
        if (isMonthBefore(month, this.props.minDate)) {
            month = this.props.minDate;
        } else if (isMonthAfter(month, this.props.maxDate)) {
            month = this.props.maxDate;
        }
        this.updateMonth(month);
    }

    onMonthChange(selectedMonth) {
        let month = setMonth(this.state.month, selectedMonth);
        this.updateMonth(month);
    }

    updateMonth(month) {
        if (this.isMonthControlled()) {
            this.props.onMonthChange(month);
        } else {
            this.setState({
                month
            });
        }
    }

    isMonthControlled() {
        if (this.props.month) {
            return true;
        } else {
            return false;
        }
    }

    getSelectedMonth() {
        return getMonth(this.state.month);
    }

    getSelectedYear() {
        return getYear(this.state.month);
    }

    getMonthOptions() {
        let result = [];
        let isMinYear = isYearTheSame(this.props.minDate, this.state.month);
        let isMaxYear = isYearTheSame(this.props.maxDate, this.state.month);

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
                       className="im date-picker-popup__arrow date-picker-popup__arrow--left" />
                    <Select className="date-picker-popup__months select--sm"
                            value={this.getSelectedMonth()}
                            onChange={(month) => {this.onMonthChange(month);}}
                            options={this.getMonthOptions()}/>
                    <Select className="date-picker-popup__years select--sm"
                            value={this.getSelectedYear()}
                            onChange={(year) => {this.onYearChange(year);}}
                            options={this.state.years}/>
                    <i onClick={() => this.right()}
                       className="im date-picker-popup__arrow date-picker-popup__arrow--right" />
                </div>
                <DatePickerCalendar onSelected={this.props.onSelected}
                                    month={this.state.month}
                                    minDate={this.props.minDate}
                                    maxDate={this.props.maxDate}
                                    getStyles={this.props.getStyles}/>
                <Button onClick={() => this.props.onSelected(getToday())}
                        className="date-picker__today-link btn-link btn-sm">Today</Button>
            </div>
        );
    }
}

DatePickerPopup.propTypes = PROPERTY_TYPES;
DatePickerPopup.defaultProps = DEFAULT_PROPS;

export default DatePickerPopup;