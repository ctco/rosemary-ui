import React from 'react';
import classNames from 'classnames';

export default class NavHrefItem extends React.Component {

    render() {
        let navItemClassNames = classNames(this.props.className, {
            'nav-bar__item': true,
            'nav-bar__item--right': this.props.right,
            'nav-bar__item--active': this.props.active
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
    right: React.PropTypes.bool
};

NavHrefItem.defaultProps = {
    className: ''
};

