import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import chunk from 'lodash/chunk';

import * as dateUtils from '../../util/date-utils';
import * as dateFormats from '../../util/date-formats';

import {
    formatDDMMYYYY,
    parseDDMMYYYY
} from '../../util/date-formats';

const MONTHS_IN_ROW = 4;

const PROPERTY_TYPES = {
    getStyles: React.PropTypes.func,
    onSelected: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    formatDataDate: React.PropTypes.func,
    parseDataDate: React.PropTypes.func,
    formatMonth: React.PropTypes.func,
    year: React.PropTypes.number.isRequired,
    componentWillUnmount: React.PropTypes.func,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object
};

const DEFAULT_PROPS = {
    formatDataDate: formatDDMMYYYY,
    parseDataDate: parseDDMMYYYY,
    formatMonth: dateFormats.formatShortMonth
};

class MonthPickerCalendar extends React.Component {
    constructor(props) {
        super(props);
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
        if (this.props.getStyles) {
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

    renderMonths() {
        let months = chunk(dateUtils.getFirstDaysOfAllMonths(this.props.year), MONTHS_IN_ROW);
        return months.map((month, index) => {
            return (
                <tr key={`month-${index}`}>
                    {this.renderRow(month)}
                </tr>
            );
        });
    }

    isDisabled(month) {
        if (this.props.minDate && dateUtils.isMonthBefore(month, this.props.minDate)) {
            return true;
        }

        if (this.props.maxDate && dateUtils.isMonthAfter(month, this.props.maxDate)) {
            return true;
        }
    }

    renderRow(month) {
        return month.map((month) => {
            let className = classNames('month-picker-calendar__month-cell', this.getDateStyles(month), {
                'month-picker-calendar__month-cell--today': dateUtils.isCurrentMonth(month)
            });

            let formattedMonth = this.formatDataDate(month);

            let props = {
                key: formattedMonth,
                onClick: (e) => this.handleClick(e),
                onMouseEnter: (e) => this.handleMouseEnter(e),
                onMouseLeave: (e) => this.handleMouseLeave(e),
                className: className,
                'data-date': formattedMonth
            };

            if (this.isDisabled(month)) {
                props['data-disabled'] = true;
            }

            return (
                <td {...props}>
                    <div>
                        {this.props.formatMonth(month)}
                    </div>
                </td>
            );
        });
    }


    render() {
        return (
            <div className="month-picker-calendar">
                <table className="month-picker-calendar__grid">
                    <tbody>
                    {this.renderMonths()}
                    </tbody>
                </table>
            </div>
        );
    }
}

MonthPickerCalendar.propTypes = PROPERTY_TYPES;
MonthPickerCalendar.defaultProps = DEFAULT_PROPS;

export default MonthPickerCalendar;