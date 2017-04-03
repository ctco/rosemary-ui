import React from 'react';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import debounce from 'lodash/debounce';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';

import Popup from '../Popup';
import Button from '../button/Button';
import Input from '../Input';
import DatePickerPopup from './DatePickerPopup';
import {withIdAndTypeContext} from '../hoc/WithIdAndTypeHOC';

import {
    getToday,
    parse,
    format,
    isDayTheSame,
    isMonthTheSame,
    getFirstDayOfMonth,
    isValidDate,
    DD_MM_YYYY
} from '../../util/date-utils';

import {formatDMonthYear} from '../../util/date-formats';

const TargetTypes = {
    INPUT: 'input'
};

const PROPERTY_TYPES = {
    className: React.PropTypes.string,
    value: React.PropTypes.string,
    format: React.PropTypes.string,
    onChange: React.PropTypes.func,
    minDate: React.PropTypes.string,
    maxDate: React.PropTypes.string,
    targetType: React.PropTypes.oneOf([TargetTypes.INPUT])
};

const DEFAULT_PROPS = {
    onChange: () => {
    },
    format: DD_MM_YYYY
};

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        let initialValue = props.value ? parse(props.value, props.format) : getToday();

        this.state = {
            month: getFirstDayOfMonth(initialValue),
            value: initialValue,
            open: false
        };
        this._triggerOnChange = debounce(this._triggerOnChange, 50).bind(this);
        this._handleSelection = this._handleSelection.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
            this.setState({
                value: nextProps.value,
                month: nextProps.value
            });
        }
    }

    formatValue() {
        return isString(this.state.value) ?
            formatDMonthYear(this.doParse(this.state.value)) : formatDMonthYear(this.state.value);
    }

    _handleSelection(selected) {
        this.setState({
            open: false
        }, () => {
            setTimeout(() => {
                if (!this.isControlled()) {
                    this.setState({
                        value: selected
                    });
                }
                this.props.onChange(this.doFormat(selected));
            }, 200);
        });
    }

    doFormat(date) {
        return format(date, this.props.format);
    }

    doParse(date) {
        return parse(date, this.props.format);
    }

    isControlled() {
        return !isUndefined(this.props.value);
    }

    getStyles(date) {
        return classNames('date-picker__date-cell', {
            'date-picker__date-cell--selected': isDayTheSame(date, this._getValue(this.state.month)),
            'date-picker__date-cell--of-other-month': !isMonthTheSame(date, this._getValue(this.state.month))
        });
    }

    _getValue(val) {
        if (isObject(val)) {
            return val;
        }
        if (isString(val) && isValidDate(val, this.props.format)) {
            return this.doParse(val);
        }
    }

    _getInputValue(value) {
        if (isObject(value)) {
            return this.doFormat(value);
        }

        return value;
    }

    _triggerOnChange(value) {
        this.props.onChange(value);
    }

    _getInput() {
        return (
            <div style={{display: 'inline-block'}}>
                <Input value={this._getInputValue(this.state.value)} onChange={(value) => {
                    this.setState({
                        value
                    });
                    this._triggerOnChange(value);
                }}/>
            </div>
        );
    }

    _getTarget() {
        let className = classNames(this.props.className, 'btn-link');

        if (this.props.targetType === DatePicker.Types.INPUT) {
            return this._getInput();
        }

        return <Button id={this.props.id} className={className}> {this.formatValue()}</Button>;
    }

    resetMonth() {
        this.setState({
            month: getFirstDayOfMonth(this.state.value)
        });
    }

    render() {
        return (
            <Popup popupClassName="popover-colored"
                   attachment="bottom center"
                   on="focus"
                   onPopupStateChange={(open) => this.setState({open})}
                   open={this.state.open}
            >
                {this._getTarget()}
                <DatePickerPopup value={this.state.month}
                                 onTransitionClosedToOpen={() => {
                                     this.resetMonth();
                                 }}
                                 format={this.props.format}
                                 onSelected={this._handleSelection}
                                 onMonthChange={(month) => this.setState({month})}
                                 minDate={this.props.minDate ? this.doParse(this.props.minDate) : undefined}
                                 maxDate={this.props.maxDate ? this.doParse(this.props.maxDate) : undefined}
                                 getStyles={(date) => this.getStyles(date)}/>
            </Popup>
        );
    }
}

DatePicker.propTypes = PROPERTY_TYPES;
DatePicker.defaultProps = DEFAULT_PROPS;
DatePicker.Types = TargetTypes;
export default withIdAndTypeContext(DatePicker);