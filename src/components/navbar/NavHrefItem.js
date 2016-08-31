import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';

export default class NavHrefItem extends React.Component {

    render() {
        let navItemClassNames = classNames(this.props.className, {
            'nav-bar__item': true,
            'nav-bar__item--right': this.props.right,
            'nav-bar__item--active': this.props.active
        });

        return this.renderLink(this.props.style, navItemClassNames);
    }

    renderLink(style, navItemClassNames) {
        if (this.props.internal) {
            return this.renderInternalLink(style, navItemClassNames);
        } else {
            return this.renderExternalLink(style, navItemClassNames);
        }
    }

    renderInternalLink(style, navItemClassNames) {
        return (<Link style={style} className={navItemClassNames} to={this.props.to}> {this.renderItems()}</Link>);
    }

    renderExternalLink(style, navItemClassNames) {
        return (<a style={style} className={navItemClassNames} href={this.props.to}>{this.renderItems()}</a>);
    }

    renderItems() {
        return this.props.children;
    }
}

NavHrefItem.propTypes = {
    className: React.PropTypes.string,
    to: React.PropTypes.string,
    style: React.PropTypes.object,
    active: React.PropTypes.bool,
    internal: React.PropTypes.bool,
    right: React.PropTypes.bool
};

NavHrefItem.defaultProps = {
    className: '',
    to: '',
    style: {},
    internal: true
};

