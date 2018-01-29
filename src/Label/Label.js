import React from 'react';
import PropTypes from 'prop-types';

const PROPERTY_TYPES = {
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['text', 'password']),
    testId: PropTypes.any
};

const DEFAULT_PROPS = {
    type: 'text'
};

class Label extends React.Component {
    render() {
        return (
            <div data-test-id={this.props.testId} className="label">
                Default label
            </div>
        );
    }
}

Label.propTypes = PROPERTY_TYPES;
Label.defaultProps = DEFAULT_PROPS;

export default Label;
