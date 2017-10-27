import React from 'react';
import classNames from 'classnames';

import Popup from '../Popup/Popup';
import MonthPickerPopup from './MonthPickerPopup';

import { withIdAndTypeContext } from '../util/hoc/WithIdAndTypeHOC';

import * as dateUtils from '../util/date-utils';
import * as dateFormats from '../util/date-formats';

const PROPERTY_TYPES = {
    className: React.PropTypes.string,
    baseClassName: React.PropTypes.string,
    value: React.PropTypes.string,
    format: React.PropTypes.string,
    onChange: React.PropTypes.func,
    minDate: React.PropTypes.string,
    maxDate: React.PropTypes.string,
    formatMonth: React.PropTypes.func,
    target: React.PropTypes.element
};

const DEFAULT_PROPS = {
    baseClassName: 'btn btn-link',
    formatMonth: dateFormats.formatShortMonthYear
};

class MonthPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            year: dateUtils.getYear(dateUtils.getToday()),
            value: props.value
                ? dateUtils.parse(props.value, props.format)
                : dateUtils.getFirstDayOfMonth(dateUtils.getToday()),
            open: false
        };

        this.handleSelection = this.handleSelection.bind(this);
        this.resetYear = this.resetYear.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
            this.setState({
                value: dateUtils.parse(nextProps.value, nextProps.format)
            });
        }
    }

    formatValue() {
        return this.props.formatMonth(this.state.value);
    }

    handleSelection(selected) {
        this.setState(
            {
                open: false
            },
            () => {
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
            }
        );
    }

    doFormat(date) {
        return dateUtils.format(date, this.props.format);
    }

    doParse(date) {
        return dateUtils.parse(date, this.props.format);
    }

    resetYear() {
        this.setState({
            year: dateUtils.getYear(this.state.value)
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
        return classNames('month-picker__date-cell', {
            'month-picker__date-cell--selected': dateUtils.isMonthTheSame(date, this.state.value)
        });
    }

    getTarget() {
        let target = React.Children.only(this.props.children);
        return React.cloneElement(target, {
            id: this.props.id,
            value: this.formatValue()
        });
    }

    render() {
        return (
            <Popup
                popupClassName="popover-colored"
                attachment="bottom center"
                on="click"
                onPopupStateChange={open => this.setState({ open })}
                open={this.state.open}
                onTransitionClosedToOpen={() => {
                    this.resetYear();
                }}
            >
                {this.getTarget()}
                <MonthPickerPopup
                    year={this.state.year}
                    onSelected={this.handleSelection}
                    onYearChange={year => this.setState({ year })}
                    minDate={this.props.minDate ? this.doParse(this.props.minDate) : undefined}
                    maxDate={this.props.maxDate ? this.doParse(this.props.maxDate) : undefined}
                    getStyles={date => this.getStyles(date)}
                />
            </Popup>
        );
    }
}

MonthPicker.propTypes = PROPERTY_TYPES;
MonthPicker.defaultProps = DEFAULT_PROPS;

export default withIdAndTypeContext(MonthPicker);
