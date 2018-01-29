import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

const PROPERTY_TYPES = {
    value: PropTypes.any,
    testId: PropTypes.any
};

class Link extends React.Component {
    render() {
        const className = classNames('ros-link', this.props.className);
        const props = {
            ...this.props,
            className
        };

        return (
            <a data-test-id={this.props.testId} {...props}>
                {this.props.value || this.props.children}
            </a>
        );
    }
}

Link.propTypes = PROPERTY_TYPES;

export default Link;
