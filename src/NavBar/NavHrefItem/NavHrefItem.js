import React from 'react';
import classNames from 'classnames';

export default class NavHrefItem extends React.Component {
    render() {
        let navItemClassNames = classNames(this.props.className, {
            'rm-nav-bar__item': true,
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
    className: React.PropTypes.string,
    active: React.PropTypes.bool,
    withHoverEffect: React.PropTypes.bool,
    right: React.PropTypes.bool
};

NavHrefItem.defaultProps = {
    className: ''
};
