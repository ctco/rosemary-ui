import React from 'react';
import {findDOMNode} from 'react-dom';
import cn from 'classnames';
import dates from './utils/dates';
import localizer from './localizer';
import chunk from 'lodash/chunk';
import collection from 'lodash/collection';

import {navigate} from './utils/constants';
import {notify} from './utils/helpers';
import getHeight from 'dom-helpers/query/height';
import getPosition from 'dom-helpers/query/position';
import raf from 'dom-helpers/util/requestAnimationFrame';
import {parse, isDateBetween, isDatesSame, isDateBefore} from '../../util/date-utils';

import EventRow from './EventRow';
import EventEndingRow from './EventEndingRow';
import Popup from './Popup';
import Overlay from 'react-overlays/lib/Overlay';
import BackgroundCells from './BackgroundCells';

import {dateFormat} from './utils/propTypes';
import {
    segStyle, inRange, eventSegments
    , endOfRange, eventLevels, sortEvents
} from './utils/eventLevels';

let eventsForWeek = (evts, start, end, props) =>
    evts.filter((e) => inRange(e, start, end, props));

let isSegmentInSlot = (seg, slot) => seg.left <= slot && seg.right >= slot;

const PROPERTY_TYPES = {
    culture: React.PropTypes.string,

    date: React.PropTypes.instanceOf(Date),

    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date),

    dateFormat,

    weekdayFormat: dateFormat,

    popup: React.PropTypes.bool,

    popupOffset: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.shape({
            x: React.PropTypes.number,
            y: React.PropTypes.number
        })
    ]),

    onSelectEvent: React.PropTypes.func,
    onSelectSlot: React.PropTypes.func
};

class MonthView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowLimit: 5,
            needLimitMeasure: true,
            startDate: null,
            endDate: null,
            dropSelection: false
        };

        this.renderWeek = this.renderWeek.bind(this);
        this.renderBackground = this.renderBackground.bind(this);
        this.renderRowLevel = this.renderRowLevel.bind(this);
        this.renderShowMore = this.renderShowMore.bind(this);
        this._dates = this._dates.bind(this);
        this._headers = this._headers.bind(this);
        this._renderMeasureRows = this._renderMeasureRows.bind(this);
        this._renderOverlay = this._renderOverlay.bind(this);
        this._measureRowLimit = this._measureRowLimit.bind(this);
        this._dateClick = this._dateClick.bind(this);
        this._selectEvent = this._selectEvent.bind(this);
        this._selectDates = this._selectDates.bind(this);
        this._showMore = this._showMore.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
    }

    componentWillMount() {
        this._bgRows = [];
        this._pendingSelection = [];
    }

    componentWillReceiveProps({date}) {
        this.setState({
            needLimitMeasure: !dates.eq(date, this.props.date)
        });
    }

    componentDidMount() {
        let running;

        if (this.state.needLimitMeasure)
            this._measureRowLimit(this.props);

        window.addEventListener('click', this._dropSelection = (e) => {
            if (!e.target.closest('.rbc-calendar')) {
                this._reset();
            }
        });

        window.addEventListener('resize', this._resizeListener = () => {
            if (!running) {
                raf(() => {
                    running = false;
                    this.setState({needLimitMeasure: true}); //eslint-disable-line
                });
            }
        }, false);
    }

    componentDidUpdate() {
        if (this.state.needLimitMeasure)
            this._measureRowLimit(this.props);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._resizeListener, false);
        window.removeEventListener('resize', this._dropSelection, false);
    }

    renderWeek(week, weekIdx, content) {
        let {first, last} = endOfRange(week);
        let evts = eventsForWeek(this.props.events, week[0], week[week.length - 1], this.props);
        let nonWorkingDays = this.props.nonWorkingDays;
        evts.sort((a, b) => sortEvents(a, b, this.props));

        let segments = evts = evts.map((evt) => eventSegments(evt, first, last, this.props));
        let limit = (this.state.rowLimit - 1) || 1;

        let {levels, extra} = eventLevels(segments, limit);

        content = content || ((lvls, wk) => lvls.map((lvl, idx) => this.renderRowLevel(lvl, wk, idx)));

        return (
            <div key={'week_' + weekIdx}
                 className="rbc-month-row"
                 ref={!weekIdx && ((r) => this._firstRow = r)}
            >
                {
                    this.renderBackground(week, weekIdx)
                }
                <div
                    className="rbc-row-content"
                >
                    <div
                        className="rbc-row"
                        ref={!weekIdx && ((r) => this._firstDateRow = r)}
                    >
                        { this._dates(week, nonWorkingDays) }
                    </div>
                    {
                        content(levels, week, weekIdx)
                    }
                    {
                        !!extra.length &&
                        this.renderShowMore(segments, extra, week, weekIdx, levels.length)
                    }
                </div>
                { this.props.popup
                && this._renderOverlay()
                }
            </div>
        );
    }

    _setDate(date) {
        if (this._getStartDate()) {
            this.setState({
                endDate: date
            });
        } else {
            this.setState({
                startDate: date
            });
        }


        if (this._isStartEndDateSelected()) {
            let start = this._getStartDate();
            let end = this._getEndDate();

            if (!isDateBefore(start, end)) {
                let temp = end;
                end = start;
                start = temp;
            }

            notify(this.props.onRangeSelected, {
                start,
                end
            });

            this._reset();
        }
    }

    _getStartDate() {
        return this.state.startDate && parse(this.state.startDate);
    }

    _isStartEndDateSelected() {
        return this._getStartDate() && this._getEndDate();
    }

    _getEndDate() {
        return this.state.endDate && parse(this.state.endDate);
    }

    _getHoveredDate() {
        return this.state.hoveredDate && parse(this.state.hoveredDate);
    }

    _reset() {
        this.setState({
            endDate: null,
            startDate: null
        });
    }

    renderBackground(row, idx) {
        let self = this;

        function getCurrentDate(index) {
            let date = row.slice(index, index + 1)[0];
            return parse(date);
        }

        function onSelectSlot({start, end}) {
            let selectedDate = self._pendingSelection.concat(row.slice(start, end + 1));
            self._setDate(selectedDate[0]);

            self._pendingSelection = selectedDate;

            clearTimeout(self._selectTimer);
            self._selectTimer = setTimeout(() => self._selectDates());

        }

        function isEndDate(dateCell) {
            let date = getCurrentDate(dateCell);

            return isDatesSame(date, self._hoveredDate) && self._getStartDate();
        }

        function isHovered(dateCell) {
            let date = getCurrentDate(dateCell);

            return isDatesSame(date, self._hoveredDate) && !self._getStartDate();
        }

        function onHoverSlot(dateCell) {
            let date = getCurrentDate(dateCell);

            if (isDatesSame(date, self._hoveredDate)) {
                return;
            }

            self._hoveredDate = date;
            self.setState({
                hoveredDate: date
            });
        }

        function highlight(cell) {
            let date = getCurrentDate(cell);
            let startDate = self._getStartDate();
            let hoveredDate = self._getHoveredDate();

            return hoveredDate && startDate && date
                && isDateBetween(startDate, hoveredDate, date, '()')
                || isDateBetween(hoveredDate, startDate, date, '()');

        }

        function isSelected(cell) {
            let startDate = self._getStartDate();
            let date = getCurrentDate(cell);

            return isDatesSame(date, startDate);
        }

        return (
            <BackgroundCells
                highlight={highlight}
                isSelected={isSelected}
                isHovered={isHovered}
                isEndDate={isEndDate}
                onHover={onHoverSlot}
                rowIndex
                index={idx}
                container={() => findDOMNode(this)}
                draggableSelect={this.props.draggableSelect}
                selectable={this.props.selectable}
                slots={7}
                ref={(r) => this._bgRows[idx] = r}
                onSelectSlot={onSelectSlot}
            />
        );
    }

    renderRowLevel(segments, week, idx) {
        let {first, last} = endOfRange(week);

        return (
            <EventRow
                {...this.props}
                eventComponent={this.props.components.event}
                onSelect={this._selectEvent}
                key={idx}
                segments={segments}
                start={first}
                end={last}
            />
        );
    }

    renderShowMore(segments, extraSegments, week, weekIdx) {
        let {first, last} = endOfRange(week);

        let onClick = (slot) => this._showMore(segments, week[slot - 1], weekIdx, slot);

        return (
            <EventEndingRow
                {...this.props}
                eventComponent={this.props.components.event}
                onSelect={this._selectEvent}
                onShowMore={onClick}
                key={'last_row_' + weekIdx}
                segments={extraSegments}
                start={first}
                end={last}
            />
        );
    }

    _dates(row, nonWorkingDays) {
        return row.map((day, colIdx) => {
            let offRange = dates.month(day) !== dates.month(this.props.date);
            let isNonWorkDay = collection.find(nonWorkingDays, function same(nonWorkDay) {
                return dates.isSameDate(nonWorkDay, day);
            });
            return (
                <div
                    key={'header_' + colIdx}
                    style={segStyle(1, 7)}
                    className={cn('rbc-date-cell', {
                        'rbc-off-range': offRange && !isNonWorkDay,
                        'rbc-off-range-non-work': offRange && isNonWorkDay,
                        'rbc-off-non-work': !offRange && isNonWorkDay,
                        'rbc-now': dates.eq(day, new Date(), 'day'),
                        'rbc-current': dates.eq(day, this.props.date, 'day')
                    })}
                >
                    <a href="#" onClick={this._dateClick.bind(null, day)}>
                        { localizer.format(day, this.props.dateFormat, this.props.culture) }
                    </a>
                </div>
            );
        });
    }

    _headers(row, format, culture) {
        let first = row[0];
        let last = row[row.length - 1];

        return dates.range(first, last, 'day').map((day, idx) =>
            <div
                key={'header_' + idx}
                className="rbc-header"
                style={segStyle(1, 7)}
            >
                { localizer.format(day, format, culture) }
            </div>
        );
    }

    _renderMeasureRows(levels, row, idx) {
        let first = idx === 0;

        return first ? (
            <div className="rbc-row">
                <div className="rbc-row-segment" style={segStyle(1, 7)}>
                    <div ref={(r) => this._measureEvent = r} className={cn('rbc-event')}>
                        <div className="rbc-event-content">&nbsp;</div>
                    </div>
                </div>
            </div>
        ) : <span/>;
    }

    _renderOverlay() {
        let overlay = (this.state && this.state.overlay) || {};

        return (
            <Overlay
                rootClose
                placement="bottom"
                container={this}
                show={!!overlay.position}
                onHide={() => this.setState({overlay: null})}
            >
                <Popup
                    {...this.props}
                    position={overlay.position}
                    events={overlay.events}
                    slotStart={overlay.date}
                    slotEnd={overlay.end}
                    onSelect={this._selectEvent}
                />
            </Overlay>
        );
    }

    _measureRowLimit() {
        let eventHeight = getHeight(this._measureEvent);
        let labelHeight = getHeight(this._firstDateRow);
        let eventSpace = getHeight(this._firstRow) - labelHeight;

        this._needLimitMeasure = false;

        this.setState({
            needLimitMeasure: false,
            rowLimit: Math.max(
                Math.floor(eventSpace / eventHeight), 1)
        });
    }

    _dateClick(date, e) {
        e.preventDefault();
        this.clearSelection();
        notify(this.props.onNavigate, [navigate.DATE, date]);
    }

    _selectEvent(...args) {
        //cancel any pending selections so only the event click goes through.
        this.clearSelection();

        notify(this.props.onSelectEvent, args);
    }

    _selectDates(e) {
        let slots = this._pendingSelection.slice();

        this._pendingSelection = [];

        slots.sort((a, b) => +a - +b);

        notify(this.props.onSelectSlot, {
            slots,
            start: slots[0],
            end: slots[slots.length - 1]
        });
    }

    _showMore(segments, date, weekIdx, slot) {
        let cell = findDOMNode(this._bgRows[weekIdx]).children[slot - 1];

        let events = segments
            .filter((seg) => isSegmentInSlot(seg, slot))
            .map((seg) => seg.event);

        //cancel any pending selections so only the event click goes through.
        this.clearSelection();

        if (this.props.popup) {
            let position = getPosition(cell, findDOMNode(this));

            this.setState({
                overlay: {date, events, position}
            });
        }
        else {
            notify(this.props.onNavigate, [navigate.DATE, date]);
        }

        notify(this.props.onShowMore, [events, date, slot]);
    }

    clearSelection() {
        clearTimeout(this._selectTimer);
        this._pendingSelection = [];
    }

    render() {
        let {date, culture, weekdayFormat} = this.props
            , month = dates.visibleDays(date, culture)
            , weeks = chunk(month, 7);

        let measure = this.state.needLimitMeasure;

        this._weekCount = weeks.length;

        return (
            <div
                className={cn('rbc-month-view', this.props.className)}
            >
                <div className="rbc-row rbc-month-header">
                    {this._headers(weeks[0], weekdayFormat, culture)}
                </div>
                { weeks.map((week, idx) =>
                    this.renderWeek(week, idx, measure && this._renderMeasureRows))
                }
            </div>
        );
    }


}

MonthView.navigate = (date, action) => {
    switch (action) {
        case navigate.PREVIOUS:
            return dates.add(date, -1, 'month');

        case navigate.NEXT:
            return dates.add(date, 1, 'month');

        default:
            return date;
    }
};

MonthView.range = (date, {culture}) => {
    let start = dates.firstVisibleDay(date, culture);
    let end = dates.lastVisibleDay(date, culture);
    return {start, end};
};

MonthView.propTypes = PROPERTY_TYPES;

export default MonthView;
