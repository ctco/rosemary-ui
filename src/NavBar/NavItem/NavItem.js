import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class NavItem extends React.Component {
    render() {
        let navItemClassNames = classNames(this.props.className, 'rm-nav-bar__item', {
            'rm-nav-bar__item--right': this.props.right,
            'rm-nav-bar__item--active': this.props.active,
            'rm-nav-bar__item--with-hover-effect': this.props.withHoverEffect
        });

        return (
            <div onClick={e => this.onClick(e)} style={this.props.style} className={navItemClassNames}>
                {this.props.children}
            </div>
        );
    }

    onClick(e) {
        e.preventDefault();
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }
}

NavItem.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    active: PropTypes.bool,
    withHoverEffect: PropTypes.bool,
    right: PropTypes.bool
};

NavItem.defaultProps = {
    className: '',
    style: {}
};
