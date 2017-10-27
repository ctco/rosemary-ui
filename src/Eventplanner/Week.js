import React from 'react';
import dates from './utils/dates';
import localizer from './localizer';
import { navigate } from './utils/constants';

import TimeGrid from './TimeGrid';

const PROPERTY_TYPES = TimeGrid.propTypes;
const DEFAULT_PROPS = TimeGrid.defaultProps;

class Week extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { date } = this.props;
        let { start, end } = Week.range(date, this.props);

        return <TimeGrid {...this.props} start={start} end={end} eventOffset={15} />;
    }
}

Week.navigate = (date, action) => {
    switch (action) {
        case navigate.PREVIOUS:
            return dates.add(date, -1, 'week');

        case navigate.NEXT:
            return dates.add(date, 1, 'week');

        default:
            return date;
    }
};

Week.range = (date, { culture }) => {
    let firstOfWeek = localizer.startOfWeek(culture);
    let start = dates.startOf(date, 'week', firstOfWeek);
    let end = dates.endOf(date, 'week', firstOfWeek);

    return { start, end };
};

Week.propTypes = PROPERTY_TYPES;
Week.defaultProps = DEFAULT_PROPS;

export default Week;