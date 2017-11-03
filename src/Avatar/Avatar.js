import React from 'react';
import PropTypes from 'prop-types';

const PROPERTY_TYPES = {
    text: PropTypes.string
};
const DEFAULT_PROPS = {};

class Avatar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="avatar">{this.props.text}</div>;
    }
}

Avatar.propTypes = PROPERTY_TYPES;
Avatar.defaultProps = DEFAULT_PROPS;

export default Avatar;
