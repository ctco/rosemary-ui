import React from 'react';
import PropTypes from 'prop-types';
import { enhanceRowHOC } from './EventRowHOC';

const PROPERTY_TYPES = {
    segments: PropTypes.array
};

class EventRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { segments } = this.props;

        let lastEnd = 1;

        return (
            <div className="rbc-row">
                {segments.reduce((row, { event, left, right, span }, li) => {
                    let key = this.getLvlKey(li, event);
                    let gap = left - lastEnd;

                    let content = this.renderEvent(event);

                    if (gap) row.push(this.renderSpan(gap, key + '_gap'));

                    row.push(this.renderSpan(span, key, content));

                    lastEnd = right + 1;

                    return row;
                }, [])}
            </div>
        );
    }
}

EventRow.propTypes = PROPERTY_TYPES;

export default enhanceRowHOC(EventRow);
