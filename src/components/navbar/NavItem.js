import React from 'react';
import classNames from 'classnames';

export default class NavItem extends React.Component {

    render() {
        let navItemClassNames = classNames(this.props.className, {
            'rm-nav-bar__item': true,
            'rm-nav-bar__item--right': this.props.right,
            'rm-nav-bar__item--active': this.props.active
        });

        return (
            <div onClick={(e) => this.onClick(e)} style={this.props.style} className={navItemClassNames}>
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
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    onClick: React.PropTypes.func,
    active: React.PropTypes.bool,
    right: React.PropTypes.bool
};

NavItem.defaultProps = {
    className: '',
    style: {}
};

