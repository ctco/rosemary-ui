import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';
import isNull from 'lodash/isNull';

import Popup from '../Popup';
import DatePickerPopup from './DatePickerPopup';
import { withIdAndTypeContext } from '../util/hoc/WithIdAndTypeHOC';

import {
    getToday,
    parse,
    format,
    isDayTheSame,
    isMonthTheSame,
    getFirstDayOfMonth,
    DD_MM_YYYY
} from '../util/date-utils';

import { formatDMonthYear } from '../util/date-formats';
import Input from '../Input';

const PROPERTY_TYPES = {
    disabled: PropTypes.bool,
    className: PropTypes.string,
    value: PropTypes.string,
    format: PropTypes.string,
    onChange: PropTypes.func,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    attachment: PropTypes.oneOf(Object.keys(Popup.attachmentPositions))
};

const DEFAULT_PROPS = {
    onChange: noop,
    format: DD_MM_YYYY,
    attachment: 'bottom center',
    disabled: false
};

class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
        this._triggerOnChange = debounce(this._triggerOnChange, 50).bind(this);
        this._handleSelection = this._handleSelection.bind(this);
    }

    formatValue = () => {
        if (!this.props.value) {
            return '';
        }

        const momentValue = this.getMomentValue(this.props.value);

        if (isNull(momentValue)) {
            return this.props.value;
        }

        return formatDMonthYear(momentValue);
    };

    _handleSelection(selected) {
        this.setState(
            {
                open: false
            },
            () => {
                setTimeout(() => {
                    this.props.onChange(this.doFormat(selected));
                }, 200);
            }
        );
    }

    doFormat(date) {
        return format(date, this.props.format);
    }

    doParse(date) {
        return parse(date, this.props.format);
    }

    getStyles(date) {
        return classNames('date-picker__date-cell', {
            'date-picker__date-cell--selected': isDayTheSame(date, this.getMomentValue(this.props.value)),
            'date-picker__date-cell--of-other-month': !isMonthTheSame(date, this.state.month)
        });
    }

    _triggerOnChange(value) {
        this.props.onChange(value);
    }

    _getTarget() {
        let target = React.Children.only(this.props.children);
        this.isInput = target.type === Input;

        return React.cloneElement(target, {
            id: this.props.id,
            value: this.isInput ? this.props.value || '' : this.formatValue(),
            onChange: this._handleInputChange,
            disabled: this.props.disabled
        });
    }

    _handleInputChange = value => {
        const moment = this.getMomentValue(value);
        if (!isNull(moment)) {
            this.resetMonth(value);
        }

        this.props.onChange(value);
    };

    resetMonth = value => {
        const momentValue = this.getMomentValue(value);
        const month = isNull(momentValue) ? getToday() : momentValue;

        this.handleMonthChange(getFirstDayOfMonth(month));
    };

    getMomentValue = value => {
        const parsed = this.doParse(value);

        if (parsed.isValid()) {
            return parsed;
        }

        return null;
    };

    handleMonthChange = month => {
        this.setState({ month });
    };

    handlePopupStateChange = open => {
        if (this.props.disabled) {
            return;
        }

        this.setState({ open });
    };

    render() {
        return (
            <Popup
                popupClassName="popover-colored"
                attachment={this.props.attachment}
                on="focus"
                onPopupStateChange={this.handlePopupStateChange}
                open={this.state.open}
                onTransitionClosedToOpen={() => {
                    this.resetMonth(this.props.value);
                }}
            >
                {this._getTarget()}
                <DatePickerPopup
                    month={this.state.month}
                    format={this.props.format}
                    onSelected={this._handleSelection}
                    onMonthChange={this.handleMonthChange}
                    minDate={this.props.minDate ? this.doParse(this.props.minDate) : undefined}
                    maxDate={this.props.maxDate ? this.doParse(this.props.maxDate) : undefined}
                    getStyles={date => this.getStyles(date)}
                />
            </Popup>
        );
    }
}

DatePicker.propTypes = PROPERTY_TYPES;
DatePicker.defaultProps = DEFAULT_PROPS;

export default withIdAndTypeContext(DatePicker);
