import React from 'react';
import PropTypes from 'prop-types';

const PROPERTY_TYPES = {
    text: PropTypes.string,
    testId: PropTypes.any
};

class Avatar extends React.Component {
    render() {
        return (
            <div data-test-id={this.props.testId} className="avatar">
                {this.props.text}
            </div>
        );
    }
}

Avatar.propTypes = PROPERTY_TYPES;

export default Avatar;
