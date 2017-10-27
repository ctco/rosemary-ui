import React from 'react';
import range from 'lodash/range';

import Select from '../../Select/Select';
import MonthPickerCalendar from '../MonthPickerCalendar/MonthPickerCalendar';
import Button from '../../Button/Button';

import * as dateUtils from '../../util/date-utils';
import * as utils from '../../util/utils';

const PROPERTY_TYPES = {
    value: React.PropTypes.object,
    year: React.PropTypes.number,
    onSelected: React.PropTypes.func.isRequired,
    onYearChange: React.PropTypes.func,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    getStyles: React.PropTypes.func
};

const DEFAULT_PROPS = {
    value: dateUtils.getToday(),
    year: dateUtils.getYear(dateUtils.getToday()),
    minDate: dateUtils.getFirstDayOfYear(dateUtils.addYears(dateUtils.getToday(), -3)),
    maxDate: dateUtils.getLastDayOfYear(dateUtils.addYears(dateUtils.getToday(), 2))
};

class DatePickerPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            year: props.year,
            value: props.value,
            years: range(dateUtils.getYear(props.minDate), dateUtils.getYear(props.maxDate) + 1).map(item => {
                return { id: item, displayString: '' + item };
            })
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.year) {
            this.setState({
                year: nextProps.year
            });
        }
    }

    left() {
        if (this.state.year <= dateUtils.getYear(this.props.minDate)) {
            return;
        }
        this.updateMonth(this.state.year - 1);
    }

    right() {
        if (this.state.year >= dateUtils.getYear(this.props.maxDate)) {
            return;
        }
        this.updateMonth(this.state.year + 1);
    }

    onYearChange(selectedYear) {
        this.updateMonth(selectedYear);
    }

    updateMonth(year) {
        if (this.isYearControlled()) {
            this.props.onYearChange(year);
        } else {
            this.setState({
                year
            });
        }
    }

    isYearControlled() {
        if (utils.isDefined(this.props.year)) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <div tabIndex="-1">
                <div className="month-picker-popup__header">
                    <i
                        onClick={() => this.left()}
                        className="im month-picker-popup__arrow month-picker-popup__arrow--left"
                    />
                    <Select
                        className="month-picker-popup__years select--sm"
                        value={this.state.year}
                        onChange={year => {
                            this.onYearChange(year);
                        }}
                        options={this.state.years}
                    />
                    <i
                        onClick={() => this.right()}
                        className="im month-picker-popup__arrow month-picker-popup__arrow--right"
                    />
                </div>
                <MonthPickerCalendar
                    onSelected={this.props.onSelected}
                    year={this.state.year}
                    minDate={this.props.minDate}
                    maxDate={this.props.maxDate}
                    getStyles={this.props.getStyles}
                />
                <Button
                    onClick={() => this.props.onSelected(dateUtils.getFirstDayOfMonth(dateUtils.getToday()))}
                    className="month-picker-popup__today-link btn-link btn--sm"
                >
                    Current month
                </Button>
            </div>
        );
    }
}

DatePickerPopup.propTypes = PROPERTY_TYPES;
DatePickerPopup.defaultProps = DEFAULT_PROPS;

export default DatePickerPopup;
