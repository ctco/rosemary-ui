import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import EventCell from './EventCell';
import getHeight from 'dom-helpers/query/height';
import { accessor, elementType } from './utils/propTypes';
import { segStyle } from './utils/eventLevels';
import { isSelected } from './utils/selection';

export function enhanceRowHOC(ParentClass) {

    const PROPERTY_TYPES = {
        slots: PropTypes.number.isRequired,
        end: PropTypes.instanceOf(Date),
        start: PropTypes.instanceOf(Date),

        selected: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        eventPropGetter: PropTypes.func,
        titleAccessor: accessor,
        allDayAccessor: accessor,
        startAccessor: accessor,
        endAccessor: accessor,

        eventComponent: elementType,
        onSelect: React.PropTypes.func
    };

    const DEFAULT_PROPS = {
        segments: [],
        selected: [],
        slots: 7
    };

    class Enhance extends ParentClass {
        static get displayName() {
            return ParentClass.displayName || ParentClass.name;
        }

        constructor() {
            super(...arguments);
            this.renderEvent = this.renderEvent.bind(this);
            this.renderSpan = this.renderSpan.bind(this);
            this.getRowHeight = this.getRowHeight.bind(this);
        }

        renderEvent(event) {
            let {
                eventPropGetter, selected, start, end
                , startAccessor, endAccessor, titleAccessor
                , allDayAccessor, eventComponent, onSelect } = this.props;

            return (
                <EventCell
                    event={event}
                    eventPropGetter={eventPropGetter}
                    onSelect={onSelect}
                    selected={isSelected(event, selected)}
                    startAccessor={startAccessor}
                    endAccessor={endAccessor}
                    titleAccessor={titleAccessor}
                    allDayAccessor={allDayAccessor}
                    slotStart={start}
                    slotEnd={end}
                    component={eventComponent}
                    />
            );
        }

        renderSpan(len, key, content = ' ') {
            let { slots } = this.props;

            return (
                <div key={key} className="rbc-row-segment" style={segStyle(Math.abs(len), slots)}>
                    {content}
                </div>
            );
        }

        getRowHeight() {
            getHeight(findDOMNode(this));
        }

    }

    Enhance.propTypes = PROPERTY_TYPES;
    Enhance.defaultProps = DEFAULT_PROPS;

    return Enhance;
}