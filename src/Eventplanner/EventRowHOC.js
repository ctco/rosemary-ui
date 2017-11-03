import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import EventCell from './EventCell';
import getHeight from 'dom-helpers/query/height';
import { accessor, elementType } from './utils/propTypes';
import { segStyle } from './utils/eventLevels';
import { isSelected } from './utils/selection';
import localizer from './localizer';
import { accessor as get } from './utils/accessors';

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
        onSelect: PropTypes.func
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
            this.getLvlKey = this.getLvlKey.bind(this);
        }

        renderEvent(event) {
            let {
                eventPropGetter,
                selected,
                start,
                end,
                startAccessor,
                endAccessor,
                titleAccessor,
                allDayAccessor,
                eventComponent,
                onSelect
            } = this.props;

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

        getLvlKey(index, event) {
            let start = get(event, this.props.startAccessor);

            return `_lvl_${index}_${localizer.format(start, 'DD.MM.YYYY')}`;
        }

        getRowHeight() {
            getHeight(findDOMNode(this));
        }
    }

    Enhance.propTypes = PROPERTY_TYPES;
    Enhance.defaultProps = DEFAULT_PROPS;

    return Enhance;
}
