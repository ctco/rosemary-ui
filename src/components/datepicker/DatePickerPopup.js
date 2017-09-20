import React from 'react';
import range from 'lodash/range';

import Select from '../select/Select';
import DatePickerCalendar from './DatePickerCalendar';
import Button from '../button/Button';

import {
    getToday,
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
    getLastDayOfYear
} from '../../util/date-utils';

import {formatFullMonth} from '../../util/date-formats';

const PROPERTY_TYPES = {
    month: React.PropTypes.object, //moment
    onSelected: React.PropTypes.func.isRequired,
    onMonthChange: React.PropTypes.func,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    getStyles: React.PropTypes.func,
    format: React.PropTypes.string.isRequired
};

const DEFAULT_PROPS = {
    month: getFirstDayOfMonth(getToday()),
    minDate: getFirstDayOfYear(addYears(getToday(), -3)),
    maxDate: getLastDayOfYear(addYears(getToday(), 2))
};

class DatePickerPopup extends React.Component {
    constructor(props) {
        super(props);

        this.years = range(getYear(props.minDate), getYear(props.maxDate) + 1).map((item) => {
            return {id: item, displayString: '' + item};
        });
    }

    left() {
        if (isMonthBeforeOrTheSame(this.props.month, this.props.minDate)) {
            return;
        }
        let month = addMonths(this.props.month, -1);
        this.updateMonth(month);
    }

    right() {
        if (isMonthAfterOrTheSame(this.props.month, this.props.maxDate)) {
            return;
        }
        let month = addMonths(this.props.month, 1);
        this.updateMonth(month);
    }

    onYearChange(selectedYear) {
        let month = setYear(this.props.month, selectedYear);
        if (isMonthBefore(month, this.props.minDate)) {
            month = this.props.minDate;
        } else if (isMonthAfter(month, this.props.maxDate)) {
            month = this.props.maxDate;
        }
        this.updateMonth(month);
    }

    onMonthChange(selectedMonth) {
        let month = setMonth(this.props.month, selectedMonth);
        this.updateMonth(month);
    }

    updateMonth(month) {
        this.props.onMonthChange(month);
    }

    getSelectedMonth() {
        return getMonth(this.props.month);
    }

    getSelectedYear() {
        return getYear(this.props.month);
    }

    getMonthOptions() {
        let result = [];
        let isMinYear = isYearTheSame(this.props.minDate, this.props.month);
        let isMaxYear = isYearTheSame(this.props.maxDate, this.props.month);

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
                            options={this.years}/>
                    <i onClick={() => this.right()}
                       className="im date-picker-popup__arrow date-picker-popup__arrow--right"/>
                </div>
                <DatePickerCalendar onSelected={this.props.onSelected}
                                    month={this.props.month}
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