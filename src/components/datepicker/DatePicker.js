import React from 'react';
import classNames from 'classnames';

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
    isValidDate
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

const DEFAULT_PROPS = {};

class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            month: getFirstDayOfMonth(getToday()),
            inputValue: this.doFormat(props.value ? parse(props.value, props.format) : getToday()),
            value: props.value ? parse(props.value, props.format) : getToday(),
            open: false
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
            open: false
        }, () => {
            setTimeout(() => {
                if (!this.isControlled()) {
                    this.setState({
                        value: selected,
                        inputValue: this.doFormat(selected)
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

    _getInput() {
        return (
            <div style={{display: 'inline-block'}}>
                <Input value={this.state.inputValue} onChange={(value) => {
                    this.setState({
                        inputValue: value
                    });
                    if (isValidDate(value, this.props.format)) {
                        const parsed = this.doParse(value);
                        this.setState({
                            value: parsed,
                            month: parsed
                        });
                    }
                }}/>
            </div>
        );
    }

    _getTarget() {
        let className = classNames(this.props.className, 'btn-link');

        switch (this.props.targetType) {
            case DatePicker.Types.INPUT:
                return this._getInput();
            default:
                return <Button id={this.props.id} className={className}> {this.formatValue()} </Button>;
        }
    }

    render() {
        return (
            <Popup popupClassName="popover-colored"
                   attachment="bottom center"
                   on="click"
                   onPopupStateChange={(open) => this.setState({open})}
                   open={this.state.open}
                   onTransitionClosedToOpen={() => {
                       this.resetMonth();
                   }}>
                {this._getTarget()}
                <DatePickerPopup month={this.state.month}
                                 onSelected={this.handleSelection}
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