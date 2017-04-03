import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import values from 'lodash/values';
import memoize from 'lodash/memoize';
import chunk from 'lodash/chunk';

import {
    isWeekend,
    isFirstDayOfWeek,
    isMonthTheSame,
    isToday,
    isDayBefore,
    isDayAfter,
    getWeekDayByIndex,
    getFirstDayOfMonth,
    getFirstDayOfWeek,
    getFirstDayOfPreviousWeek,
    addDays,
    parse,
    format
} from '../../util/date-utils';

import {
    formatD,
    formatDDMMYYYY,
    parseDDMMYYYY,
    formatWeekDay
} from '../../util/date-formats';

const START_DATE_TYPES = {
    NORMALIZED: 'normalized',
    SIMPLE: 'simple'
};

const WEEKS_IN_CALENDAR = 6;
const DAYS_IN_WEEK = 7;

const PROPERTY_TYPES = {
    startDateType: React.PropTypes.oneOf(values(START_DATE_TYPES)),
    renderDatesOfOtherMonth: React.PropTypes.bool,
    getStyles: React.PropTypes.func,
    onSelected: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    formatDate: React.PropTypes.func,
    formatDataDate: React.PropTypes.func,
    parseDataDate: React.PropTypes.func,
    formatWeekDay: React.PropTypes.func,
    month: React.PropTypes.object.isRequired,
    componentWillUnmount: React.PropTypes.func,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    isValidDate: React.PropTypes.bool
};

const DEFAULT_PROPS = {
    isValidDate: true,
    startDateType: START_DATE_TYPES.NORMALIZED,
    renderDatesOfOtherMonth: true,
    formatDate: formatD,
    formatDataDate: formatDDMMYYYY,
    parseDataDate: parseDDMMYYYY,
    formatWeekDay: formatWeekDay
};

class DatePickerCalendar extends React.Component {
    constructor(props) {
        super(props);

        this.renderDaysOfWeek = memoize(this.renderDaysOfWeek);
    }

    getStart() {
        const firstDayOfMonth = getFirstDayOfMonth(this.props.month);
        if (this.props.startDateType === START_DATE_TYPES.NORMALIZED) {
            if (isFirstDayOfWeek(firstDayOfMonth)) {
                return getFirstDayOfPreviousWeek(firstDayOfMonth);
            } else {
                return getFirstDayOfWeek(firstDayOfMonth);
            }
        }
        return getFirstDayOfWeek(firstDayOfMonth);
    }

    getDates() {
        let rollable = this.getStart();
        let dates = [];
        for (let day = 0; day < WEEKS_IN_CALENDAR * DAYS_IN_WEEK; day++) {
            dates.push(rollable);
            rollable = addDays(rollable, 1);
        }
        return dates;
    }

    componentWillUnmount() {
        if (this.props.componentWillUnmount) {
            this.props.componentWillUnmount();
        }
    }

    retrieveDate(e) {
        let selected = e.currentTarget.getAttribute('data-date');
        return this.parseDataDate(selected);
    }

    handleClick(e) {
        let date = this.retrieveDate(e);
        if (this.isDisabled(date)) {
            return;
        }

        if (this.props.onSelected) {
            this.props.onSelected(date);
        }
    }

    handleMouseEnter(e) {
        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(this.retrieveDate(e));
        }
    }

    handleMouseLeave(e) {
        if (this.props.onMouseLeave) {
            this.props.onMouseLeave();
        }
    }

    getDateStyles(date) {
        if (this.props.getStyles && this.props.isValidDate) {
            return this.props.getStyles(date);
        }
    }

    parseDataDate(date) {
        return this.props.parseDataDate(date);
    }

    formatDataDate(date) {
        return this.props.formatDataDate(date);
    }

    formatDate(date) {
        return this.props.formatDate(date);
    }

    renderDaysOfWeek() {
        let result = [];

        for (let i = 1; i <= 7; i++) {
            let weekday = getWeekDayByIndex(i);
            let formattedWeekday = this.props.formatWeekDay(weekday);
            let isNonWorkingDay = isWeekend(weekday);

            let className = classNames('date-picker-calendar__day-of-week-cell', {
                'date-picker-calendar__day-of-week-cell--non-working': isNonWorkingDay,
                'date-picker-calendar__day-of-week-cell--working': !isNonWorkingDay
            });
            result.push(
                <td key={formattedWeekday} className={className}>{formattedWeekday}</td>
            );
        }
        return result;
    }

    renderDates() {
        let weeks = chunk(this.getDates(), DAYS_IN_WEEK);
        return weeks.map((week, index) => {
            return (
                <tr key={`week-${index}`} className="date-picker-week">
                    {this.renderWeek(week)}
                </tr>
            );
        });
    }

    isDisabled(date) {
        if (this.props.minDate && isDayBefore(date, this.props.minDate)) {
            return true;
        }

        if (this.props.maxDate && isDayAfter(date, this.props.maxDate)) {
            return true;
        }
    }

    renderWeek(week) {
        return week.map((rollable) => {
            let isSameMonth = isMonthTheSame(this.props.month, rollable);
            let className = 'date-picker-calendar__date-cell';
            let formattedDate = this.formatDataDate(rollable);

            if (!this.props.renderDatesOfOtherMonth && !isSameMonth) {
                return (
                    <td key={formattedDate} data-disabled="disabled" className={className}>
                        <div>&nbsp;</div>
                    </td>
                );
            } else {
                let dateStyles = this.getDateStyles(rollable);

                className = classNames(className, dateStyles, {
                    'date-picker-calendar__date-cell--today': isToday(rollable)
                });

                let props = {
                    key: formattedDate,
                    onClick: (e) => this.handleClick(e),
                    onMouseEnter: (e) => this.handleMouseEnter(e),
                    onMouseLeave: (e) => this.handleMouseLeave(e),
                    className: className,
                    'data-date': formattedDate
                };

                if (this.isDisabled(rollable)) {
                    props['data-disabled'] = true;
                }

                return (
                    <td {...props}>
                        <div>
                            {this.formatDate(rollable)}
                        </div>
                    </td>
                );
            }
        });
    }


    render() {
        return (
            <div className="date-picker-calendar">
                <table className="date-picker-calendar__days-of-week">
                    <tbody>
                    <tr>
                        {this.renderDaysOfWeek()}
                    </tr>
                    </tbody>
                </table>
                <table className="date-picker-calendar__grid">
                    <tbody>
                    {this.renderDates()}
                    </tbody>
                </table>
            </div>
        );
    }
}

DatePickerCalendar.propTypes = PROPERTY_TYPES;
DatePickerCalendar.defaultProps = DEFAULT_PROPS;

export default DatePickerCalendar;