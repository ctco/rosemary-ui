import React from 'react';
import PropTypes from 'prop-types';

const PROPERTY_TYPES = {
    item: PropTypes.any
};
const DEFAULT_PROPS = {};

class Row extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.className !== this.props.className) {
            return true;
        }
        return nextProps.item !== this.props.item;
    }

    render() {
        return (
            <tr className={this.props.className} onClick={e => this.props.onClick && this.props.onClick(e)}>
                {this.props.children}
            </tr>
        );
    }
}

Row.propTypes = PROPERTY_TYPES;
Row.defaultProps = DEFAULT_PROPS;

export default Row;
