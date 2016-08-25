import '../../assets/scss/components/_date-picker.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import Select from '../select/Select';
import DatePickerCalendar from './DatePickerCalendar';
import Popup from '../Popup';
import Input from '../Input';
import Button from '../button/Button';
import DatePickerPopup from './DatePickerPopup';

import {getToday,
    parse,
    format,
    isDayTheSame,
    isMonthTheSame,
    getFirstDayOfMonth} from '../../util/date-utils';

import {formatDMonthYear, formatFullMonth} from '../../util/date-formats';

const PROPERTY_TYPES = {
    className: React.PropTypes.string,
    value: React.PropTypes.string,
    format: React.PropTypes.string,
    onChange: React.PropTypes.func,
    minDate: React.PropTypes.string,
    maxDate: React.PropTypes.string
};

const DEFAULT_PROPS = {};

class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            month: getFirstDayOfMonth(getToday()),
            value: props.value ? parse(props.value, props.format) : getToday(),
            popupState: 'closed'
        };

        this.handleSelection = this.handleSelection.bind(this);
        this.resetMonth = this.resetMonth.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
            this.setState({
                value: parse(nextProps.value, nextProps.format)
            });
        }
    }

    formatValue() {
        return formatDMonthYear(this.state.value);
    }

    handleSelection(selected) {
        this.setState({
            popupState: 'closing'
        }, () => {
            setTimeout(() => {
                if (!this.isControlled()) {
                    this.setState({
                        value: selected
                    });
                }

                if (this.props.onChange) {
                    this.props.onChange(this.doFormat(selected));
                }
            }, 200);
        });
    }

    doFormat(date) {
        return format(date, this.props.format);
    }

    doParse(date) {
        return parse(date, this.props.format);
    }

    resetMonth() {
        this.setState({
            month: getFirstDayOfMonth(this.state.value)
        });
    }

    isControlled() {
        if (this.props.value) {
            return true;
        } else {
            return false;
        }
    }

    getStyles(date) {
        return classNames('date-picker__date-cell', {
            'date-picker__date-cell--selected': isDayTheSame(date, this.state.value),
            'date-picker__date-cell--of-other-month': !isMonthTheSame(date, this.state.month)
        });
    }

    render() {
        let className = classNames(this.props.className, 'btn-link');

        return (
            <Popup popupClassName="popover-colored"
                   attachment="bottom center"
                   on="click"
                   onPopupStateChange={(newPopupState) => this.setState({popupState: newPopupState})}
                   popupState={this.state.popupState}
                   onTransitionClosedToOpen={() => {this.resetMonth();}}>
                <Button className={className}> {this.formatValue()} </Button>
                <DatePickerPopup month={this.state.month}
                                 onSelected={this.handleSelection}
                                 onMonthChange={(month) => this.setState({month})}
                                 minDate={this.props.minDate ? this.doParse(this.props.minDate) : undefined}
                                 maxDate={this.props.maxDate ? this.doParse(this.props.maxDate) : undefined}
                                 getStyles={(date) => this.getStyles(date)} />
            </Popup>
        );
    }
}

DatePicker.propTypes = PROPERTY_TYPES;
DatePicker.defaultProps = DEFAULT_PROPS;

export default DatePicker;