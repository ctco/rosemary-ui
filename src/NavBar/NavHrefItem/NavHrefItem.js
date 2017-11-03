import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class NavHrefItem extends React.Component {
    render() {
        let navItemClassNames = classNames(this.props.className, 'rm-nav-bar__item', {
            'rm-nav-bar__item--right': this.props.right,
            'rm-nav-bar__item--active': this.props.active,
            'rm-nav-bar__item--with-hover-effect': this.props.withHoverEffect
        });

        const element = React.cloneElement(React.Children.only(this.props.children), {
            className: navItemClassNames
        });
        return element;
    }
}

NavHrefItem.propTypes = {
    className: PropTypes.string,
    active: PropTypes.bool,
    withHoverEffect: PropTypes.bool,
    right: PropTypes.bool
};

NavHrefItem.defaultProps = {
    className: ''
};
