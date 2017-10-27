import React from 'react';
import dates from './utils/dates';
import TimeGrid from './TimeGrid';
import { navigate } from './utils/constants';

const PROPERTY_TYPES = TimeGrid.propTypes;
const DEFAULT_PROPS = TimeGrid.defaultProps;

class Day extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { date } = this.props;
        let { start, end } = Day.range(date);

        return <TimeGrid {...this.props} start={start} end={end} eventOffset={10} />;
    }
}

Day.navigate = (date, action) => {
    switch (action) {
        case navigate.PREVIOUS:
            return dates.add(date, -1, 'day');

        case navigate.NEXT:
            return dates.add(date, 1, 'day');

        default:
            return date;
    }
};

Day.range = date => {
    date = dates.startOf(date, 'day');
    return { start: date, end: date };
};

Day.propTypes = PROPERTY_TYPES;
Day.defaultProps = DEFAULT_PROPS;

export default Day;
