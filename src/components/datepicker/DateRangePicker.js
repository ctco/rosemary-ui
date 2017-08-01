import React from 'react';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {addMonths, getToday, isAfter, isBetweenNotInclusive, isDayTheSame} from '../../util/date-utils';

import {formatDDMMYYYY, formatFullMonthYear, parseDDMMYYYY} from '../../util/date-formats';

import {isDefined} from '../../util/utils';

import DatePickerCalendar from './DatePickerCalendar';
import Popup from '../Popup';
import IconInput from '../IconInput';

const PROPERTY_TYPES = {
    format: React.PropTypes.func,
    parse: React.PropTypes.func,
    formatHeader: React.PropTypes.func,
    open: React.PropTypes.bool,
    onPopupStateChange: React.PropTypes.func,
    value: React.PropTypes.shape({
        from: React.PropTypes.string,
        to: React.PropTypes.string
    })
};
const DEFAULT_PROPS = {
    format: formatDDMMYYYY,
    parse: parseDDMMYYYY,
    formatHeader: formatFullMonthYear,
    value: {
        from: '',
        to: ''
    }
};


class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: getToday(),
            over: null,
            animation: 'date-range-picker__calendar--animation-right',
            open: false
        };

        this.handleSelection = this.handleSelection.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.getDateStyles = this.getDateStyles.bind(this);
        this.transitioning = false;
    }

    componentDidMount() {
        this.setState({
            from: (this.props.value.from) ? this.parseDate(this.props.value.from) : null,
            fromText: ((this.props.value.from)) ? this.props.value.from : '',
            to: (this.props.value.to) ? this.parseDate(this.props.value.to) : null,
            toText: (this.props.value.to) ? this.props.value.to : ''
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
            let from = nextProps.value.from;
            let to = nextProps.value.to;
            this.setState({
                from: this.parseDate(from),
                fromText: from,
                to: this.parseDate(to),
                toText: to
            });
        }

        if (isDefined(nextProps.open)) {
            this.setState({
                open: nextProps.open
            });
        }
    }

    isPopupControlled() {
        return isDefined(this.props.open);
    }

    isControlled() {
        return isDefined(this.props.value);
    }

    isOpen() {
        if (this.isPopupControlled()) {
            return this.props.open;
        }

        return this.state.open;
    }

    left() {
        if (this.transitioning) {
            return;
        }
        this.transitioning = true;

        this.setState({
            month: addMonths(this.state.month, -1),
            animation: 'date-range-picker__calendar--animation-left'
        });
    }

    right() {
        if (this.transitioning) {
            return;
        }
        this.transitioning = true;

        this.setState({
            month: addMonths(this.state.month, 1),
            animation: 'date-range-picker__calendar--animation-right'
        });
    }

    getDateStyles(date) {
        let isFrom = isDayTheSame(date, this.state.from);
        let isTo = isDayTheSame(date, this.state.to);
        let isBetween = isBetweenNotInclusive(date, this.state.from, this.state.to || this.state.over);
        let isHovered = this.state.over && isDayTheSame(date, this.state.over);
        let isFromOnHover = !isTo && !isBetween && isHovered && this.isFromDateWillBePlaced(this.state.over);
        let isToOnHover = !isBetween && isHovered && !isFromOnHover;

        return classNames({
            'date-range-picker__cell--between': isBetween && !isHovered,
            'date-range-picker__cell--from': isFrom || isFromOnHover,
            'date-range-picker__cell--to': isTo || isToOnHover,
            'date-range-picker__cell--hover-square': isBetween && isHovered
        });
    }

    handleSelection(selected) {
        if (this.isFromDateWillBePlaced(selected)) {
            this.updateStateFromTo(selected, this.formatDate(selected), null, '');
        } else {
            this.updateStateTo(selected, this.formatDate(selected));
        }
    }

    isFromDateWillBePlaced(selected) {
        return !this.state.from || (this.state.from && this.state.to) || isAfter(this.state.from, selected);
    }

    handleMouseEnter(selected) {
        this.setState({
            over: selected
        });
    }

    handleMouseLeave() {
        this.setState({
            over: null
        });
    }

    updateFrom(value) {
        this.updateStateFrom(this.parseDate(value), value);
    }

    updateTo(value) {
        this.updateStateTo(this.parseDate(value), value);
    }

    updateStateFromTo(from, fromText, to, toText) {
        if (this.isControlled()) {
            this.fireChangeEvent(fromText, toText);
        } else {
            this.setState({
                from,
                fromText,
                to,
                toText
            }, this.fireChangeEventByState());
        }

    }

    updateStateTo(to, toText) {
        let open = this.state.from === null || to === null;
        if (this.isControlled()) {
            this.fireChangeEvent(this.state.fromText, toText, open);
        } else {
            this.setState({
                to,
                toText,
                open
            }, this.fireChangeEventByState);
        }
    }

    updateStateFrom(from, fromText) {
        let open = this.state.to === null || from === null;
        if (this.isControlled()) {
            this.fireChangeEvent(fromText, this.state.toText, open);
        } else {
            this.setState({
                from,
                fromText,
                open
            }, this.fireChangeEventByState);
        }
    }

    fireChangeEventByState() {
        this.fireChangeEvent(this.state.fromText, this.state.toText, this.state.open);
    }

    fireChangeEvent(fromText, toText, open = true) {
        if (this.props.onChange) {
            this.props.onChange({
                from: fromText,
                to: toText
            });
        }
        this.changePopupState(open);
    }

    changePopupState(open) {
        if (!this.isPopupControlled()) {
            this.setState({open});
        }
        if (this.props.onPopupStateChange) {
            this.props.onPopupStateChange(open);
        }
    }

    formatDate(date) {
        if (date) {
            return this.props.format(date);
        }
        return null;
    }

    parseDate(date) {
        let parsed = this.props.parse(date);
        if (parsed.isValid()) {
            return parsed;
        } else {
            return null;
        }
    }

    resetMonth() {
        this.setState({
            month: this.state.from || this.state.to || getToday()
        });
    }

    renderCalendars() {
        let left = this.state.month;
        let right = addMonths(left, 1);
        let calendars = [];
        calendars.push(this.renderCalendar(left));
        calendars.push(this.renderCalendar(right));
        return calendars;
    }

    renderCalendar(date) {
        let formattedDate = this.props.formatHeader(date);
        return (
            <div className="date-range-picker__calendar" key={formattedDate}>
                <div className="date-range-picker__header">
                    {formattedDate}
                </div>
                <DatePickerCalendar onSelected={this.handleSelection}
                                    onMouseEnter={this.handleMouseEnter}
                                    onMouseLeave={this.handleMouseLeave}
                                    getStyles={this.getDateStyles}
                                    componentWillUnmount={() => {
                                        this.transitioning = false;
                                    }}
                                    month={date}
                                    startDateType="simple"
                                    renderDatesOfOtherMonth={false}/>
            </div>
        );
    }

    render() {
        let drpClassNames = classNames(this.props.className, 'date-range-picker-control');

        console.dir(this.state);
        return (
            <Popup popupClassName="popover-colored"
                   attachment="bottom left"
                   open={this.isOpen()}
                   onPopupStateChange={(open) => this.changePopupState(open)}
                   on="focus"
                   onTransitionClosedToOpen={() => {
                       this.resetMonth();
                   }}>
                <div className={drpClassNames}>
                    <IconInput value={this.state.fromText}
                               onChange={(value) => this.updateFrom(value)}
                               className="date-range-picker-control__input"
                               position="right"
                               iconClassName="im icon-calendar-from"/>
                    <IconInput value={this.state.toText}
                               onChange={(value) => this.updateTo(value)}
                               className="date-range-picker-control__input"
                               position="right"
                               iconClassName="im icon-calendar-to"/>
                </div>
                <div tabIndex="-1" className="date-range-picker">
                    <i onClick={() => this.left()} className="im icon-arrow-thin-left date-range-picker__arrow"/>
                    <ReactCSSTransitionGroup transitionEnter={true}
                                             transitionLeave={true}
                                             transitionEnterTimeout={300}
                                             transitionLeaveTimeout={300}
                                             transitionName={this.state.animation}
                                             className="date-range-picker__calendars">
                        {this.renderCalendars()}
                    </ReactCSSTransitionGroup>
                    <i onClick={() => this.right()} className="im icon-arrow-thin-right date-range-picker__arrow"/>
                </div>
            </Popup>
        );
    }
}

DatePicker.propTypes = PROPERTY_TYPES;
DatePicker.defaultProps = DEFAULT_PROPS;

export default DatePicker;