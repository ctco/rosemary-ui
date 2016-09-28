import React, {PropTypes} from 'react';
import classNames from 'classnames';

const PROPERTY_TYPES = {
    value: React.PropTypes.any
};

class Link extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const className = classNames('ros-link', this.props.className);
        const props = {
            ...this.props,
            className
        };

        return (
            <a {...props}>
                {this.props.value || this.props.children}
            </a>
        );
    }
}

Link.propTypes = PROPERTY_TYPES;

export default Link;
